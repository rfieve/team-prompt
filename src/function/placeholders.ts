import { TeamMemberOption } from 'src/types'

/**
 * Replaces every `{{key}}` placeholder of `text` with the value `render` returns for the
 * matching option. Placeholders without a matching option are left untouched.
 */
export function fillPlaceholders(
    text: string,
    options: Record<string, TeamMemberOption> | undefined,
    render: (option: TeamMemberOption) => string
): string {
    const optionsByKey = options ?? {}

    return Object.keys(optionsByKey).reduce(
        (filled, key) => filled.split(`{{${key}}}`).join(render(optionsByKey[key])),
        text
    )
}
