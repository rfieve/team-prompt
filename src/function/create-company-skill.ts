import { Company, CompanyPromptOption } from 'src/types'

import { CompanyRulesWording, renderCompanyRules, renderCompanyTeams } from './company'
import { createSkillFrontmatter, toCompanySkillName } from './create-skill-frontmatter'
import { joinParagraphs } from './text'

const WORDING: CompanyRulesWording = {
    company : 'the teams below',
    context : 'the context below',
    goal    : 'the user\'s request',
    i       : 'the user',
    me      : 'the user',
    my      : 'the user\'s',
}

/**
 * Renders the frontmatter description of a company skill: what the company does, and
 * when to use it rather than a single team member skill.
 */
function createCompanySkillDescription({ name, description }: Company): string {
    return `${description} Use it for a goal that takes several specialists: ${name} identifies which of its team members the goal needs, plans their work following its organigram, then runs the plan with their skills.`
}

/**
 * Renders a company as the content of an Agent Skill `SKILL.md` file that treats the
 * user's request as its goal: it plans which team members the goal needs following the
 * organigram, then runs the plan, each step delegating to the skill of its team member,
 * referenced by name. Those skills are not included; generate them with
 * `createTeamMemberSkill` and install them alongside this one.
 *
 * @param company - the company to render
 * @param options - the same options as `createCompanyPrompt`
 * @returns the `SKILL.md` content: YAML frontmatter (`name`, `description`) followed by
 * the markdown instructions
 */
export function createCompanySkill(company: Company, options: CompanyPromptOption = {}): string {
    const { id, name, title, description } = company
    const { context }                      = options

    return `${joinParagraphs([
        createSkillFrontmatter(toCompanySkillName(id), createCompanySkillDescription(company)),
        `# ${name} (${title})`,
        description,
        "Treat the user's request as the goal. Achieve it by running the company: its teams, linked by an organigram, are listed below, and each team member is available as a skill that holds their expertise, working rules, and quality control.",
        'Do not do the work as a generalist: every piece of work is done by the skill of the team member whose expertise fits it best. You work in two phases: first you plan the work, then you run the plan.',
        renderCompanyRules(company, options, WORDING),
        context && `## Context\n\nAdditional context and constraints to respect throughout every step:\n${context}`,
        '## Teams',
        renderCompanyTeams(company),
    ])}\n`
}
