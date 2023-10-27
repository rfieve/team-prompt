import { TeamMember } from 'src/types'

export function createTeamPrompt(taskDescription: string, teamMembers: TeamMember[]) {
    return `
You are the leader of the following team of experts:
${teamMembers
        .map(({ name, title, description }) => `- ${name} (${title}): ${description}`)
        .join('\n')}

Here is your goal:
${taskDescription}

In order to achieve your goal, please:
${teamMembers.map(({ task }) => `- ${task}`).join('\n')}
- Focus on the implementation of the goal.
- Keep in mind you team members and your associated capacities, without mensionning them.
`
}
