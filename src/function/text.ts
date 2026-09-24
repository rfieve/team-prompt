/**
 * A text part that may be omitted: `false`, `undefined`, and empty strings are dropped,
 * so optional parts can be written as `condition && 'text'`.
 */
export type OptionalText = string | false | undefined

/**
 * Drops the omitted parts of a list of text parts.
 */
export function compact(parts: OptionalText[]): string[] {
    return parts.filter((part): part is string => Boolean(part))
}

/**
 * Joins the present parts, one per line.
 */
export function joinLines(parts: OptionalText[]): string {
    return compact(parts).join('\n')
}

/**
 * Joins the present parts with a blank line between each.
 */
export function joinParagraphs(parts: OptionalText[]): string {
    return compact(parts).join('\n\n')
}

/**
 * Renders the present items as a markdown bullet list.
 */
export function bulletList(items: OptionalText[]): string {
    return compact(items)
        .map((item) => `- ${item}`)
        .join('\n')
}

/**
 * Wraps a text in markdown inline code.
 */
export function inlineCode(text: string): string {
    return `\`${text}\``
}

/**
 * Joins items into a human-readable list: "a", "a and b", "a, b, and c".
 */
export function formatList(items: readonly string[], conjunction: 'and' | 'or'): string {
    if (items.length <= 2) {
        return items.join(` ${conjunction} `)
    }

    return `${items.slice(0, -1).join(', ')}, ${conjunction} ${items[items.length - 1]}`
}

/**
 * Returns the items without duplicates, in order of first appearance.
 */
export function unique<T>(items: T[]): T[] {
    return [...new Set(items)]
}
