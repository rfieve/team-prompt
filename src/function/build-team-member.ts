import { TeamMember, TeamMemberOption } from 'src/types'

function buildField(unbuildField: string, options: Record<string, TeamMemberOption>): string {
    let field = unbuildField

    for (const optionKey of Object.keys(options)) {
        // eslint-disable-next-line unicorn/prefer-string-replace-all
        field = field.replace(new RegExp(`{{${optionKey}}}`, 'g'), String(options[optionKey].value))
    }

    return field
}

export function buildTeamMember(unbuildTeamMember: TeamMember): TeamMember {
    if (!unbuildTeamMember.options) {
        return unbuildTeamMember
    }

    return {
        ...unbuildTeamMember,
        defaultTask    : buildField(unbuildTeamMember.defaultTask, unbuildTeamMember.options),
        description    : buildField(unbuildTeamMember.description, unbuildTeamMember.options),
        qualityControl : buildField(unbuildTeamMember.qualityControl, unbuildTeamMember.options),
        trainingData   : buildField(unbuildTeamMember.trainingData, unbuildTeamMember.options),
    }
}
