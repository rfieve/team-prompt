import { TeamMember, TeamMemberReplacement, TeamMemberRunningModes } from 'src/types'

import { createSkillFrontmatter, MAX_DESCRIPTION_LENGTH, toTeamMemberSkillName } from './create-skill-frontmatter'
import { renderParametersSection, replacePlaceholdersWithChoices } from './skill-parameters'
import { bulletList, inlineCode, joinParagraphs } from './text'

const PROJECT_RULES =
    "Read the relevant files and follow their existing conventions, make the changes the task calls for, and verify them with the project's own checks (tests, type checker, linter, or build) when they apply. End with a short summary of the files changed and the checks run, failures included."

const CHAT_RULES =
    'Give a complete, self-contained deliverable: never elide parts with placeholders such as "// rest unchanged". Use fenced code blocks for code, markdown headers and lists for structured documents, and plain prose for narrative content.'

/**
 * Returns the first sentence of a text, or the whole text when it has a single sentence.
 */
function firstSentence(text: string): string {
    const end = text.search(/[!.?](\s|$)/)

    return end === -1 ? text : text.slice(0, end + 1)
}

/**
 * Renders the frontmatter description of a team member skill: what the team member does,
 * a typical task to match requests against, and the specialists to prefer in some
 * contexts, so the right skill is picked before any of them is loaded.
 *
 * The typical task is left out when the description would exceed the spec's length
 * limit, so that the redirections to other specialists are never cut.
 */
export function createTeamMemberSkillDescription({
    defaultTask,
    description,
    options,
    potentialReplacements,
}: TeamMember): string {
    const redirections = (potentialReplacements ?? []).map(({ id, when }) =>
        `If ${when}, use ${toTeamMemberSkillName(id)} instead.`)

    const render   = (parts: string[]) => replacePlaceholdersWithChoices(parts.join(' '), options)
    const complete = render([description, `Typical task: ${firstSentence(defaultTask)}`, ...redirections])

    return complete.length <= MAX_DESCRIPTION_LENGTH ? complete : render([description, ...redirections])
}

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

function renderRunningModeSection({ options, value }: TeamMemberRunningModes): string {
    const supportsBoth = options.includes('localExecution') && options.includes('conversational')

    if (value === 'localExecution') {
        return joinParagraphs([
            '## Where you work',
            `Work directly in the user's project. ${PROJECT_RULES}`,
            supportsBoth
                ? `If there is no project to work on, or the user only asks for advice or an explanation, answer in the chat instead. ${CHAT_RULES}`
                : 'If there is no project to work on, tell the user this skill needs one instead of answering in the chat.',
        ])
    }

    return joinParagraphs([
        '## Where you work',
        `Answer in the chat. ${CHAT_RULES}`,
        supportsBoth
            ? `If the user asks for the result in their project, work there instead. ${PROJECT_RULES}`
            : "Do not modify the user's files.",
    ])
}

function renderQualityControlSection({ qualityControl, qualityControlSteps }: TeamMember): string {
    const checklist = qualityControlSteps?.length
        ? `Verify each item before finalizing your response. If an item fails, fix your result rather than only reporting the failure:\n${bulletList(qualityControlSteps)}`
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
    const { id, name, title, description, defaultTask, deliverable, trainingData, options, potentialReplacements, runningModes } = teamMember

    return `${joinParagraphs([
        createSkillFrontmatter(toTeamMemberSkillName(id), createTeamMemberSkillDescription(teamMember)),
        `# ${name} (${title})`,
        description,
        renderReplacementsSection(potentialReplacements),
        renderParametersSection(options),
        `## What you do\n\n${defaultTask}`,
        deliverable && `## What you deliver\n\n${deliverable}`,
        renderRunningModeSection(runningModes),
        `## Knowledge to draw on\n\n${trainingData}`,
        renderQualityControlSection(teamMember),
    ])}\n`
}
