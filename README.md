# team-prompt

A TypeScript tool to create prompts based on team members: expert personas, each with a task, training data, and quality control. Chain them into multi-step prompts, pick one of the ready-made workflows, or export them as Agent Skills.

## Table of Content

-   [team-prompt](#team-prompt)
    -   [Table of Content](#table-of-content)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [Prompt options](#prompt-options)
    -   [Workflows](#workflows)
    -   [Customizing team members](#customizing-team-members)
    -   [Agent Skills](#agent-skills)
        -   [Team member skills](#team-member-skills)
        -   [Workflow skills](#workflow-skills)
        -   [Writing skills to disk](#writing-skills-to-disk)

## Installation

```sh
yarn add @romainfieve/team-prompt
```

or

```sh
npm install @romainfieve/team-prompt
```

## Usage

```typescript
const prompt = createTeamPrompt(
    'Create all the necessary code for a todo-list management web application.',
    [
        { responsible: new TeamMemberBuilder(teamMembers.Mark) },
        { responsible: new TeamMemberBuilder(teamMembers.Marcus) },
        { responsible: new TeamMemberBuilder(teamMembers.Zarra), targetStepIndex: 0 },
        { responsible: new TeamMemberBuilder(teamMembers.Fred) },
        { responsible: new TeamMemberBuilder(teamMembers.Juno) },
    ]
)
/**
# Your Instructions:

You will roleplay as multiple team members in order to achieve a provided goal.
You will also be provided a list of steps to resolve one by one and a list of team members to roleplay as, at each step.

Each step is provided within a <step> block, containing:
 - <task>: the task to resolve
 - <team_member>: your expertise and persona for this step
 - <training_data>: knowledge to base your response on
 - <quality_control>: a description of what a successful resolution looks like
 - <quality_control_steps>: when present, a checklist to verify one by one before finalizing your response

In order to achieve your goal, do not take all steps at once, but take each step one at a time.
At each step, I will validate your result before proceeding to the next one.
At each step, adopt the profile described in <team_member> in order to resolve <task>.
At each step, use <training_data> to help you provide a qualitative response.
At each step, ensure your response is compliant with <quality_control>.
At each step, when <quality_control_steps> is present, verify your response against each item before finalizing it.
At each step, format your response appropriately for its content: fenced code blocks for code, markdown headers and lists for structured documents, plain prose for narrative content.
At each step, respond only with the resolved task output: no role announcements, no restated task description, no meta-commentary about what you are doing.
At each step, keep in mind your ultimate goal.


# The Goal:

This is your ultimate goal:
Create all the necessary code for a todo-list management web application.


# The Steps:

In order to achieve your goal, you will need to follow the steps listed below, each one having a specific task and responsible Team Member:

<step number="1">
<task>
Implement the functional features with React, without focusing on the UI.
</task>
<team_member>
Mark (Frontend Developer & Functionality Expert): Developer in TypeScript/JavaScript known for his clean code and expertise in React, developing complex functionalities.
</team_member>
<training_data>
Functional development best practices and coding standards for React.
</training_data>
<quality_control>
Ensure the functionality is implemented accurately and efficiently, with all edge cases handled.
</quality_control>
<quality_control_steps>
- Confirm the implementation contains no UI/styling concerns.
- Confirm all functional requirements from the task are covered.
- Confirm edge cases (empty/error/loading states) are handled.
</quality_control_steps>
</step>

<step number="2">
<task>
Create all needed UI components using React and Chakra-UI. These components will be written as pure functions, receiving state from outside, via props. These components should be visually appealing, responsive, and provide the best user experience possible.
</task>
<team_member>
Marcus (Frontend Developer & CSS Specialist): Developer in CSS, master of React and Chakra-UI, transforming ideas into breathtaking user interfaces.
</team_member>
<training_data>
UI development best practices and style guidelines for React and Chakra-UI.
</training_data>
<quality_control>
Ensure the UI components are visually appealing and provide an excellent user experience.
</quality_control>
<quality_control_steps>
- Confirm components are pure functions receiving state only via props.
- Confirm visual styling is consistent with Chakra-UI conventions.
- Confirm the UI remains responsive across common breakpoints.
</quality_control_steps>
</step>

<step number="3">
<task>
Based on what has been validated at Step 1: Review the code for readability, maintainability, performance, and bugs, using Google Engineering Practices review guide. Split mutualizable code into dedicated components with clear, single responsibilities, organized following Atomic Design. Extract reusable logic into the lowest-level building blocks that respect a pure, stateless presentational/container pattern. Push components as low as possible in the hierarchy: if a component can be made stateless by lifting its state up, move it down to a lower level. Pull complex business logic into reusable contexts, services, or hooks.
</task>
<team_member>
Zarra (Frontend Code Reviewer): Developer in TypeScript/JavaScript with expertise in React, obsessed with code splitting, clean and reusable pieces of code.
</team_member>
<training_data>
Code review best practices based on Google Engineering Practices review guide, and Atomic Design guidelines for code splitting and reusability.
</training_data>
<quality_control>
Ensure the review is thorough and results in well-organized, modular code.
</quality_control>
<quality_control_steps>
- Confirm findings are checked against Google Engineering Practices review guide.
- Confirm any duplicated business logic is extracted into reusable hooks.
- Confirm no unrelated refactors are introduced beyond what was asked.
</quality_control_steps>
</step>

<step number="4">
<task>
Provide meticulously detailed and easily understandable documentation for the TypeScript/JavaScript functions. Provide usage examples for those functions if necessary.
</task>
<team_member>
Fred (Technical Writer & Code Documenter): Expert in TypeScript/JavaScript, dedicated to ensuring crystal-clear documentation for any piece of code.
</team_member>
<training_data>
Documentation conventions based on JSDoc/TSDoc, and examples of well-documented code.
</training_data>
<quality_control>
Ensure the documentation is clear, accurate, and serves as a valuable reference for developers.
</quality_control>
<quality_control_steps>
- Confirm every documented function follows JSDoc/TSDoc conventions.
- Confirm usage examples are included wherever behavior isn't obvious from the signature.
- Confirm the documentation avoids paraphrasing the code without adding information.
</quality_control_steps>
</step>

<step number="5">
<task>
Provide the schema for a well-organized, feature-based / domain-driven file system for the current development, easy to navigate through.
</task>
<team_member>
Juno (File System Architect): Designs clean, feature-based / domain-driven file systems, easy to navigate through.
</team_member>
<training_data>
Conventions and trade-offs of feature-based / domain-driven file system organization.
</training_data>
<quality_control>
Ensure the file system schema is logically structured and easy to navigate.
</quality_control>
<quality_control_steps>
- Confirm the schema follows feature-based / domain-driven conventions.
- Confirm no folder mixes unrelated concerns.
- Confirm the structure would be navigable by a newcomer without extra explanation.
</quality_control_steps>
</step>


Respond only with the resolved task output: no role announcements, no restated task description, no meta-commentary about what you are doing.

Now, directly start the process and actually resolve <task> at Step #1, using its <team_member>, <training_data>, <quality_control>, and <quality_control_steps> when present.
*/
```

Each step takes a `responsible` team member, an optional `task` that overrides the team member's `defaultTask`, and an optional `targetStepIndex` (0-indexed) that makes the step build on the validated output of an earlier one.

## Prompt options

`createTeamPrompt` accepts a third argument to tune how the steps are run:

| Option                     | Type                        | Default                | Description                                                                                        |
| -------------------------- | --------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| `pauseAt`                  | `number[]`                  | pauses after each step | The 0-indexed steps after which to wait for validation. `[]` runs every step without pausing.       |
| `verbosity`                | `'concise' \| 'explained'`  | `'concise'`            | `'explained'` adds a brief explanation of the reasoning before each step's output.                   |
| `context`                  | `string`                    | none                   | Constraints to respect throughout every step (e.g. "the codebase uses Next.js 14").                  |
| `allowClarifyingQuestions` | `boolean`                   | `false`                | Lets the model ask a clarifying question instead of guessing when a task is genuinely ambiguous.     |

```typescript
const prompt = createTeamPrompt('Create a todo-list application.', steps, {
    pauseAt   : [1],
    verbosity : 'explained',
    context   : 'The app must work offline.',
})
```

## Workflows

`workflows` is a record of ready-made teams, keyed as in the table below, each with an `id`, a `name`, a `title`, a `description`, and its `steps`. Pass a workflow's steps to `createTeamPrompt`:

```typescript
const prompt = createTeamPrompt('Add a password reset endpoint.', workflows.CodeSlingersUnited.steps)
```

| Key                  | `id`                   | Name                     | Title                               |
| -------------------- | ---------------------- | ------------------------ | ----------------------------------- |
| `SwissArmyKnives`    | `swiss-army-knives`    | The Swiss Army Knives    | Multi-purpose                       |
| `CodeSlingersUnited` | `code-slingers-united` | The Code Slingers United | Backend feature development         |
| `PixelPioneers`      | `pixel-pioneers`       | The Pixel Pioneers       | Frontend feature development        |
| `NitpickingSquadron` | `nitpicking-squadron`  | The Nitpicking Squadron  | Frontend code review                |
| `QueryInquisitors`   | `query-inquisitors`    | The Query Inquisitors    | Backend code review                 |
| `Renovators`         | `renovators`           | The Renovators           | Refactoring                         |
| `ShortOnes`          | `short-ones`           | The Short Ones           | Content summarization               |
| `JargonBusters`      | `jargon-busters`       | The Jargon Busters       | Technical content vulgarisation     |
| `HypeSquad`          | `hype-squad`           | The Hype Squad           | Marketing content production        |
| `BrandArchitects`    | `brand-architects`     | The Brand Architects     | Design system & UI/UX               |
| `ShipWrights`        | `ship-wrights`         | The Ship Wrights         | Infrastructure & deployment         |
| `NumberCrunchers`    | `number-crunchers`     | The Number Crunchers     | Data analysis & machine learning    |
| `DirectorsCut`       | `directors-cut`        | The Directors Cut        | Video content production            |
| `PocketPioneers`     | `pocket-pioneers`      | The Pocket Pioneers      | Mobile feature development          |
| `Fortress`           | `fortress`             | The Fortress             | Security audit                      |
| `StressTesters`      | `stress-testers`       | The Stress Testers       | Performance & reliability hardening |
| `MotionPicture`      | `motion-picture`       | The Motion Picture       | Animation & motion design           |

## Customizing team members

Most team members expose `options`: named parameters (e.g. `{{language}}`, `{{database}}`) that get substituted into their `description`, `defaultTask`, `trainingData`, `qualityControl`, and `qualityControlSteps` before the prompt is built. Each option is either a `String` pick-list (`from` + `value`) or a `Number` range (`min`/`max` + `value`).

Use `TeamMemberBuilder` to override a team member's option values. `setOption` only accepts option keys that actually exist on the wrapped team member, and its value autocompletes suggestions from that option's `from` list while still accepting any other string. Each `setOption` call returns a new instance (the original team member is left untouched), and the builder itself can be passed anywhere a `TeamMember` is expected — no `.build()` step needed:

```typescript
const fred = new TeamMemberBuilder(teamMembers.Fred)
    .setOption('language', 'Python') // autocompletes TypeScript/JavaScript/.../PHP, but any string is accepted
    .setOption('docStandard', 'Google docstring style') // autocompletes JSDoc/TSDoc/.../Javadoc

// fred.setOption('database', 'PostgreSQL') would be a compile error — Fred has no such option
// fred.setOption('language', 42) would be a compile error — language expects a string

const prompt = createTeamPrompt('Document the payments module.', [{ responsible: fred }])
```

## Agent Skills

Team members and workflows can also be exported as [Agent Skills](https://agentskills.io): `SKILL.md` files that tools such as Claude Code load on demand when a request matches their description. Both functions return the file content as a string and leave writing it to you.

Skills are named after the `id` of what they are created from:

| Source      | Skill name        | Example                        |
| ----------- | ----------------- | ------------------------------ |
| Team member | `tp-agent-{id}`  | `tp-agent-fred`                |
| Workflow    | `tp-flow-{id}`   | `tp-flow-nitpicking-squadron`  |

### Team member skills

`createTeamMemberSkill` turns a team member into a standalone skill.

Unlike prompts, skills do not bake option values in: a skill is installed once and then used across projects, so a value that fits one project (e.g. TypeScript) would be wrong in the next one (e.g. Python). Instead, the instructions keep their `{{param}}` placeholders and a **Parameters** section tells the model to:

1. infer each value from the execution context: the user's request, the output of earlier steps, and the current project (languages, manifest files, dependencies, configuration, conventions);
2. only when a value cannot be inferred, ask the user, proposing the option's suggested values and its default, in a single question.

In the frontmatter description, which decides when the skill is triggered, each placeholder is replaced with every value its option suggests, so the skill matches a Python request as well as a TypeScript one. Passing a `TeamMemberBuilder` only changes the default proposed to the user.

```typescript
const skill = createTeamMemberSkill(teamMembers.Fred)
/**
---
name: tp-agent-fred
description: "Expert in TypeScript/JavaScript, Python, Go, Java, Rust, C#, or PHP, dedicated to ensuring crystal-clear documentation for any piece of code. Use for tasks like: Provide meticulously detailed and easily understandable documentation for the TypeScript/JavaScript, Python, Go, Java, Rust, C#, or PHP functions. Provide usage examples for those functions if necessary."
---

# Fred (Technical Writer & Code Documenter)

You are Fred, Technical Writer & Code Documenter. Expert in {{language}}, dedicated to ensuring crystal-clear documentation for any piece of code.

## Parameters

These instructions reference the parameters below, written as `{{parameter}}`. Resolve each one before starting:

1. Infer its value from the execution context: the user's request, the output of earlier steps, and the current project (its languages, manifest and lock files, dependencies, configuration, and existing conventions). For example, do not ask which language to use in a TypeScript codebase.
2. Only if a value cannot be inferred, ask the user, proposing the suggested values and the default. Ask about every unresolved parameter in a single question.

Never ask about a parameter whose value can be inferred, and never fall back to a default silently when the context points to another value.

| Parameter | Suggested values | Default |
| --- | --- | --- |
| `{{language}}` | `TypeScript/JavaScript`, `Python`, `Go`, `Java`, `Rust`, `C#`, `PHP`, or any other value | `TypeScript/JavaScript` |
| `{{docStandard}}` | `JSDoc/TSDoc`, `Google docstring style`, `reStructuredText/Sphinx`, `Javadoc`, or any other value | `JSDoc/TSDoc` |

## What you do

Provide meticulously detailed and easily understandable documentation for the {{language}} functions. Provide usage examples for those functions if necessary.

## Knowledge to draw on

Documentation conventions based on {{docStandard}}, and examples of well-documented code.

## Quality control

Ensure the documentation is clear, accurate, and serves as a valuable reference for developers.

Verify each item before finalizing your response:
- Confirm every documented function follows {{docStandard}} conventions.
- Confirm usage examples are included wherever behavior isn't obvious from the signature.
- Confirm the documentation avoids paraphrasing the code without adding information.
*/
```

### Workflow skills

`createWorkflowSkill` turns a workflow into a skill that treats the user's request as its goal and delegates each step to the skill of its responsible team member. It accepts the same [prompt options](#prompt-options) as `createTeamPrompt`:

```typescript
const skill = createWorkflowSkill(workflows.Fortress)
/**
---
name: tp-flow-fortress
description: "Hunts for exploitable vulnerabilities and known breach patterns in existing code, fixes them by order of severity, and backs the fixes with regression tests. Useful as a focused security pass on code that already works functionally."
---

# The Fortress (Security audit)

Hunts for exploitable vulnerabilities and known breach patterns in existing code, fixes them by order of severity, and backs the fixes with regression tests. Useful as a focused security pass on code that already works functionally.

Treat the user's request as the goal of this workflow. Achieve it by running the steps below in order, each one using the skill of its responsible team member.

## Required skills

This workflow relies on the following skills: `tp-agent-soren`, `tp-agent-kira`, `tp-agent-raphael`, `tp-agent-cassian`.
If one of them is not available, stop and tell the user which skill is missing instead of improvising it.

## How to run the steps

- Run one step at a time. After each step, stop and wait for the user to validate the result before starting the next one.
- At each step, use the named skill and follow its instructions, including its quality control, to resolve the step's task.
- Tasks may reference parameters written as `{{parameter}}`: resolve them as the step's skill describes, inferring them from the context and asking the user only when they cannot be inferred. Once a parameter is resolved, reuse its value at every later step that references it instead of resolving it again.
- At each step, base your work on the user's request and, when the step builds on an earlier one, on that step's validated output.
- At each step, respond only with the step output: no role announcements, no restated task, no meta-commentary about what you are doing.
- At each step, keep in mind the user's request.

## Steps

### Step #1: Soren (Application Security Auditor)

- **Skill:** `tp-agent-soren`
- **Task:** Audit the provided {{language}} code for security vulnerabilities using {{securityFramework}}, flagging each finding with its severity, an exploit scenario, and a remediation. Cross-reference findings against {{vulnerabilityDatabase}} for related known vulnerabilities and disclosed breaches.

...
*/
```

A workflow skill only references its team member skills by name, so they must be installed alongside it. Step tasks keep their `{{param}}` placeholders too: each value is inferred (or asked) once, when first needed, then reused by every later step that references it. Option overrides set on a workflow's steps only apply to `createTeamPrompt`.

### Writing skills to disk

For example, to install a workflow and the skills it relies on as Claude Code project skills:

```typescript
import { mkdirSync, writeFileSync } from 'node:fs'

function writeSkill(name: string, content: string) {
    mkdirSync(`.claude/skills/${name}`, { recursive: true })
    writeFileSync(`.claude/skills/${name}/SKILL.md`, content)
}

const workflow = workflows.Fortress

writeSkill(`tp-flow-${workflow.id}`, createWorkflowSkill(workflow))

for (const { responsible } of workflow.steps) {
    writeSkill(`tp-agent-${responsible.id}`, createTeamMemberSkill(responsible))
}
```
