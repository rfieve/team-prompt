import { TeamMemberOption, TeamMemberOptionType } from 'src/types'

function formatChoices(choices: readonly string[]): string {
    if (choices.length <= 2) {
        return choices.join(' or ')
    }

    return `${choices.slice(0, -1).join(', ')}, or ${choices[choices.length - 1]}`
}

function describeSuggestedValues(option: TeamMemberOption): string {
    if (option.type === TeamMemberOptionType.String) {
        return option.from?.length
            ? `${option.from.map((choice) => `\`${choice}\``).join(', ')}, or any other value`
            : 'any value'
    }

    if (option.min !== undefined && option.max !== undefined) {
        return `a number between ${option.min} and ${option.max}`
    }

    if (option.min !== undefined) {
        return `a number of at least ${option.min}`
    }

    return option.max === undefined ? 'a number' : `a number of at most ${option.max}`
}

/**
 * Replaces every `{{param}}` placeholder with the full range of values its option allows
 * (e.g. "TypeScript, Python, or Go"), so the text stays true whichever value ends up
 * being used. Number options and free-form strings fall back to their current value.
 */
export function replacePlaceholdersWithChoices(
    text: string,
    options: Record<string, TeamMemberOption> | undefined
): string {
    let replaced = text

    for (const [key, option] of Object.entries(options ?? {})) {
        const choices = option.type === TeamMemberOptionType.String && option.from?.length
            ? formatChoices(option.from)
            : String(option.value)

        replaced = replaced.split(`{{${key}}}`).join(choices)
    }

    return replaced
}

/**
 * Renders the `## Parameters` section of a skill, instructing the model to infer each
 * `{{param}}` value from the execution context, and to ask the user only as a last resort.
 *
 * @returns an empty string when there is no option
 */
export function createParametersSection(options: Record<string, TeamMemberOption> | undefined): string {
    const entries = Object.entries(options ?? {})

    if (entries.length === 0) {
        return ''
    }

    const rows = entries
        .map(([key, option]) => `| \`{{${key}}}\` | ${describeSuggestedValues(option)} | \`${option.value}\` |`)
        .join('\n')

    return `

## Parameters

These instructions reference the parameters below, written as \`{{parameter}}\`. Resolve each one before starting:

1. Infer its value from the execution context: the user's request, the output of earlier steps, and the current project (its languages, manifest and lock files, dependencies, configuration, and existing conventions). For example, do not ask which language to use in a TypeScript codebase.
2. Only if a value cannot be inferred, ask the user, proposing the suggested values and the default. Ask about every unresolved parameter in a single question.

Never ask about a parameter whose value can be inferred, and never fall back to a default silently when the context points to another value.

| Parameter | Suggested values | Default |
| --- | --- | --- |
${rows}`
}
