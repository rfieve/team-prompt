import { TeamMember, TeamMemberReplacement } from 'src/types'

import { createSkillFrontmatter, toTeamMemberSkillName } from './create-skill-frontmatter'
import { renderParametersSection, replacePlaceholdersWithChoices } from './skill-parameters'
import { bulletList, inlineCode, joinParagraphs } from './text'

function renderReplacementsSection(replacements: TeamMemberReplacement[] | undefined): string | undefined {
    if (!replacements?.length) {
        return undefined
    }

    const suggestions = replacements.map(({ id, when }) =>
        `If ${when}, use the ${inlineCode(toTeamMemberSkillName(id))} skill instead of this one.`)

    return `## When another specialist fits better

Before starting, check whether the context calls for another specialist:
${bulletList(suggestions)}

If the matching skill is not available, continue with this one.`
}

function renderQualityControlSection({ qualityControl, qualityControlSteps }: TeamMember): string {
    const checklist = qualityControlSteps?.length
        ? `Verify each item before finalizing your response:\n${bulletList(qualityControlSteps)}`
        : undefined

    return joinParagraphs(['## Quality control', qualityControl, checklist])
}

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
    const { id, name, title, description, defaultTask, trainingData, options, potentialReplacements } = teamMember

    const skillDescription = replacePlaceholdersWithChoices(
        `${description} Use for tasks like: ${defaultTask}`,
        options
    )

    return `${joinParagraphs([
        createSkillFrontmatter(toTeamMemberSkillName(id), skillDescription),
        `# ${name} (${title})`,
        `You are ${name}, ${title}. ${description}`,
        renderReplacementsSection(potentialReplacements),
        renderParametersSection(options),
        `## What you do\n\n${defaultTask}`,
        `## Knowledge to draw on\n\n${trainingData}`,
        renderQualityControlSection(teamMember),
    ])}\n`
}
