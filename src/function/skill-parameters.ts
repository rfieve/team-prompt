import { TeamMemberOption, TeamMemberOptionType } from 'src/types'

import { fillPlaceholders } from './placeholders'
import { formatList, inlineCode } from './text'

function describeSuggestedValues(option: TeamMemberOption): string {
    if (option.type === TeamMemberOptionType.String) {
        return option.from?.length
            ? `${option.from.map((choice) => inlineCode(choice)).join(', ')}, or any other value`
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

function describeAllChoices(option: TeamMemberOption): string {
    return option.type === TeamMemberOptionType.String && option.from?.length
        ? formatList(option.from, 'or')
        : String(option.value)
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
    return fillPlaceholders(text, options, describeAllChoices)
}

/**
 * Renders the `## Parameters` section of a skill, instructing the model to infer each
 * `{{param}}` value from the execution context, and to ask the user only as a last resort.
 *
 * @returns `undefined` when there is no option
 */
export function renderParametersSection(options: Record<string, TeamMemberOption> | undefined): string | undefined {
    const optionsByKey = options ?? {}
    const keys         = Object.keys(optionsByKey)

    if (keys.length === 0) {
        return undefined
    }

    const rows = keys.map((key) => {
        const option = optionsByKey[key]

        return `| ${inlineCode(`{{${key}}}`)} | ${describeSuggestedValues(option)} | ${inlineCode(String(option.value))} |`
    })

    return `## Parameters

These instructions reference the parameters below, written as \`{{parameter}}\`. Resolve each one before starting:

1. Infer its value from the execution context: the user's request, the output of earlier steps, and the current project (its languages, manifest and lock files, dependencies, configuration, and existing conventions). For example, do not ask which language to use in a TypeScript codebase.
2. Only if a value cannot be inferred, ask the user, proposing the suggested values and the default. Ask about every unresolved parameter in a single question.

Never ask about a parameter whose value can be inferred, and never fall back to a default silently when the context points to another value.

| Parameter | Suggested values | Default |
| --- | --- | --- |
${rows.join('\n')}`
}
