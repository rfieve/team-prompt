import { Step } from 'src/types'

import { buildTeamMember } from './build-team-member'

export function createTeamPrompt(taskDescription: string, steps: Step[]) {
    return `# Your Instructions:

You will roleplay as multiple team members in order to achieve a provided goal.
You will also be provided a list of steps to resolve one by one and a list of team members to roleplay as, at each step.

Each step is provided within a <step> block, containing:
 - <task>: the task to resolve
 - <team_member>: your expertise and persona for this step
 - <training_data>: knowledge to base your response on
 - <quality_control>: a description of what a successful resolution looks like
 - <quality_control_steps>: when present, a checklist to verify one by one before finalizing your response

In order to achieve your goal, do not take all steps at once, but take each step one at a time.
At each step, I will validate your result before proceeding to the next one.
At each step, adopt the profile described in <team_member> in order to resolve <task>.
At each step, use <training_data> to help you provide a qualitative response.
At each step, ensure your response is compliant with <quality_control>.
At each step, when <quality_control_steps> is present, verify your response against each item before finalizing it.
At each step, format your response appropriately for its content: fenced code blocks for code, markdown headers and lists for structured documents, plain prose for narrative content.
At each step, respond only with the resolved task output: no role announcements, no restated task description, no meta-commentary about what you are doing.
At each step, keep in mind your ultimate goal.


# The Goal:

This is your ultimate goal:
${taskDescription}


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


Respond only with the resolved task output: no role announcements, no restated task description, no meta-commentary about what you are doing.

Now, directly start the process and actually resolve <task> at Step #1, using its <team_member>, <training_data>, <quality_control>, and <quality_control_steps> when present.
`
}
