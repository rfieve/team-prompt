import { Awwwesome } from 'src/constants/companies'
import { createCompanySkill } from 'src/function/create-company-skill'

describe('createCompanySkill', () => {
    it('should create a company skill correctly', () => {
        expect(createCompanySkill(Awwwesome)).toMatchSnapshot()
    })

    it('should be named and described after the company', () => {
        const result = createCompanySkill(Awwwesome)

        expect(result).toMatch(/^---\nname: tp-company-awwwesome\ndescription: "A web development agency/)
        expect(result).toContain('Use it for a goal that takes several specialists')
    })

    it("should treat the user's request as the goal", () => {
        const result = createCompanySkill(Awwwesome)

        expect(result).toContain("Treat the user's request as the goal.")
        expect(result).toContain("wait for the user's validation of the plan")
        expect(result).toContain("Keep in mind the user's request: every step contributes to it.")
        expect(result).not.toMatch(/<goal>|<company>|\bme\b|\bmy\b/)
    })

    it('should list every team member skill with its description', () => {
        const result = createCompanySkill(Awwwesome)

        for (const { teamMembers } of Awwwesome.teams) {
            for (const { id, name, title } of teamMembers) {
                expect(result).toContain(`- \`tp-team-member-${id}\`: ${name}, ${title}. `)
            }
        }
    })

    it('should apply prompt options', () => {
        const result = createCompanySkill(Awwwesome, {
            allowClarifyingQuestions : true,
            context                  : 'The site must be static.',
            pauseAfterPlan           : false,
            review                   : true,
            verbosity                : 'explained',
        })

        expect(result).toContain("run the plan right away, without waiting for the user's validation")
        expect(result).toContain('add a review step')
        expect(result).toContain('ask a clarifying question')
        expect(result).toContain('Briefly explain your reasoning')
        expect(result).toContain("Keep in mind the user's request and the context below")
        expect(result).toContain('## Context\n\nAdditional context and constraints to respect throughout every step:\nThe site must be static.')
    })
})
