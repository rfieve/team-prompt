import { teamMembers } from 'src/constants/team-members'
import { TeamMember } from 'src/types'

/**
 * Finds a built-in team member by its `id`.
 *
 * @returns `undefined` when no built-in team member has this `id`
 */
export function tryFindTeamMember(id: string): TeamMember | undefined {
    const membersByName: Record<string, TeamMember> = teamMembers
    const name                                      = Object.keys(membersByName).find((key) => membersByName[key].id === id)

    return name === undefined ? undefined : membersByName[name]
}

/**
 * Finds a built-in team member by its `id`.
 *
 * @throws when no built-in team member has this `id`
 */
export function findTeamMember(id: string): TeamMember {
    const member = tryFindTeamMember(id)

    if (member === undefined) {
        throw new Error(`No built-in team member has the id "${id}".`)
    }

    return member
}
