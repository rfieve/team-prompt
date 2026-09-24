import { PromptOption, Step, TeamMemberReplacement } from 'src/types'

import { buildTeamMember } from './build-team-member'
import { findTeamMember } from './find-team-member'
import { formatPauseSteps, hasPotentialReplacements } from './steps'
import { bulletList, compact, joinLines, joinParagraphs } from './text'

type Pacing = { closing: string; instruction: string }

type OutputStyle = { closingLine: string; instructionLine: string }

function describePacing(pauseAt: number[] | undefined, totalSteps: number): Pacing {
    if (pauseAt === undefined) {
        return {
            instruction :
                `In order to achieve your goal, do not take all steps at once, but take each step one at a time.
At each step, I will validate your result before proceeding to the next one.`,
            closing :
                'Now, directly start the process and actually resolve <task> at Step #1, using its <team_member>, <training_data>, <quality_control>, and <quality_control_steps> when present.',
        }
    }

    if (pauseAt.length === 0) {
        return {
            instruction :
                'Resolve every step in order, one after another, without pausing for validation between them.',
            closing :
                `Now, directly start the process: resolve <task> at every step in order, from Step #1 through Step #${totalSteps}, without pausing between steps.`,
        }
    }

    const pauseLabel = formatPauseSteps(pauseAt)

    return {
        instruction :
            `Resolve steps continuously without pausing, except after ${pauseLabel}, where you must stop and wait for my validation before continuing to the next step.`,
        closing :
            `Now, directly start the process: resolve <task> at each step in order starting from Step #1, pausing for my validation only after ${pauseLabel}.`,
    }
}

function describeOutputStyle(verbosity: 'concise' | 'explained'): OutputStyle {
    if (verbosity === 'explained') {
        return {
            instructionLine :
                'At each step, briefly explain your reasoning (2-3 sentences) before the resolved task output. Do not restate the task description or announce the team member you are embodying.',
            closingLine :
                'Briefly explain your reasoning before each resolved task output. Do not restate the task description or announce the team member you are embodying.',
        }
    }

    return {
        instructionLine :
            'At each step, respond only with the resolved task output: no role announcements, no restated task description, no meta-commentary about what you are doing.',
        closingLine :
            'Respond only with the resolved task output: no role announcements, no restated task description, no meta-commentary about what you are doing.',
    }
}

function tag(name: string, content: string): string {
    return `<${name}>\n${content}\n</${name}>`
}

function renderInstructions(
    { allowClarifyingQuestions, context }: PromptOption,
    pacing: Pacing,
    outputStyle: OutputStyle,
    hasReplacements: boolean
): string {
    const blockDescriptions = joinLines([
        ' - <task>: the task to resolve',
        ' - <team_member>: your expertise and persona for this step',
        ' - <training_data>: knowledge to base your response on',
        ' - <quality_control>: a description of what a successful resolution looks like',
        ' - <quality_control_steps>: when present, a checklist to verify one by one before finalizing your response',
        hasReplacements
            && ' - <potential_replacements>: when present, team members to roleplay as instead of <team_member> if their condition matches the context',
    ])

    const rules = joinLines([
        pacing.instruction,
        'At each step, adopt the profile described in <team_member> in order to resolve <task>.',
        'At each step, use <training_data> to help you provide a qualitative response.',
        'At each step, ensure your response is compliant with <quality_control>.',
        'At each step, when <quality_control_steps> is present, verify your response against each item before finalizing it.',
        hasReplacements
            && 'At each step, when <potential_replacements> is present and one of its conditions matches the context, roleplay as that team member instead and resolve its own task rather than <task>, based on the same validated steps.',
        'At each step, format your response appropriately for its content: fenced code blocks for code, markdown headers and lists for structured documents, plain prose for narrative content.',
        outputStyle.instructionLine,
        allowClarifyingQuestions
            && 'At each step, if the task is genuinely ambiguous and guessing wrong would be costly, ask a clarifying question instead of proceeding.',
        `At each step, keep in mind your ultimate goal${context ? ' and the additional context provided' : ''}.`,
    ])

    return joinParagraphs([
        '# Your Instructions:',
        `You will roleplay as multiple team members in order to achieve a provided goal.
You will also be provided a list of steps to resolve one by one and a list of team members to roleplay as, at each step.`,
        `Each step is provided within a <step> block, containing:\n${blockDescriptions}`,
        rules,
    ])
}

function renderReplacement({ id, when }: TeamMemberReplacement): string {
    const { name, title, description, defaultTask } = buildTeamMember(findTeamMember(id))

    return `If ${when}: ${name} (${title}): ${description} Their task: ${defaultTask}`
}

function renderStep({ responsible, task, targetStepIndex }: Step, index: number): string {
    const member  = buildTeamMember(responsible)
    const basedOn = targetStepIndex === undefined
        ? ''
        : `Based on what has been validated at Step ${targetStepIndex + 1}: `

    return joinLines([
        `<step number="${index + 1}">`,
        tag('task', `${basedOn}${task || member.defaultTask}`),
        tag('team_member', `${member.name} (${member.title}): ${member.description}`),
        tag('training_data', member.trainingData),
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
 * Renders a prompt that makes the model roleplay each step's responsible team member,
 * one step after another, to achieve `taskDescription`.
 *
 * @param taskDescription - the ultimate goal of the prompt
 * @param steps - the steps to resolve, in order
 * @param options - pacing, verbosity, context, and clarifying-question behavior
 */
export function createTeamPrompt(taskDescription: string, steps: Step[], options: PromptOption = {}) {
    const { context, pauseAt, verbosity = 'concise' } = options

    const pacing      = describePacing(pauseAt, steps.length)
    const outputStyle = describeOutputStyle(verbosity)

    const sections = compact([
        renderInstructions(options, pacing, outputStyle, hasPotentialReplacements(steps)),
        `# The Goal:\n\nThis is your ultimate goal:\n${taskDescription}`,
        context && `# Context:\n\nAdditional context and constraints to respect throughout:\n${context}`,
        joinParagraphs([
            '# The Steps:',
            'In order to achieve your goal, you will need to follow the steps listed below, each one having a specific task and responsible Team Member:',
            ...steps.map((step, index) => renderStep(step, index)),
        ]),
        `${outputStyle.closingLine}\n\n${pacing.closing}`,
    ])

    return `${sections.join('\n\n\n')}\n`
}
