import { teamMembers } from 'src/constants/team-members'
import { workflows } from 'src/constants/workflows'
import { createTeamMemberSkillDescription } from 'src/function/create-team-member-skill'
import { TeamMember, Workflow } from 'src/types'

const membersByName: Record<string, TeamMember> = teamMembers
const workflowsByName: Record<string, Workflow> = workflows

// Placeholders that are part of a team member's text rather than parameters.
const LITERAL_PLACEHOLDERS = new Set(['param'])

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

    it.each(memberEntries)('%s should have a matching option for every placeholder', (_, member) => {
        const { defaultTask, deliverable, description, options, qualityControl, qualityControlSteps, trainingData } = member
        const text                                                                                                  = [defaultTask, deliverable, description, qualityControl, trainingData, ...(qualityControlSteps ?? [])].join('\n')
        const keys                                                                                                  = Array.from(text.matchAll(/{{(\w+)}}/g), ([, key]) => key)

        for (const key of keys.filter((placeholder) => !LITERAL_PLACEHOLDERS.has(placeholder))) {
            expect(options ?? {}).toHaveProperty(key)
        }
    })

    it.each(memberEntries)('%s should have a deliverable', (_, { deliverable }) => {
        expect(deliverable).toBeTruthy()
    })

    it.each(memberEntries)('%s should have a skill description that fits without being cut', (_, member) => {
        expect(createTeamMemberSkillDescription(member).length).toBeLessThanOrEqual(1024)
    })

    it.each(memberEntries)('%s should default to local execution when it supports it', (_, { runningModes }) => {
        expect(runningModes.options).toContain(runningModes.value)

        if (runningModes.options.includes('localExecution')) {
            expect(runningModes.value).toBe('localExecution')
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
