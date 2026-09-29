import { PromptOption, Step, TeamMember, TeamMemberReplacement, TeamMemberRunningMode } from 'src/types'

import { buildTeamMember } from './build-team-member'
import { findTeamMember } from './find-team-member'
import { formatPauseSteps, hasPotentialReplacements, toStepLabel } from './steps'
import { bulletList, compact, joinLines, joinParagraphs, tag, unique } from './text'

type Pacing = { closing: string; instruction: string }

const MODE_ORDER: TeamMemberRunningMode[] = ['localExecution', 'conversational']

const MODE_HEADINGS: Record<TeamMemberRunningMode, string> = {
    localExecution : '### Steps in `localExecution` mode: you act directly on my codebase or systems',
    conversational : '### Steps in `conversational` mode: you answer in this conversation',
}

const MODE_RULES: Record<TeamMemberRunningMode, string[]> = {
    localExecution : [
        'Before changing anything, read the relevant code and follow its existing conventions: the result has to fit into the codebase, not just work in isolation.',
        'Apply your work directly to the files or systems concerned, instead of pasting it into your response.',
        'Verify the <quality_control_steps> items with real checks whenever one applies (running the tests, type checker, linter, or build) rather than by rereading your work, and report what you ran and its outcome, failures included.',
        'Stay within the step\'s task: changes beyond it are harder for me to review. If you are blocked, stop and explain what blocks you instead of working around it.',
        'End the step with a short summary: the files changed, the checks run, and anything I should look at closely.',
    ],
    conversational : [
        'Provide a complete, self-contained deliverable: never elide parts with placeholders such as "// rest unchanged", since I will use your output as is.',
        'Format it for its content: fenced code blocks for code, markdown headers and lists for structured documents, plain prose for narrative content.',
    ],
}

/**
 * Resolves the running mode of a step: the prompt-level override when the team member
 * supports it, otherwise the team member's default.
 */
function resolveRunningMode({ runningModes }: TeamMember, override: TeamMemberRunningMode | undefined): TeamMemberRunningMode {
    return override && runningModes.options.includes(override) ? override : runningModes.value
}

/**
 * Tells whether the step at `index` is followed by a pause for validation.
 */
function isPausedAfter(pauseAt: number[] | undefined, index: number): boolean {
    return pauseAt === undefined || pauseAt.includes(index)
}

/**
 * Tells whether a single response may hold the output of several steps.
 */
function hasMultiStepResponses(pauseAt: number[] | undefined, totalSteps: number): boolean {
    return Array.from({ length: totalSteps - 1 }, (_, index) => index).some((index) => !isPausedAfter(pauseAt, index))
}

function describePacing(pauseAt: number[] | undefined, totalSteps: number): Pacing {
    if (pauseAt === undefined) {
        return {
            instruction :
                'Resolve one step at a time, then stop and wait for my validation before starting the next one: this lets me correct course before later steps build on the result.',
            closing : `Now start with ${toStepLabel(0)}, and stop once it is resolved.`,
        }
    }

    if (pauseAt.length === 0) {
        return {
            instruction :
                'Resolve every step in order, one after another, without pausing for validation between them.',
            closing : `Now start with ${toStepLabel(0)}, and continue through ${toStepLabel(totalSteps - 1)} without pausing.`,
        }
    }

    const pauseLabel = formatPauseSteps(pauseAt)

    return {
        instruction :
            `Resolve the steps in order without pausing, except after ${pauseLabel}, where you must stop and wait for my validation before continuing: this lets me correct course before later steps build on those results.`,
        closing : `Now start with ${toStepLabel(0)}, and continue in order until the first pause, after ${toStepLabel(Math.min(...pauseAt))}.`,
    }
}

function describeOutputStyle(verbosity: 'concise' | 'explained'): string {
    return verbosity === 'explained'
        ? 'Briefly explain your reasoning (2-3 sentences) before each step\'s output. Do not restate the task or announce the team member whose perspective you take.'
        : 'Keep each step\'s output to its result: no role announcements, no restated task, no commentary on what you are about to do.'
}

function renderResolutionRules({ allowClarifyingQuestions, context }: PromptOption, hasReplacements: boolean): string {
    return joinParagraphs([
        '## How to resolve each step',
        bulletList([
            'Take the perspective of the team member described in <team_member>: their title and description define the expertise to bring, not a character to perform.',
            'Apply the standards and practices listed in <expertise>.',
            'Make sure your result meets <quality_control>.',
            'When <quality_control_steps> is present, check your result against each item before finalizing it. If an item fails, fix your result rather than only reporting the failure.',
            hasReplacements
                && 'When <potential_replacements> is present and one of its conditions matches the context, take that team member\'s perspective instead and resolve their own task rather than <task>, based on the same earlier steps. State in one line which team member you switched to and which condition matched, so I understand why the task changed.',
            allowClarifyingQuestions
                && 'If the task is genuinely ambiguous and guessing wrong would be costly, ask a clarifying question instead of proceeding.',
            `Keep in mind the goal in <goal>${context ? ' and the constraints in <context>' : ''}: every step contributes to it.`,
        ]),
    ])
}

