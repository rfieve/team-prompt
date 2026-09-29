import { TeamMemberBuilder } from 'src/class/team-member-builder'
import { Felix, Fred, Leo, Sybilla } from 'src/constants/team-members'
import { createTeamMemberSkill } from 'src/function/create-team-member-skill'
import { TeamMemberRunningModes } from 'src/types'

describe('createTeamMemberSkill', () => {
    it('should create a team member skill correctly', () => {
        const result = createTeamMemberSkill(Fred)

        expect(result).toMatchSnapshot()
    })

    it('should keep option placeholders and describe them as parameters', () => {
        const result = createTeamMemberSkill(Sybilla)

        expect(result).toContain('Confirm the mind map is rendered in {{format}} format.')
        expect(result).toContain('## Parameters')
        expect(result).toContain('| `{{format}}` | `list`, `tree`, `table`, `outline`, `kanban`, `timeline`, `flowchart`, or any other value | `list` |')
    })

    it('should list every choice of an option in the description', () => {
        const result          = createTeamMemberSkill(Fred)
        const [, description] = /\ndescription: (".*")\n/.exec(result) ?? []

        expect(description).toContain('TypeScript/JavaScript, Python, Go, Java, Rust, C#, or PHP')
        expect(description).not.toContain('{{')
    })

    it('should describe a number option by its range in the description', () => {
        const result          = createTeamMemberSkill(Leo)
        const [, description] = /\ndescription: (".*")\n/.exec(result) ?? []

        expect(description).toContain('simulating 10 to 1000000 concurrent users')
    })

    it('should only use the first sentence of the default task in the description', () => {
        const result          = createTeamMemberSkill(Fred)
        const [, description] = /\ndescription: (".*")\n/.exec(result) ?? []

        expect(description).toContain('Typical task: Provide meticulously detailed')
        expect(description).not.toContain('Provide usage examples')
    })

    it('should point to potential replacements in the description', () => {
        const result          = createTeamMemberSkill(Felix)
        const [, description] = /\ndescription: (".*")\n/.exec(result) ?? []

        expect(description).toContain('If the bug is a security vulnerability, use tp-team-member-kira instead.')
    })

    it('should leave the typical task out rather than cut the redirections', () => {
        const result          = createTeamMemberSkill({ ...Felix, defaultTask: `${'a'.repeat(1000)}.` })
        const [, description] = /\ndescription: (".*")\n/.exec(result) ?? []

        expect(description).not.toContain('Typical task')
        expect(description).toContain('use tp-team-member-tessa instead.')
    })

    it('should not roleplay a named persona', () => {
        expect(createTeamMemberSkill(Fred)).not.toContain('You are Fred')
    })

    it('should render the deliverable when present', () => {
        expect(createTeamMemberSkill(Fred)).toContain('## What you deliver\n\nThe documentation, written in the code itself')
        expect(createTeamMemberSkill({ ...Fred, deliverable: undefined })).not.toContain('## What you deliver')
    })

    it.each<[string, TeamMemberRunningModes, string[]]>([
        [
            'local first',
            { options: ['localExecution', 'conversational'], value: 'localExecution' },
            ["Work directly in the user's project", 'If there is no project to work on, or the user only asks for advice'],
        ],
        [
            'local only',
            { options: ['localExecution'], value: 'localExecution' },
            ['tell the user this skill needs one'],
        ],
        [
            'conversational first',
            { options: ['conversational', 'localExecution'], value: 'conversational' },
            ['Answer in the chat', 'If the user asks for the result in their project, work there instead.'],
        ],
        [
            'conversational only',
            { options: ['conversational'], value: 'conversational' },
            ["Do not modify the user's files."],
        ],
    ])('should describe where to work when %s', (_, runningModes, expected) => {
        const result = createTeamMemberSkill({ ...Fred, runningModes })

        expect(result).toContain('## Where you work')

        for (const text of expected) {
            expect(result).toContain(text)
        }
    })

    it('should describe the range of number options', () => {
        const result = createTeamMemberSkill(Leo)

        expect(result).toContain('| `{{concurrentUsers}}` | a number between 10 and 1000000 | `10000` |')
    })

    it('should propose overridden option values as the default', () => {
        const result = createTeamMemberSkill(new TeamMemberBuilder(Sybilla).setOption('format', 'table'))

        expect(result).toContain('Confirm the mind map is rendered in {{format}} format.')
        expect(result).toMatch(/\| `{{format}}` \| .* \| `table` \|/)
    })

    it('should omit the parameters section when there is no option', () => {
        const result = createTeamMemberSkill({ ...Fred, options: undefined })

        expect(result).not.toContain('## Parameters')
    })

    it('should sanitize the skill name', () => {
        const result = createTeamMemberSkill({ ...Fred, id: 'My Custom_Fred!' })

        expect(result).toContain('\nname: tp-team-member-my-custom-fred\n')
    })

    it('should cap the description at 1024 characters', () => {
        const result          = createTeamMemberSkill({ ...Fred, description: 'a'.repeat(2000) })
        const [, description] = /\ndescription: (".*")\n/.exec(result) ?? []

        expect((JSON.parse(description) as string).length).toBe(1024)
    })

    it('should cap the description after the last complete sentence that fits', () => {
        const result          = createTeamMemberSkill({ ...Fred, description: `${'a'.repeat(500)}. ${'b'.repeat(1000)}.` })
        const [, description] = /\ndescription: (".*")\n/.exec(result) ?? []

        expect(JSON.parse(description)).toBe(`${'a'.repeat(500)}.`)
    })

    it('should point to the skills of potential replacements', () => {
        const result = createTeamMemberSkill(Felix)

        expect(result).toContain('## When another specialist fits better')
        expect(result).toContain('- If the bug is a security vulnerability, use the `tp-team-member-kira` skill instead of this one.')
        expect(result).toContain('use the `tp-team-member-tessa` skill instead of this one.')
    })

    it.each([
        ['replacements and parameters', Felix],
        ['number parameters', Leo],
        ['no parameters', { ...Fred, options: undefined }],
    ])('should render a skill with %s', (_, member) => {
        expect(createTeamMemberSkill(member)).toMatchSnapshot()
    })
})
