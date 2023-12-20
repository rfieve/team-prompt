import { Fred, Sybilla } from 'src/constants/team-members'
import { createTeamPrompt } from 'src/function/create-team-prompt'

describe('createTeamPrompt', () => {
    it('should build a team member correctly', () => {
        const result = createTeamPrompt('test', [
            {
                responsible : Fred,
            },
            {
                responsible     : Sybilla,
                targetStepIndex : 0,
                task            : 'fake task',
            },
        ])

        expect(result).toMatchSnapshot()
    })
})
