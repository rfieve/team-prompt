import { TeamMember } from 'src/types'

import { fillPlaceholders } from './placeholders'

/**
 * Resolves every `{{param}}` placeholder in the team member's text fields using the
 * current option values.
 */
export function buildTeamMember(unbuildTeamMember: TeamMember): TeamMember {
    const { defaultTask, description, options, qualityControl, qualityControlSteps, trainingData } = unbuildTeamMember

    if (!options) {
        return unbuildTeamMember
    }

    const fill = (text: string) => fillPlaceholders(text, options, ({ value }) => String(value))

    return {
        ...unbuildTeamMember,
        defaultTask         : fill(defaultTask),
        description         : fill(description),
        qualityControl      : fill(qualityControl),
        qualityControlSteps : qualityControlSteps?.map((step) => fill(step)),
        trainingData        : fill(trainingData),
    }
}
