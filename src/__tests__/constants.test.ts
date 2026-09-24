import { teamMembers } from 'src/constants/team-members'
import { workflows } from 'src/constants/workflows'
import { TeamMember, Workflow } from 'src/types'

const membersByName: Record<string, TeamMember> = teamMembers
const workflowsByName: Record<string, Workflow> = workflows

const memberEntries   = Object.keys(membersByName).map((name): [string, TeamMember] => [name, membersByName[name]])
const workflowEntries = Object.keys(workflowsByName).map((name): [string, Workflow] => [name, workflowsByName[name]])

describe('teamMembers', () => {
    it('should have unique ids', () => {
        const ids = memberEntries.map(([, { id }]) => id)

        expect(new Set(ids).size).toBe(ids.length)
    })

    it.each(memberEntries)('%s should only reference existing, other team members as replacements', (_, member) => {
        const ids = new Set(memberEntries.map(([, { id }]) => id))

        for (const replacement of member.potentialReplacements ?? []) {
            expect(ids.has(replacement.id)).toBe(true)
            expect(replacement.id).not.toBe(member.id)
        }
    })
})

describe('workflows', () => {
    it('should have unique ids', () => {
        const ids = workflowEntries.map(([, { id }]) => id)

        expect(new Set(ids).size).toBe(ids.length)
    })

    it.each(workflowEntries)('%s should only build on earlier steps', (_, { steps }) => {
        for (const [index, { targetStepIndex }] of steps.entries()) {
            if (targetStepIndex !== undefined) {
                expect(targetStepIndex).toBeGreaterThanOrEqual(0)
                expect(targetStepIndex).toBeLessThan(index)
            }
        }
    })
})
