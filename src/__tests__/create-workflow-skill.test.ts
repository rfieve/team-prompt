import {
    BugHunters,
    Fortress,
    FullStackers,
    NitpickingSquadron,
    NumberCrunchers,
    PixelPioneers,
} from 'src/constants/workflows'
import { createWorkflowSkill } from 'src/function/create-workflow-skill'

describe('createWorkflowSkill', () => {
    it('should create a workflow skill correctly', () => {
        const result = createWorkflowSkill(NitpickingSquadron)

        expect(result).toMatchSnapshot()
    })

    it('should list each required skill once', () => {
        const result       = createWorkflowSkill(PixelPioneers)
        const requiredLine = result.split('\n').find((line) => line.includes('following skills:')) ?? ''

        expect(requiredLine.match(/`tp-agent-fred`/g)).toHaveLength(1)
    })

    it('should apply prompt options', () => {
        const result = createWorkflowSkill(Fortress, {
            allowClarifyingQuestions : true,
            context                  : 'Only audit the auth module.',
            pauseAt                  : [0, 2],
            verbosity                : 'explained',
        })

        expect(result).toContain('except after Step #1 and Step #3')
        expect(result).toContain('briefly explain your reasoning')
        expect(result).toContain('ask a clarifying question')
        expect(result).toContain('## Context')
        expect(result).toContain('Only audit the auth module.')
    })

    it('should not pause when pauseAt is empty', () => {
        const result = createWorkflowSkill(Fortress, { pauseAt: [] })

        expect(result).toContain('without pausing for validation between them')
    })

    it('should keep option placeholders in step tasks', () => {
        const result = createWorkflowSkill(NumberCrunchers)

        expect(result).toContain('provide the related tests in {{language}} with {{framework}}')
        expect(result).not.toContain('PyTest')
    })

    it('should list replacements per step and as optional skills', () => {
        const result = createWorkflowSkill(BugHunters)

        expect(result).toContain('- **Replace with:** `tp-agent-kira` if the bug is a security vulnerability')
        expect(result).toContain('replacement skills: `tp-agent-kira`, `tp-agent-tessa`.')
        expect(result).not.toMatch(/following skills: .*tp-agent-kira/)
    })

    it('should not list a replacement as optional when it is already a main skill', () => {
        const result = createWorkflowSkill(FullStackers)

        expect(result).toContain('- **Replace with:** `tp-agent-bastian`')
        expect(result).not.toContain('replacement skills: `tp-agent-bastian`')
        expect(result).toContain('When a step lists replacements')
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
    ])('should render a workflow with replacements and %s', (_, options) => {
        expect(createWorkflowSkill(BugHunters, options)).toMatchSnapshot()
    })
})
