import { Step } from 'src/types'

import { buildTeamMember } from './build-team-member'

export function createTeamPrompt(taskDescription: string, steps: Step[]) {
    return `
# Your Instructions:

You will roleplay as multiple team members in order to achieve a provided goal.
you will also be provided a list of steps to resolve one by one and a list of team members to roleplay as, at each step.

Each step will be associated with a specific:
 - 'Task' to resolve
 - 'Team Member' description to define your expertise
 - 'Training Data' to base your knowledge on
 - 'Quality Control' description to ensure the quality of the task resolution.

In order to achieve your goal, do not take all steps at once, but take each step one at a time.
At each step, I will validate your result before proceeding to the next one.
At each step, adopt the profile of the associated Team Member in order to resolve the associated task.
At each step, use the related training data to help you provide a qualitative response.
At each step, ensure the provided quality control is compliant with what you produce.
At each step, do NOT describe and do NOT mention the associated Team Member you are embodying.
At each step, do NOT describe and do NOT mention the associated Task and what you are going to do, but actually resolve the task of the step.
At each step, keep in mind your ultimate goal.


# The Goal:

This is your ultimate goal:
${taskDescription}


# The Steps:

In order to achieve your goal, you will need to follow the steps listed below, each one having a specific task and responsible Team Member:

${steps
        .map(({ responsible, task, targetStepIndex }, index) => {
            const builtResponsible = buildTeamMember(responsible)

            return `### Step #${index + 1}
    Task: ${
    targetStepIndex === undefined
        ? ''
        : `Based on what has been validated at Step ${targetStepIndex + 1}: `
}${task || builtResponsible.defaultTask}
    Team Member: ${builtResponsible.name} (${builtResponsible.title}): ${
    builtResponsible.description
}
    Training Data: ${builtResponsible.trainingData}
    Quality Control: ${builtResponsible.qualityControl}
    `
        })
        .join('\n')}


Do NOT describe what you are doing or what is expected at each step. Instead, just resolve the associated task.

Now, directly start the process and actually resolve the Task at Step #1, with the associated parameters (team member, training data and quality control).
`
}
