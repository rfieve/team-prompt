import { Fred } from 'src/constants/team-members'
import { buildTeamMember } from 'src/function/build-team-member'

describe('buildTeamMember', () => {
    it('should build a team member correctly', () => {
        const result = buildTeamMember(Fred)

        expect(result).toMatchSnapshot()
    })
})
