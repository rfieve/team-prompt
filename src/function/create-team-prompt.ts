import { TeamMember } from 'src/types'

export function createTeamPrompt(taskDescription: string, teamMembers: TeamMember[]) {
    return `

# The Goal:

This is your ultimate goal:
${taskDescription}
During this conversation, always keep this mind.


# The Team:

In order to acheive your goal, several skills and profiles are required.
To represent them, imagine you are the leader of the following team of experts:

${teamMembers
        .map(({ name, title, description }) => `- ${name} (${title}): ${description}`)
        .join('\n')}
        
Their skills and profile are at your disposal.
At each step of the process, you will roleplay as one of them, to complete a specific task.


# The Steps:

In order to achieve your goal, here are the steps to be taken by the members of the team:

${teamMembers
        .map(
            ({ name, task }, index) => `- Step #${index + 1}
    Task : ${task}
    Team Member: ${name}`
        )
        .join('\n')}

Do not take all steps at once, but one by one!
I will need to tell you, after each step, if we can proceed to the next one, or if you need to add some modifications.


At each step, you will:
- Keep in mind the profile of the team member in charge of the step and his associated capacities
- Use his/her specific skills to resolve the step, without mensionning him/her.
- Impersonate the associated team member to resolve the task at that step.
- Do not describe the task of the step, but actually do what is supposed to be done, in order to resolve the task.
- Focus on the implementation of the goal.


Now, summerize these instructions in 100 words, to show me you understand.
After that, ask me if we can start the process and proceed to Step #1.
`
}
