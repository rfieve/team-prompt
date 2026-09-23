// Agent Skills frontmatter limits: https://agentskills.io/specification
const MAX_NAME_LENGTH        = 64
const MAX_DESCRIPTION_LENGTH = 1024

/**
 * Normalizes a raw name into a valid skill name: lowercase letters, digits, and hyphens
 * only, at most 64 characters.
 */
function toSkillName(rawName: string): string {
    return (
        rawName
            .toLowerCase()
            // eslint-disable-next-line unicorn/prefer-string-replace-all
            .replace(/[^\da-z]+/g, '-')
            // eslint-disable-next-line unicorn/prefer-string-replace-all
            .replace(/^-+|-+$/g, '')
            .slice(0, MAX_NAME_LENGTH)
    )
}

/**
 * Returns the skill name of a team member: `tp-agent-{id}`.
 */
export function toTeamMemberSkillName(id: string): string {
    return toSkillName(`tp-agent-${id}`)
}

/**
 * Returns the skill name of a workflow: `tp-flow-{id}`.
 */
export function toWorkflowSkillName(id: string): string {
    return toSkillName(`tp-flow-${id}`)
}

/**
 * Caps a description at the spec's length limit, cutting after the last complete
 * sentence that fits, or mid-sentence with an ellipsis when none does.
 */
function capDescription(description: string): string {
    if (description.length <= MAX_DESCRIPTION_LENGTH) {
        return description
    }

    const truncated       = description.slice(0, MAX_DESCRIPTION_LENGTH)
    const lastSentenceEnd = truncated.lastIndexOf('. ')

    return lastSentenceEnd > 0
        ? truncated.slice(0, lastSentenceEnd + 1)
        : `${truncated.slice(0, MAX_DESCRIPTION_LENGTH - 1)}…`
}

/**
 * Renders the YAML frontmatter of a `SKILL.md` file, capping the description at the
 * spec's length limit.
 *
 * @param name - an already normalized skill name
 */
export function createSkillFrontmatter(name: string, description: string): string {
    const cappedDescription = capDescription(description)

    // JSON strings are valid YAML double-quoted scalars, which keeps colons and quotes safe.
    return `---
name: ${name}
description: ${JSON.stringify(cappedDescription)}
---`
}
