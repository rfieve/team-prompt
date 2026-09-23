import { TeamMember } from 'src/types'

import { createSkillFrontmatter, toTeamMemberSkillName } from './create-skill-frontmatter'
import { createParametersSection, replacePlaceholdersWithChoices } from './skill-parameters'

/**
 * Renders a team member as the content of an Agent Skill `SKILL.md` file.
 *
 * Option values are not baked in: the instructions keep their `{{param}}` placeholders
 * and a `## Parameters` section tells the model to infer each value from the execution
 * context (the project, the request, earlier steps), and to ask the user with the
 * suggested values only when it cannot.
 *
 * @param teamMember - the team member to render; with a `TeamMemberBuilder`, overridden
 * option values only change the default proposed to the user
 * @returns the `SKILL.md` content: YAML frontmatter (`name`, `description`) followed by
 * the markdown instructions
 */
export function createTeamMemberSkill(teamMember: TeamMember): string {
    const {
        id,
        name,
        title,
        description,
        defaultTask,
        trainingData,
        qualityControl,
        qualityControlSteps,
        options,
    } = teamMember

    const skillDescription = replacePlaceholdersWithChoices(
        `${description} Use for tasks like: ${defaultTask}`,
        options
    )

    const qualityControlStepsSection = qualityControlSteps?.length
        ? `

Verify each item before finalizing your response:
${qualityControlSteps.map((step) => `- ${step}`).join('\n')}`
        : ''

    return `${createSkillFrontmatter(toTeamMemberSkillName(id), skillDescription)}

# ${name} (${title})

You are ${name}, ${title}. ${description}${createParametersSection(options)}

## What you do

${defaultTask}

## Knowledge to draw on

${trainingData}

## Quality control

${qualityControl}${qualityControlStepsSection}
`
}
