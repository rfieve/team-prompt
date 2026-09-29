import { Company, CompanyPromptOption } from 'src/types'

import { CompanyRulesWording, renderCompanyRules, renderCompanyTeams } from './company'
import { compact, joinParagraphs, tag } from './text'

const WORDING: CompanyRulesWording = {
    company : '<company>',
    context : 'the constraints in <context>',
    goal    : 'the goal in <goal>',
    i       : 'I',
    me      : 'me',
    my      : 'my',
}

function renderInstructions(company: Company, options: CompanyPromptOption): string {
    return joinParagraphs([
        '# Your Instructions',
        'You will achieve the goal described in <goal> by running the company described in <company>. The company is organized into teams, linked by an organigram, and each team member is available to you as a skill that holds their expertise, working rules, and quality control.',
        'Do not do the work as a generalist: every piece of work is done by the skill of the team member whose expertise fits it best. You work in two phases: first you plan the work, then you run the plan.',
        renderCompanyRules(company, options, WORDING),
    ])
}

function renderCompany(company: Company): string {
    const { name, title, description } = company

    return tag('company', joinParagraphs([
        `## ${name} (${title})`,
        description,
        renderCompanyTeams(company),
    ]))
}

/**
 * Renders a prompt that makes the model run `company` to achieve `goal`: it first
 * identifies the profiles the goal needs among the company's team members and plans the
 * work following the organigram, then runs the plan, each step using the skill of its
 * team member.
 *
 * The team member skills are only referenced by name, along with their team member's
 * description: generate them with `createTeamMemberSkillFile` and install them first.
 *
 * @param goal - the ultimate goal of the prompt
 * @param company - the company to run, whose teams provide the team members
 * @param options - plan validation, reviews, verbosity, context, and clarifying-question behavior
 */
export function createCompanyPrompt(goal: string, company: Company, options: CompanyPromptOption = {}): string {
    const { context, pauseAfterPlan = true } = options

    const sections = compact([
        renderInstructions(company, options),
        `# The Goal\n\n${tag('goal', goal)}`,
        context && `# The Context\n\nConstraints to respect throughout every step:\n${tag('context', context)}`,
        `# The Company\n\n${renderCompany(company)}`,
        pauseAfterPlan
            ? 'Now start with the plan, and stop once it is written.'
            : 'Now start with the plan, then run it.',
    ])

    return `${sections.join('\n\n\n')}\n`
}
