import { TeamMember } from 'src/types'

import { fillPlaceholders } from './placeholders'

/**
 * Resolves every `{{param}}` placeholder in the team member's text fields using the
 * current option values.
 */
export function buildTeamMember(unbuildTeamMember: TeamMember): TeamMember {
    const { defaultTask, deliverable, description, options, process, qualityControl, qualityControlSteps, rules, trainingData, useWhen } = unbuildTeamMember

    if (!options) {
        return unbuildTeamMember
    }

    const fill = (text: string) => fillPlaceholders(text, options, ({ value }) => String(value))

    return {
        ...unbuildTeamMember,
        defaultTask         : fill(defaultTask),
        deliverable         : deliverable === undefined ? undefined : fill(deliverable),
        description         : fill(description),
        process             : process.map((step) => fill(step)),
        qualityControl      : fill(qualityControl),
        qualityControlSteps : qualityControlSteps?.map((step) => fill(step)),
        rules               : rules.map((rule) => fill(rule)),
        trainingData        : fill(trainingData),
        useWhen             : useWhen === undefined ? undefined : fill(useWhen),
    }
}
