import { Ouria } from 'src/constants/team-members'
import { Company, CompanyPromptOption, CompanyTeam, TeamMember } from 'src/types'

import { toTeamMemberSkillName } from './create-skill-frontmatter'
import { replacePlaceholdersWithChoices } from './skill-parameters'
import { bulletList, formatList, inlineCode, joinParagraphs } from './text'

/**
 * How the rules refer to their surroundings, which differ between a prompt (the goal is
 * in a `<goal>` block, the reader is "me") and a skill (the goal is the user's request).
 */
export type CompanyRulesWording = {
    company : string;
    context : string;
    goal    : string;
    i       : string;
    me      : string;
    my      : string;
}

function formatTeamIds(ids: string[]): string {
    return formatList(ids.map((id) => inlineCode(id)), 'and')
}

function describeOutputStyle(verbosity: 'concise' | 'explained'): string {
    return verbosity === 'explained'
        ? 'Briefly explain your reasoning (2-3 sentences) before each step\'s output. Do not restate the task.'
        : 'Keep each step\'s output to its result: no restated task, no commentary on what you are about to do.'
}

/**
 * Returns the ids of the teams at the top of the company: those without parent teams.
 */
export function findTopTeamIds({ teams }: Company): string[] {
    return teams.filter(({ parents }) => parents.length === 0).map(({ id }) => id)
}

/**
 * Lists the team members of a company, without duplicates, in organigram order.
 */
export function collectCompanyTeamMembers({ teams }: Company): TeamMember[] {
    const membersById = new Map<string, TeamMember>()

    for (const member of teams.flatMap(({ teamMembers }) => teamMembers)) {
        if (!membersById.has(member.id)) {
            membersById.set(member.id, member)
        }
    }

    return [...membersById.values()]
}

/**
 * Returns the company's profile generator, who writes the profiles of the expertise no
 * team member covers, or `undefined` when the company has none.
 */
function findProfileGenerator(company: Company): TeamMember | undefined {
    return collectCompanyTeamMembers(company).find(({ id }) => id === Ouria.id)
}

function describeMissingProfile(company: string, profileGenerator: TeamMember | undefined): string {
    const check = `Check which of the skills listed in ${company} are available to you. Only plan with available skills`

    if (!profileGenerator) {
        return `${check}: if a profile the goal needs has no available skill, say so in the plan instead of improvising that expertise.`
    }

    const { id, name, title } = profileGenerator

    return `${check}. If a profile the goal needs is not covered by any available skill, add a step for ${inlineCode(toTeamMemberSkillName(id))} (${name}, ${title}) to generate that profile first, then assign the work to the generated profile: take its perspective and follow its task, training data, and quality control as you would a skill's. If that skill is not available either, say so in the plan instead of improvising that expertise.`
}

function renderPlanningRules(
    { pauseAfterPlan = true, review = false }: CompanyPromptOption,
    topTeamIds: string[],
    profileGenerator: TeamMember | undefined,
    { company, my }: CompanyRulesWording
): string {
    return joinParagraphs([
        '## Phase 1: plan the work',
        `Take the perspective of the top of the company (${formatTeamIds(topTeamIds)}) to staff and plan the work:`,
        bulletList([
            describeMissingProfile(company, profileGenerator),
            'Identify the needs of the goal, then the profiles that cover them: pick only the team members whose expertise the goal requires. Leaving most of the company out is expected, since every extra step costs time and is one more thing to review.',
            'Order the steps following the organigram: a team\'s work comes before the work of its child teams when they build upon it (for instance, specifications before architecture, architecture before development).',
            'Assign each step to a single team member, with a task specific to the goal rather than their generic job.',
            review
                && 'After each step whose team has parent teams, add a review step assigned to the most relevant member of one of those parent teams, who checks the output against the goal and the standards of their own skill.',
        ]),
        pauseAfterPlan
            ? `Then stop and wait for ${my} validation of the plan before running it: staffing mistakes are cheaper to fix before any step builds on them.`
            : `Then run the plan right away, without waiting for ${my} validation.`,
    ])
}

