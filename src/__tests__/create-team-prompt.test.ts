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

    it('should apply the running mode override only to team members supporting it', () => {
        const chatOnly = { ...Sybilla, runningModes: { options: ['conversational' as const], value: 'conversational' as const } }
        const result   = createTeamPrompt('test', [{ responsible: Fred }, { responsible: chatOnly }], { runningMode: 'localExecution' })

        expect(result).toContain('<step number="1" mode="localExecution">')
        expect(result).toContain('<step number="2" mode="conversational">')
        expect(result).toContain('### Steps in `localExecution` mode')
        expect(result).toContain('### Steps in `conversational` mode')
    })

    it('should only render the rules of the running modes in use', () => {
        const result = createTeamPrompt('test', [{ responsible: Fred }], { runningMode: 'conversational' })

        expect(result).toContain('<step number="1" mode="conversational">')
        expect(result).not.toContain('`localExecution` mode')
    })

    it.each([
        ['pausing after every step', undefined, false],
        ['never pausing', [], true],
        ['pausing after every step but the last', [0, 1], false],
        ['pausing after some steps', [1], true],
    ])('should require step headers only when a response holds several steps, %s', (_, pauseAt, expected) => {
        const result = createTeamPrompt('test', [{ responsible: Fred }, { responsible: Fred }, { responsible: Fred }], { pauseAt })

        expect(result.includes('`## Step #N` header')).toBe(expected)
    })

    it('should only call a targeted step validated when it is followed by a pause', () => {
        const result = createTeamPrompt('test', [
            { responsible: Fred },
            { responsible: Fred, targetStepIndex: 0 },
            { responsible: Fred, targetStepIndex: 1 },
        ], { pauseAt: [0] })

        expect(result).toContain('Based on what has been validated at Step #1: ')
        expect(result).toContain('Based on the output of Step #2: ')
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
