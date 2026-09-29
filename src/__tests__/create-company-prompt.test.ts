import { Awwwesome } from 'src/constants/companies'
import { Ouria } from 'src/constants/team-members'
import { createCompanyPrompt } from 'src/function/create-company-prompt'

describe('createCompanyPrompt', () => {
    it('should create a company prompt correctly', () => {
        const result = createCompanyPrompt('Build a landing page for our new product.', Awwwesome)

        expect(result).toMatchSnapshot()
    })

    it('should list every team member skill with its description', () => {
        const result = createCompanyPrompt('Build a landing page.', Awwwesome)

        for (const { teamMembers } of Awwwesome.teams) {
            for (const { id, name, title } of teamMembers) {
                expect(result).toContain(`- \`tp-team-member-${id}\`: ${name}, ${title}. `)
            }
        }
    })

    it('should describe the organigram', () => {
        const result = createCompanyPrompt('Build a landing page.', Awwwesome)

        expect(result).toContain('top of the company (`project-management`)')
        expect(result).toContain('- **Reports to:** `architecture` and `design`')
        expect(result).toContain('- **Reports to:** no one, this is the top of the company')
    })

    it('should replace option placeholders with their choices', () => {
        const result = createCompanyPrompt('Build a landing page.', Awwwesome)

        expect(result).not.toMatch(/{{\w+}}\.? .*\n/)
    })

    it('should pause after the plan by default', () => {
        const result = createCompanyPrompt('Build a landing page.', Awwwesome)

        expect(result).toContain('stop and wait for my validation of the plan')
        expect(result).toContain('stop once it is written')
        expect(result).not.toContain('review step')
    })

    it('should apply prompt options', () => {
        const result = createCompanyPrompt('Build a landing page.', Awwwesome, {
            allowClarifyingQuestions : true,
            context                  : 'The site must be static.',
            pauseAfterPlan           : false,
            review                   : true,
            verbosity                : 'explained',
        })

        expect(result).toContain('run the plan right away')
        expect(result).toContain('Now start with the plan, then run it.')
        expect(result).toContain('add a review step')
        expect(result).toContain('send the work back')
        expect(result).toContain('ask a clarifying question')
        expect(result).toContain('Briefly explain your reasoning')
        expect(result).toContain('<context>\nThe site must be static.\n</context>')
    })

    it('should plan generated profiles when the company has a profile generator', () => {
        const result = createCompanyPrompt('Build a landing page.', Awwwesome)

        expect(result).toContain('add a step for `tp-team-member-ouria` (Ouria, Profile Generator) to generate that profile first')
        expect(result).toContain('or with a profile generated for the need')
        expect(result).toContain('**Profile:** the step that generates it')
    })

    it('should only flag missing profiles when the company has no profile generator', () => {
        const company = {
            ...Awwwesome,
            teams : Awwwesome.teams.map((team) => ({
                ...team,
                teamMembers : team.teamMembers.filter(({ id }) => id !== Ouria.id),
            })),
        }
        const result  = createCompanyPrompt('Build a landing page.', company)

        expect(result).toContain('say so in the plan instead of improvising that expertise')
        expect(result).not.toContain('tp-team-member-ouria')
        expect(result).not.toContain('generated profile')
    })
})