function renderRunRules(
    { allowClarifyingQuestions, context: hasContext, review = false }: CompanyPromptOption,
    profileGenerator: TeamMember | undefined,
    { company, context, goal, me }: CompanyRulesWording
): string {
    return joinParagraphs([
        '## Phase 2: run the plan',
        bulletList([
            'Run the steps in order, one after another, without pausing between them unless a step is blocked.',
            'At each step, use the step\'s skill and follow its instructions, including where it works and its quality control, to resolve the step\'s task.',
            'Base each step on the goal and, when it builds on an earlier step, on that step\'s output.',
            'When a skill points to another specialist that fits the context better, switch to that skill if it is available, and state the switch in one line.',
            `Skills may reference parameters written as \`{{parameter}}\`: resolve them as the skill describes, inferring them from the context and asking ${me} only when they cannot be inferred. Once a parameter is resolved, reuse its value at every later step instead of resolving it again.`,
            review
                && 'When a review finds issues, send the work back to the reviewed step\'s skill to fix them before moving on.',
            `When the work reveals a need the plan missed, or makes a planned step pointless, adapt the plan with the team members of ${company}${profileGenerator ? ', or with a profile generated for the need' : ''}, and state the change in one line.`,
            'When a step is blocked, escalate it to its team\'s parent teams: take the perspective of their most relevant member to decide how to unblock it. If the top of the company cannot unblock it either, stop and explain what blocks it.',
            allowClarifyingQuestions
                && 'If a task is genuinely ambiguous and guessing wrong would be costly, ask a clarifying question instead of proceeding.',
            `Keep in mind ${goal}${hasContext ? ` and ${context}` : ''}: every step contributes to it.`,
        ]),
    ])
}

function renderOutputRules(
    { verbosity = 'concise' }: CompanyPromptOption,
    profileGenerator: TeamMember | undefined,
    { i, me }: CompanyRulesWording
): string {
    return joinParagraphs([
        '## How to format your responses',
        bulletList([
            'Write the plan as a `## Plan` section: first the needs of the goal, each with the team member who covers it, then one `### Step #N: {name} ({title})` header per step, followed by a list with the step\'s **Skill**, **Team**, **Task**, and, when it builds on an earlier step, **Builds on**.',
            profileGenerator
                && 'For a step assigned to a generated profile, replace **Skill** and **Team** with **Profile:** the step that generates it, so it is clear which expertise is not backed by a skill.',
            'Start each step\'s output with its `## Step #N: {name} ({title})` header, so later steps can refer to it.',
            describeOutputStyle(verbosity),
            `When you had to assume something the task did not specify, or a question remains open, end the step with a single line listing them, so ${i} can correct them early.`,
            `Once every step is done, end with a short summary of what was achieved, and of what is left for ${me} to check or decide.`,
        ]),
    ])
}

/**
 * Renders the rules shared by company prompts and skills: planning, running, and
 * formatting.
 */
export function renderCompanyRules(company: Company, options: CompanyPromptOption, wording: CompanyRulesWording): string {
    const profileGenerator = findProfileGenerator(company)

    return joinParagraphs([
        renderPlanningRules(options, findTopTeamIds(company), profileGenerator, wording),
        renderRunRules(options, profileGenerator, wording),
        renderOutputRules(options, profileGenerator, wording),
    ])
}

function renderTeamMember({ id, name, title, description, options }: TeamMember): string {
    return `${inlineCode(toTeamMemberSkillName(id))}: ${name}, ${title}. ${replacePlaceholdersWithChoices(description, options)}`
}

function renderTeam({ id, name, title, description, teamMembers, parents, children }: CompanyTeam): string {
    return joinParagraphs([
        `### ${name} (${title})`,
        bulletList([
            `**Id:** ${inlineCode(id)}`,
            `**Reports to:** ${parents.length > 0 ? formatTeamIds(parents) : 'no one, this is the top of the company'}`,
            children.length > 0 && `**Oversees:** ${formatTeamIds(children)}`,
        ]),
        description,
        `Team members, by skill:\n${bulletList(teamMembers.map((member) => renderTeamMember(member)))}`,
    ])
}

/**
 * Renders the teams of a company, each with its place in the organigram and its team
 * members listed by skill name.
 */
export function renderCompanyTeams({ teams }: Company): string {
    return joinParagraphs(teams.map((team) => renderTeam(team)))
}
