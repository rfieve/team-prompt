import { PromptOption, Step } from 'src/types'

import { buildTeamMember } from './build-team-member'

export function formatStepNumbers(indices: number[]): string {
    const labels = indices.map((index) => `Step #${index + 1}`)

    if (labels.length === 1) {
        return labels[0]
    }

    const last = labels[labels.length - 1]
    const rest = labels.slice(0, -1).join(', ')

    return labels.length > 2 ? `${rest}, and ${last}` : `${rest} and ${last}`
}

function describePacing(
    pauseAt: number[] | undefined,
    totalSteps: number
): { closing: string; instruction: string } {
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

    const pauseLabel = formatStepNumbers([...pauseAt].sort((a, b) => a - b))

    return {
        instruction :
            `Resolve steps continuously without pausing, except after ${pauseLabel}, where you must stop and wait for my validation before continuing to the next step.`,
        closing :
            `Now, directly start the process: resolve <task> at each step in order starting from Step #1, pausing for my validation only after ${pauseLabel}.`,
    }
}

function describeOutputStyle(verbosity: 'concise' | 'explained'): {
    closingLine     : string;
    instructionLine : string;
} {
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

export function createTeamPrompt(
    taskDescription: string,
    steps: Step[],
    { allowClarifyingQuestions = false, context, pauseAt, verbosity = 'concise' }: PromptOption = {}
) {
    const pacing      = describePacing(pauseAt, steps.length)
    const outputStyle = describeOutputStyle(verbosity)

    const contextSection = context
        ? `


# Context:

Additional context and constraints to respect throughout:
${context}`
        : ''

    return `# Your Instructions:

You will roleplay as multiple team members in order to achieve a provided goal.
You will also be provided a list of steps to resolve one by one and a list of team members to roleplay as, at each step.

Each step is provided within a <step> block, containing:
 - <task>: the task to resolve
 - <team_member>: your expertise and persona for this step
 - <training_data>: knowledge to base your response on
 - <quality_control>: a description of what a successful resolution looks like
 - <quality_control_steps>: when present, a checklist to verify one by one before finalizing your response

${pacing.instruction}
At each step, adopt the profile described in <team_member> in order to resolve <task>.
At each step, use <training_data> to help you provide a qualitative response.
At each step, ensure your response is compliant with <quality_control>.
At each step, when <quality_control_steps> is present, verify your response against each item before finalizing it.
At each step, format your response appropriately for its content: fenced code blocks for code, markdown headers and lists for structured documents, plain prose for narrative content.
${outputStyle.instructionLine}
${allowClarifyingQuestions ? 'At each step, if the task is genuinely ambiguous and guessing wrong would be costly, ask a clarifying question instead of proceeding.\n' : ''}At each step, keep in mind your ultimate goal${context ? ' and the additional context provided' : ''}.


# The Goal:

This is your ultimate goal:
${taskDescription}${contextSection}


# The Steps:

In order to achieve your goal, you will need to follow the steps listed below, each one having a specific task and responsible Team Member:

${steps
        .map(({ responsible, task, targetStepIndex }, index) => {
            const builtResponsible = buildTeamMember(responsible)

            const resolvedTask = `${
                targetStepIndex === undefined
                    ? ''
                    : `Based on what has been validated at Step ${targetStepIndex + 1}: `
            }${task || builtResponsible.defaultTask}`

            const qualityControlStepsBlock = builtResponsible.qualityControlSteps?.length
                ? `
<quality_control_steps>
${builtResponsible.qualityControlSteps.map((step) => `- ${step}`).join('\n')}
</quality_control_steps>`
                : ''

            return `<step number="${index + 1}">
<task>
${resolvedTask}
</task>
<team_member>
${builtResponsible.name} (${builtResponsible.title}): ${builtResponsible.description}
</team_member>
<training_data>
${builtResponsible.trainingData}
</training_data>
<quality_control>
${builtResponsible.qualityControl}
</quality_control>${qualityControlStepsBlock}
</step>`
        })
        .join('\n\n')}


${outputStyle.closingLine}

${pacing.closing}
`
}
