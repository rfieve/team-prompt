import { teamMembers } from 'src/constants/team-members'
import { TeamMember } from 'src/types'

/**
 * Finds a built-in team member by its `id`.
 *
 * @throws when no built-in team member has this `id`
 */
export function findTeamMember(id: string): TeamMember {
    const membersByName: Record<string, TeamMember> = teamMembers
    const name                                      = Object.keys(membersByName).find((key) => membersByName[key].id === id)

    if (name === undefined) {
        throw new Error(`No built-in team member has the id "${id}".`)
    }

    return membersByName[name]
}
