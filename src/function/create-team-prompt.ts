import { Step } from 'src/types'

function extractTeamMembers(steps: Step[]) {
    return Object.values(
        Object.fromEntries(steps.map(({ responsible }) => [responsible.name, responsible]))
    )
}

export function createTeamPrompt(taskDescription: string, steps: Step[]) {
    const teamMembers = extractTeamMembers(steps)

    return `
# The Goal:

This is your ultimate goal:
${taskDescription}


# The Team Members:

In order to acheive your goal, several skills and profiles are at your disposal.
They take the form of the list of experts listed below as the Team Members:

${teamMembers
        .map(({ name, title, description }) => `- ${name} (${title}): ${description}`)
        .join('\n')}


# The Steps:

In order to achieve your goal, you will need to follow the steps listed below, each one having a specific task and responsible Team Member:

${steps
        .map(
            ({ responsible, task, targetStepIndex }, index) => `### Step #${index + 1}
    Task: ${
    targetStepIndex === undefined
        ? ''
        : `Based on what has been validated at Step ${targetStepIndex + 1}: `
}${task || responsible.defaultTask}
    Team Member: ${responsible.name}`
        )
        .join('\n')}


# Your Instructions:

In order to acheive your goal, do not take all steps at once, but take each step, one by one.
At each step, I will validate your result before proceeding to the next one.
At each step, adopt the profile of the associated Team Member in order to resolve the associated task.
At each step, do not describe the associated Team Member you are embodying.
At each step, do not describe the associated Task and what you are going to do, but actually do the task of the step.
At each step, keep in mind your ultimate goal.

Remember, never describe what is supposed to be done. JUST, ACTUALLY DO IT!

Now, summerize these instructions in 150 words, then ask me if we can start the process and resolve the task at Step #1.
`
}
