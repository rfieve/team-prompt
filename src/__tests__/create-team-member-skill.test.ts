import { TeamMemberBuilder } from 'src/class/team-member-builder'
import { Felix, Fred, Leo, Sybilla } from 'src/constants/team-members'
import { createTeamMemberSkill } from 'src/function/create-team-member-skill'

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

        expect(result).toContain('\nname: tp-agent-my-custom-fred\n')
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
        expect(result).toContain('- If the bug is a security vulnerability, use the `tp-agent-kira` skill instead of this one.')
        expect(result).toContain('use the `tp-agent-tessa` skill instead of this one.')
    })

    it.each([
        ['replacements and parameters', Felix],
        ['number parameters', Leo],
        ['no parameters', { ...Fred, options: undefined }],
    ])('should render a skill with %s', (_, member) => {
        expect(createTeamMemberSkill(member)).toMatchSnapshot()
    })
})
