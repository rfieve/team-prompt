import { PromptOption, Workflow } from 'src/types'

import { createSkillFrontmatter, toTeamMemberSkillName, toWorkflowSkillName } from './create-skill-frontmatter'
import { formatStepNumbers } from './create-team-prompt'

function describePacing(pauseAt: number[] | undefined): string {
    if (pauseAt === undefined) {
        return 'Run one step at a time. After each step, stop and wait for the user to validate the result before starting the next one.'
    }

    if (pauseAt.length === 0) {
        return 'Run every step in order, one after another, without pausing for validation between them.'
    }

    const pauseLabel = formatStepNumbers([...pauseAt].sort((a, b) => a - b))

    return `Run the steps in order without pausing, except after ${pauseLabel}, where you must stop and wait for the user's validation before continuing to the next step.`
}

function describeOutputStyle(verbosity: 'concise' | 'explained'): string {
    return verbosity === 'explained'
        ? 'At each step, briefly explain your reasoning (2-3 sentences) before the step output. Do not restate the task or announce the skill you are using.'
        : 'At each step, respond only with the step output: no role announcements, no restated task, no meta-commentary about what you are doing.'
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
export function createWorkflowSkill(
    workflow: Workflow,
    { allowClarifyingQuestions = false, context, pauseAt, verbosity = 'concise' }: PromptOption = {}
): string {
    const { id, name, title, description, steps } = workflow

    const requiredSkills = [...new Set(steps.map(({ responsible }) => toTeamMemberSkillName(responsible.id)))]

    const contextSection = context
        ? `

## Context

Additional context and constraints to respect throughout every step:
${context}`
        : ''

    const renderedSteps = steps
        .map(({ responsible, task, targetStepIndex }, index) => {
            const buildsOn = targetStepIndex === undefined
                ? ''
                : `\n- **Builds on:** the validated output of Step #${targetStepIndex + 1}`

            return `### Step #${index + 1}: ${responsible.name} (${responsible.title})

- **Skill:** \`${toTeamMemberSkillName(responsible.id)}\`${buildsOn}
- **Task:** ${task || responsible.defaultTask}`
        })
        .join('\n\n')

    return `${createSkillFrontmatter(toWorkflowSkillName(id), description)}

# ${name} (${title})

${description}

Treat the user's request as the goal of this workflow. Achieve it by running the steps below in order, each one using the skill of its responsible team member.

## Required skills

This workflow relies on the following skills: ${requiredSkills.map((skill) => `\`${skill}\``).join(', ')}.
If one of them is not available, stop and tell the user which skill is missing instead of improvising it.

## How to run the steps

- ${describePacing(pauseAt)}
- At each step, use the named skill and follow its instructions, including its quality control, to resolve the step's task.
- Tasks may reference parameters written as \`{{parameter}}\`: resolve them as the step's skill describes, inferring them from the context and asking the user only when they cannot be inferred. Once a parameter is resolved, reuse its value at every later step that references it instead of resolving it again.
- At each step, base your work on the user's request and, when the step builds on an earlier one, on that step's validated output.
- ${describeOutputStyle(verbosity)}
${allowClarifyingQuestions ? '- At each step, if the task is genuinely ambiguous and guessing wrong would be costly, ask a clarifying question instead of proceeding.\n' : ''}- At each step, keep in mind the user's request${context ? ' and the context below' : ''}.${contextSection}

## Steps

${renderedSteps}
`
}
