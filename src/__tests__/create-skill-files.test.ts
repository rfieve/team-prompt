import { TeamMemberBuilder } from 'src/class/team-member-builder'
import { Felix, Fred, Sybilla } from 'src/constants/team-members'
import { workflows } from 'src/constants/workflows'
import { createTeamMemberSkillFile, createWorkflowSkillFiles } from 'src/function/create-skill-files'
import { createTeamMemberSkill } from 'src/function/create-team-member-skill'
import { createWorkflowSkill } from 'src/function/create-workflow-skill'

describe('createTeamMemberSkillFile', () => {
    it('should place the skill in a directory named after it', () => {
        expect(createTeamMemberSkillFile(Fred)).toEqual({
            content : createTeamMemberSkill(Fred),
            path    : 'tp-team-member-fred/SKILL.md',
        })
    })
})

describe('createWorkflowSkillFiles', () => {
    it('should render the workflow skill first, with the given options', () => {
        const [workflowFile] = createWorkflowSkillFiles(workflows.Fortress, { pauseAt: [] })

        expect(workflowFile).toEqual({
            content : createWorkflowSkill(workflows.Fortress, { pauseAt: [] }),
            path    : 'tp-workflow-fortress/SKILL.md',
        })
    })

    it('should include the skills of every step and every replacement, once each', () => {
        const paths = createWorkflowSkillFiles({
            ...workflows.Fortress,
            steps : [{ responsible: Felix }, { responsible: Fred }, { responsible: Fred }],
        }).map(({ path }) => path)

        expect(paths).toEqual([
            'tp-workflow-fortress/SKILL.md',
            'tp-team-member-felix/SKILL.md',
            'tp-team-member-fred/SKILL.md',
            'tp-team-member-kira/SKILL.md',
            'tp-team-member-tessa/SKILL.md',
        ])
    })

    it("should keep a step's overridden team member over its built-in copy", () => {
        const member = new TeamMemberBuilder(Sybilla).setOption('format', 'table')
        const files  = createWorkflowSkillFiles({ ...workflows.Fortress, steps: [{ responsible: member }] })

        expect(files[1].content).toMatch(/\| `{{format}}` \| .* \| `table` \|/)
    })

    it('should skip replacements that are not built-in team members', () => {
        const member = { ...Fred, potentialReplacements: [{ id: 'nobody', when: 'never' }] }
        const paths  = createWorkflowSkillFiles({ ...workflows.Fortress, steps: [{ responsible: member }] }).map(
            ({ path }) => path
        )

        expect(paths).toEqual(['tp-workflow-fortress/SKILL.md', 'tp-team-member-fred/SKILL.md'])
    })
})
