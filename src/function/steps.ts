import { Step } from 'src/types'

import { formatList } from './text'

/**
 * Returns the human-readable label of a 0-indexed step: `Step #1` for index 0.
 */
export function toStepLabel(index: number): string {
    return `Step #${index + 1}`
}

/**
 * Lists the steps to pause after, in ascending order: "Step #1 and Step #3".
 */
export function formatPauseSteps(pauseAt: number[]): string {
    return formatList(
        [...pauseAt].sort((a, b) => a - b).map((index) => toStepLabel(index)),
        'and'
    )
}

/**
 * Tells whether any step's responsible team member has potential replacements.
 */
export function hasPotentialReplacements(steps: Step[]): boolean {
    return steps.some(({ responsible }) => Boolean(responsible.potentialReplacements?.length))
}
