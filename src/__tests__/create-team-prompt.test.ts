import { Ernest, Fred, Sybilla } from 'src/constants/team-members'
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

    it('should list potential replacements with their condition', () => {
        const result = createTeamPrompt('test', [{ responsible: Ernest }])

        expect(result).toContain(' - <potential_replacements>: when present')
        expect(result).toContain('<potential_replacements>\n- If the project uses a NoSQL database (document, key-value, or wide-column store): Nadia (NoSQL Database Administrator):')
    })

    it('should not mention replacements when no step has any', () => {
        const result = createTeamPrompt('test', [{ responsible: Fred }])

        expect(result).not.toContain('potential_replacements')
    })

    it('should throw on an unknown replacement id', () => {
        const responsible = { ...Fred, potentialReplacements: [{ id: 'nobody', when: 'never' }] }

        expect(() => createTeamPrompt('test', [{ responsible }])).toThrow('No built-in team member has the id "nobody".')
    })

    it.each([
        ['default options', {}],
        ['no pause', { pauseAt: [] }],
        [
            'every option',
            {
                allowClarifyingQuestions : true,
                context                  : 'The codebase uses Node 22.',
                pauseAt                  : [2, 0],
                verbosity                : 'explained' as const,
            },
        ],
    ])('should render replacements with %s', (_, options) => {
        const result = createTeamPrompt('test', [
            { responsible: Sybilla },
            { responsible: Ernest, targetStepIndex: 0 },
            { responsible: Fred, targetStepIndex: 1, task: 'fake task' },
        ], options)

        expect(result).toMatchSnapshot()
    })
})
