import { PromptOption, Step, Workflow } from 'src/types'

import { createSkillFrontmatter, toTeamMemberSkillName, toWorkflowSkillName } from './create-skill-frontmatter'
import { formatPauseSteps, hasPotentialReplacements, toStepLabel } from './steps'
import { bulletList, inlineCode, joinParagraphs, unique } from './text'

function describePacing(pauseAt: number[] | undefined): string {
    if (pauseAt === undefined) {
        return 'Run one step at a time. After each step, stop and wait for the user to validate the result before starting the next one.'
    }

    if (pauseAt.length === 0) {
        return 'Run every step in order, one after another, without pausing for validation between them.'
    }

    return `Run the steps in order without pausing, except after ${formatPauseSteps(pauseAt)}, where you must stop and wait for the user's validation before continuing to the next step.`
}

function describeOutputStyle(verbosity: 'concise' | 'explained'): string {
    return verbosity === 'explained'
        ? 'At each step, briefly explain your reasoning (2-3 sentences) before the step output. Do not restate the task or announce the skill you are using.'
        : 'At each step, respond only with the step output: no role announcements, no restated task, no meta-commentary about what you are doing.'
}

function formatSkillList(skills: string[]): string {
    return skills.map((skill) => inlineCode(skill)).join(', ')
}

function collectMainSkills(steps: Step[]): string[] {
    return unique(steps.map(({ responsible }) => toTeamMemberSkillName(responsible.id)))
}

/**
 * Collects the replacement skills that are not already the main skill of a step.
 */
function collectReplacementSkills(steps: Step[]): string[] {
    const mainSkills        = new Set(collectMainSkills(steps))
    const replacementSkills = steps.reduce<string[]>(
        (skills, { responsible }) =>
            skills.concat((responsible.potentialReplacements ?? []).map(({ id }) => toTeamMemberSkillName(id))),
        []
    )

    return unique(replacementSkills).filter((skill) => !mainSkills.has(skill))
}

function renderRequiredSkillsSection(steps: Step[]): string {
    const replacementSkills = collectReplacementSkills(steps)

    return joinParagraphs([
        '## Required skills',
        `This workflow relies on the following skills: ${formatSkillList(collectMainSkills(steps))}.
If one of them is not available, stop and tell the user which skill is missing instead of improvising it.`,
        replacementSkills.length > 0
            && `Some steps can also use these replacement skills: ${formatSkillList(replacementSkills)}.
They are optional: if a replacement skill is not available, use the step's main skill instead.`,
    ])
}

function renderRunRulesSection(
    { allowClarifyingQuestions, context, pauseAt, verbosity = 'concise' }: PromptOption,
    hasReplacements: boolean
): string {
    const rules = bulletList([
        describePacing(pauseAt),
        "At each step, use the named skill and follow its instructions, including its quality control, to resolve the step's task.",
        hasReplacements
            && "When a step lists replacements, use the replacement skill instead if its condition matches the context. The replacement resolves the task described by its own skill, not the step's task, based on the same validated steps.",
        "Tasks may reference parameters written as `{{parameter}}`: resolve them as the step's skill describes, inferring them from the context and asking the user only when they cannot be inferred. Once a parameter is resolved, reuse its value at every later step that references it instead of resolving it again.",
        "At each step, base your work on the user's request and, when the step builds on an earlier one, on that step's validated output.",
        describeOutputStyle(verbosity),
        allowClarifyingQuestions
            && 'At each step, if the task is genuinely ambiguous and guessing wrong would be costly, ask a clarifying question instead of proceeding.',
        `At each step, keep in mind the user's request${context ? ' and the context below' : ''}.`,
    ])

    return `## How to run the steps\n\n${rules}`
}

function renderStep({ responsible, task, targetStepIndex }: Step, index: number): string {
    const replacements = (responsible.potentialReplacements ?? []).map(({ id, when }) =>
        `**Replace with:** ${inlineCode(toTeamMemberSkillName(id))} if ${when}`)

    const details = bulletList([
        `**Skill:** ${inlineCode(toTeamMemberSkillName(responsible.id))}`,
        ...replacements,
        targetStepIndex !== undefined && `**Builds on:** the validated output of ${toStepLabel(targetStepIndex)}`,
        `**Task:** ${task || responsible.defaultTask}`,
    ])

    return `### ${toStepLabel(index)}: ${responsible.name} (${responsible.title})\n\n${details}`
}

/**
 * Renders a workflow as the content of an Agent Skill `SKILL.md` file that orchestrates
 * other skills: each step delegates to the skill of its responsible team member, referenced
 * by name. Those skills are not included; generate them with `createTeamMemberSkill` and
 * install them alongside this one.
 *
 * Like team member skills, option values are not baked in: step tasks keep their
 * `{{param}}` placeholders, to be inferred from the execution context at run time.
 *
 * @param workflow - the workflow to render
 * @param options - pacing, verbosity, context, and clarifying-question behavior, with the
 * same defaults as `createTeamPrompt`
 * @returns the `SKILL.md` content: YAML frontmatter (`name`, `description`) followed by
 * the markdown instructions
 */
export function createWorkflowSkill(workflow: Workflow, options: PromptOption = {}): string {
    const { id, name, title, description, steps } = workflow
    const { context }                             = options

    return `${joinParagraphs([
        createSkillFrontmatter(toWorkflowSkillName(id), description),
        `# ${name} (${title})`,
        description,
        "Treat the user's request as the goal of this workflow. Achieve it by running the steps below in order, each one using the skill of its responsible team member.",
        renderRequiredSkillsSection(steps),
        renderRunRulesSection(options, hasPotentialReplacements(steps)),
        context && `## Context\n\nAdditional context and constraints to respect throughout every step:\n${context}`,
        '## Steps',
        ...steps.map((step, index) => renderStep(step, index)),
    ])}\n`
}