function renderDeliveryRules(modes: TeamMemberRunningMode[]): string {
    return joinParagraphs([
        '## How to deliver each step',
        'Each <step> has a `mode` attribute that sets how you deliver its result.',
        ...MODE_ORDER.filter((mode) => modes.includes(mode)).map((mode) =>
            `${MODE_HEADINGS[mode]}\n\n${bulletList(MODE_RULES[mode])}`),
    ])
}

function renderOutputRules(
    { verbosity = 'concise', pauseAt }: PromptOption,
    totalSteps: number
): string {
    return joinParagraphs([
        '## How to format your responses',
        bulletList([
            describeOutputStyle(verbosity),
            hasMultiStepResponses(pauseAt, totalSteps)
                && 'Start each step\'s output with a `## Step #N` header: several steps share a response, and later steps refer to earlier ones by number.',
            'When you had to assume something the task did not specify, or a question remains open, end the step with a single line listing them, so I can correct them early.',
        ]),
    ])
}

function renderInstructions(
    options: PromptOption,
    pacing: Pacing,
    modes: TeamMemberRunningMode[],
    totalSteps: number,
    hasReplacements: boolean
): string {
    const blockDescriptions = joinLines([
        ' - <task>: the task to resolve',
        ' - <team_member>: the specialist whose perspective and expertise you take on for this step',
        ' - <expertise>: the standards and practices to apply',
        ' - <quality_control>: a description of what a successful resolution looks like',
        ' - <quality_control_steps>: when present, a checklist to verify item by item before finalizing your result',
        hasReplacements
            && ' - <potential_replacements>: when present, team members to take on instead of <team_member> if their condition matches the context',
    ])

    return joinParagraphs([
        '# Your Instructions',
        'You will achieve the goal described in <goal> by resolving a sequence of steps. Each step is assigned to a team member: a specialist whose perspective and expertise you take on to resolve that step.',
        `Each step is provided within a <step> block, containing:\n${blockDescriptions}`,
        `## How to pace the steps\n\n${pacing.instruction}`,
        renderResolutionRules(options, hasReplacements),
        renderDeliveryRules(modes),
        renderOutputRules(options, totalSteps),
    ])
}

function renderReplacement({ id, when }: TeamMemberReplacement): string {
    const { name, title, description, defaultTask } = buildTeamMember(findTeamMember(id))

    return `If ${when}: ${name} (${title}): ${description} Their task: ${defaultTask}`
}

function renderStep(
    { responsible, task, targetStepIndex }: Step,
    index: number,
    mode: TeamMemberRunningMode,
    pauseAt: number[] | undefined
): string {
    const member  = buildTeamMember(responsible)
    const basedOn = targetStepIndex === undefined
        ? ''
        : `Based on ${isPausedAfter(pauseAt, targetStepIndex) ? 'what has been validated at' : 'the output of'} ${toStepLabel(targetStepIndex)}: `

    return joinLines([
        `<step number="${index + 1}" mode="${mode}">`,
        tag('task', `${basedOn}${task || member.defaultTask}`),
        tag('team_member', `${member.name}, ${member.title}: ${member.description}`),
        tag('expertise', member.trainingData),
        tag('quality_control', member.qualityControl),
        member.qualityControlSteps?.length
            ? tag('quality_control_steps', bulletList(member.qualityControlSteps))
            : undefined,
        responsible.potentialReplacements?.length
            ? tag('potential_replacements', bulletList(responsible.potentialReplacements.map((replacement) => renderReplacement(replacement))))
            : undefined,
        '</step>',
    ])
}

/**
 * Renders a prompt that makes the model take on each step's responsible team member,
 * one step after another, to achieve `taskDescription`.
 *
 * @param taskDescription - the ultimate goal of the prompt
 * @param steps - the steps to resolve, in order
 * @param options - pacing, verbosity, running mode, context, and clarifying-question behavior
 */
export function createWorkflowPrompt(taskDescription: string, steps: Step[], options: PromptOption = {}) {
    const { context, pauseAt, runningMode } = options

    const pacing = describePacing(pauseAt, steps.length)
    const modes  = steps.map(({ responsible }) => resolveRunningMode(responsible, runningMode))

    const sections = compact([
        renderInstructions(options, pacing, unique(modes), steps.length, hasPotentialReplacements(steps)),
        `# The Goal\n\n${tag('goal', taskDescription)}`,
        context && `# The Context\n\nConstraints to respect throughout every step:\n${tag('context', context)}`,
        joinParagraphs([
            '# The Steps',
            ...steps.map((step, index) => renderStep(step, index, modes[index], pauseAt)),
        ]),
        pacing.closing,
    ])

    return `${sections.join('\n\n\n')}\n`
}
