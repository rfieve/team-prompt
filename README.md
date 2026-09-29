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
    -   [Potential replacements](#potential-replacements)
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
# Your Instructions

You will achieve the goal described in <goal> by resolving a sequence of steps. Each step is assigned to a team member: a specialist whose perspective and expertise you take on to resolve that step.

Each step is provided within a <step> block, containing:
 - <task>: the task to resolve
 - <team_member>: the specialist whose perspective and expertise you take on for this step
 - <expertise>: the standards and practices to apply
 - <quality_control>: a description of what a successful resolution looks like
 - <quality_control_steps>: when present, a checklist to verify item by item before finalizing your result
 - <potential_replacements>: when present, team members to take on instead of <team_member> if their condition matches the context

## How to pace the steps

Resolve one step at a time, then stop and wait for my validation before starting the next one: this lets me correct course before later steps build on the result.

## How to resolve each step

- Take the perspective of the team member described in <team_member>: their title and description define the expertise to bring, not a character to perform.
- Apply the standards and practices listed in <expertise>.
- Make sure your result meets <quality_control>.
- When <quality_control_steps> is present, check your result against each item before finalizing it. If an item fails, fix your result rather than only reporting the failure.
- When <potential_replacements> is present and one of its conditions matches the context, take that team member's perspective instead and resolve their own task rather than <task>, based on the same earlier steps. State in one line which team member you switched to and which condition matched, so I understand why the task changed.
- Keep in mind the goal in <goal>: every step contributes to it.

## How to deliver each step

Each <step> has a `mode` attribute that sets how you deliver its result.

### Steps in `localExecution` mode: you act directly on my codebase or systems

- Before changing anything, read the relevant code and follow its existing conventions: the result has to fit into the codebase, not just work in isolation.
- Apply your work directly to the files or systems concerned, instead of pasting it into your response.
- Verify the <quality_control_steps> items with real checks whenever one applies (running the tests, type checker, linter, or build) rather than by rereading your work, and report what you ran and its outcome, failures included.
- Stay within the step's task: changes beyond it are harder for me to review. If you are blocked, stop and explain what blocks you instead of working around it.
- End the step with a short summary: the files changed, the checks run, and anything I should look at closely.

## How to format your responses

- Keep each step's output to its result: no role announcements, no restated task, no commentary on what you are about to do.
- When you had to assume something the task did not specify, or a question remains open, end the step with a single line listing them, so I can correct them early.


# The Goal

<goal>
Create all the necessary code for a todo-list management web application.
</goal>


# The Steps

<step number="1" mode="localExecution">
<task>
Implement the functional features with React, without focusing on the UI.
</task>
<team_member>
Mark, Frontend Developer & Functionality Expert: Developer in TypeScript/JavaScript known for his clean code and expertise in React, developing complex functionalities.
</team_member>
<expertise>
Functional development best practices and coding standards for React.
</expertise>
<quality_control>
Ensure the functionality is implemented accurately and efficiently, with all edge cases handled.
</quality_control>
<quality_control_steps>
- Confirm the implementation contains no UI/styling concerns.
- Confirm all functional requirements from the task are covered.
- Confirm edge cases (empty/error/loading states) are handled.
</quality_control_steps>
</step>

<step number="2" mode="localExecution">
<task>
Create all needed UI components using React and Chakra-UI. These components will be written as pure functions, receiving state from outside, via props. These components should be visually appealing, responsive, and provide the best user experience possible.
</task>
<team_member>
Marcus, Frontend Developer & CSS Specialist: Developer in CSS, master of React and Chakra-UI, transforming ideas into breathtaking user interfaces.
</team_member>
<expertise>
UI development best practices and style guidelines for React and Chakra-UI.
</expertise>
<quality_control>
Ensure the UI components are visually appealing and provide an excellent user experience.
</quality_control>
<quality_control_steps>
- Confirm components are pure functions receiving state only via props.
- Confirm visual styling is consistent with Chakra-UI conventions.
- Confirm the UI remains responsive across common breakpoints.
</quality_control_steps>
</step>

<step number="3" mode="localExecution">
<task>
Based on what has been validated at Step #1: Review the code for readability, maintainability, performance, and bugs, using Google Engineering Practices review guide. Split mutualizable code into dedicated components with clear, single responsibilities, organized following Atomic Design. Extract reusable logic into the lowest-level building blocks that respect a pure, stateless presentational/container pattern. Push components as low as possible in the hierarchy: if a component can be made stateless by lifting its state up, move it down to a lower level. Pull complex business logic into reusable contexts, services, or hooks.
</task>
<team_member>
Zarra, Frontend Code Reviewer: Developer in TypeScript/JavaScript with expertise in React, obsessed with code splitting, clean and reusable pieces of code.
</team_member>
<expertise>
Code review best practices based on Google Engineering Practices review guide, and Atomic Design guidelines for code splitting and reusability.
</expertise>
<quality_control>
Ensure the review is thorough and results in well-organized, modular code.
</quality_control>
<quality_control_steps>
- Confirm findings are checked against Google Engineering Practices review guide.
- Confirm any duplicated business logic is extracted into reusable hooks.
- Confirm no unrelated refactors are introduced beyond what was asked.
</quality_control_steps>
<potential_replacements>
- If the code under review is backend code (APIs, services, data access): Bastian (Backend Code Reviewer): Developer in TypeScript/Node.js with expertise in PostgreSQL, obsessed with clean layering and defensive, efficient backend code. Their task: Review the code for readability, maintainability, performance, and bugs, using Google Engineering Practices review guide. Ensure a clear separation between controller/route, service, and data-access layers, moving misplaced logic to its proper layer. Confirm database interactions are parameterized, injection-safe, and free of N+1 query patterns. Confirm error handling and input validation are consistent and occur at the appropriate boundary.
</potential_replacements>
</step>

<step number="4" mode="localExecution">
<task>
Provide meticulously detailed and easily understandable documentation for the TypeScript/JavaScript functions. Provide usage examples for those functions if necessary.
</task>
<team_member>
Fred, Technical Writer & Code Documenter: Expert in TypeScript/JavaScript, dedicated to ensuring crystal-clear documentation for any piece of code.
</team_member>
<expertise>
Documentation conventions based on JSDoc/TSDoc, and examples of well-documented code.
</expertise>
<quality_control>
Ensure the documentation is clear, accurate, and serves as a valuable reference for developers.
</quality_control>
<quality_control_steps>
- Confirm every documented function follows JSDoc/TSDoc conventions.
- Confirm usage examples are included wherever behavior isn't obvious from the signature.
- Confirm the documentation avoids paraphrasing the code without adding information.
</quality_control_steps>
</step>

<step number="5" mode="localExecution">
<task>
Provide the schema for a well-organized, feature-based / domain-driven file system for the current development, easy to navigate through.
</task>
<team_member>
Juno, File System Architect: Designs clean, feature-based / domain-driven file systems, easy to navigate through.
</team_member>
<expertise>
Conventions and trade-offs of feature-based / domain-driven file system organization.
</expertise>
<quality_control>
Ensure the file system schema is logically structured and easy to navigate.
</quality_control>
<quality_control_steps>
- Confirm the schema follows feature-based / domain-driven conventions.
- Confirm no folder mixes unrelated concerns.
- Confirm the structure would be navigable by a newcomer without extra explanation.
</quality_control_steps>
</step>


Now start with Step #1, and stop once it is resolved.
*/
```

Each step takes a `responsible` team member, an optional `task` that overrides the team member's `defaultTask`, and an optional `targetStepIndex` (0-indexed) that makes the step build on the output of an earlier one.

## Prompt options

`createTeamPrompt` accepts a third argument to tune how the steps are run:

| Option                     | Type                        | Default                | Description                                                                                        |
| -------------------------- | --------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| `pauseAt`                  | `number[]`                  | pauses after each step | The 0-indexed steps after which to wait for validation. `[]` runs every step without pausing.       |
| `runningMode`              | `'localExecution' \| 'conversational'` | each team member's default | How each step delivers its result: `'localExecution'` acts on the codebase (for agents such as Claude Code), `'conversational'` answers in the chat. Team members that do not support the mode keep their default. |
| `verbosity`                | `'concise' \| 'explained'`  | `'concise'`            | `'explained'` adds a brief explanation of the reasoning before each step's output.                   |
| `context`                  | `string`                    | none                   | Constraints to respect throughout every step (e.g. "the codebase uses Next.js 14").                  |
| `allowClarifyingQuestions` | `boolean`                   | `false`                | Lets the model ask a clarifying question instead of guessing when a task is genuinely ambiguous.     |

```typescript
const prompt = createTeamPrompt('Create a todo-list application.', steps, {
    pauseAt     : [1],
    runningMode : 'conversational',
    verbosity   : 'explained',
    context     : 'The app must work offline.',
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
| `BugHunters`         | `bug-hunters`          | The Bug Hunters          | Bug fixing                          |
| `FullStackers`       | `full-stackers`        | The Full Stackers        | Full-stack feature development      |
| `Upgraders`          | `upgraders`            | The Upgraders            | Dependency & framework upgrade      |
| `ComplianceOffice`   | `compliance-office`    | The Compliance Office    | Privacy & compliance                |
| `Showrunners`        | `showrunners`          | The Showrunners          | Immersive landing page              |
| `Inclusionists`      | `inclusionists`        | The Inclusionists        | Accessibility audit                 |
| `Heralds`            | `heralds`              | The Heralds              | Release notes & announcement        |
| `Cartographers`      | `cartographers`        | The Cartographers        | Codebase documentation              |

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

## Potential replacements

Some team members fill the same slot as another one, but for a different kind of work: a relational database administrator versus a NoSQL one, web versus mobile end-to-end testing. `potentialReplacements` lists, by `id`, the team members to use instead, and `when` they fit better:

```typescript
export const Ernest = {
    // ...
    potentialReplacements : [
        {
            id   : 'nadia',
            when : 'the project uses a NoSQL database (document, key-value, or wide-column store)',
        },
    ],
} satisfies TeamMember
```

The model picks the replacement when its condition matches the context. A chosen replacement resolves its own `defaultTask`, not the step's `task`, based on the same validated steps. Replacements show up in:

-   **prompts**: a `<potential_replacements>` block in the step, with each replacement's profile and task. Replacement ids must belong to built-in team members, otherwise `createTeamPrompt` throws.
-   **team member skills**: a section pointing to the replacement skills, to use instead when their condition matches.
-   **workflow skills**: a "Replace with" line on the step, and the replacement skills listed as optional.

Built-in replacements:

| Team member              | Replacement              | When                                               |
| ------------------------ | ------------------------ | -------------------------------------------------- |
| Ernest (relational DB)   | Nadia (NoSQL DB)         | the project uses a NoSQL database                  |
| Nadia (NoSQL DB)         | Ernest (relational DB)   | the project uses a relational SQL database         |
| Quinn (web E2E tests)    | Dex (mobile E2E tests)   | the app under test is a native or React Native app |
| Dex (mobile E2E tests)   | Quinn (web E2E tests)    | the app under test is a web application            |
| Felix (bug fix)          | Kira (security fix)      | the bug is a security vulnerability                |
| Felix (bug fix)          | Tessa (performance fix)  | the bug is a performance problem                   |
| Zarra (frontend review)  | Bastian (backend review) | the code under review is backend code              |
| Bastian (backend review) | Zarra (frontend review)  | the code under review is frontend code             |

## Agent Skills

Team members and workflows can also be exported as [Agent Skills](https://agentskills.io): `SKILL.md` files that tools such as Claude Code load on demand when a request matches their description. Both functions return the file content as a string and leave writing it to you.

Skills are named after the `id` of what they are created from:

| Source      | Skill name        | Example                        |
| ----------- | ----------------- | ------------------------------ |
| Team member | `tp-team-member-{id}`  | `tp-team-member-fred`                |
| Workflow    | `tp-workflow-{id}`   | `tp-workflow-nitpicking-squadron`  |

### Team member skills

`createTeamMemberSkill` turns a team member into a standalone skill.

Unlike prompts, skills do not bake option values in: a skill is installed once and then used across projects, so a value that fits one project (e.g. TypeScript) would be wrong in the next one (e.g. Python). Instead, the instructions keep their `{{param}}` placeholders and a **Parameters** section tells the model to:

1. infer each value from the execution context: the user's request, the output of earlier steps, and the current project (languages, manifest files, dependencies, configuration, conventions);
2. only when a value cannot be inferred, ask the user, proposing the option's suggested values and its default, in a single question.

The frontmatter description, which decides when the skill is triggered, is built from the team member's description, the first sentence of its task, and a pointer to each potential replacement (e.g. "If the bug is a security vulnerability, use tp-team-member-kira instead."), so the right skill is picked before any is loaded. Each placeholder there is replaced with every value its option allows (a list of choices, or a range for numbers), so the skill matches a Python request as well as a TypeScript one. If the result would exceed the 1024-character limit, the task sentence is left out rather than the pointers. Passing a `TeamMemberBuilder` only changes the default proposed to the user.

The body also tells the model:

-   **What you deliver**: the shape of the result, from the team member's optional `deliverable`.
-   **Where you work**: from its `runningModes`, whether to work directly in the user's project (reading its conventions, applying changes, and running its checks) or to answer in the chat, and when to switch to the other mode.

```typescript
const skill = createTeamMemberSkill(teamMembers.Fred)
/**
---
name: tp-team-member-fred
description: "Expert in TypeScript/JavaScript, Python, Go, Java, Rust, C#, or PHP, dedicated to ensuring crystal-clear documentation for any piece of code. Typical task: Provide meticulously detailed and easily understandable documentation for the TypeScript/JavaScript, Python, Go, Java, Rust, C#, or PHP functions."
---

# Fred (Technical Writer & Code Documenter)

Expert in {{language}}, dedicated to ensuring crystal-clear documentation for any piece of code.

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

## What you deliver

The documentation, written in the code itself as {{docStandard}} comments, with usage examples where the behavior is not obvious.

## Where you work

Work directly in the user's project. Read the relevant files and follow their existing conventions, make the changes the task calls for, and verify them with the project's own checks (tests, type checker, linter, or build) when they apply. End with a short summary of the files changed and the checks run, failures included.

If there is no project to work on, or the user only asks for advice or an explanation, answer in the chat instead. Give a complete, self-contained deliverable: never elide parts with placeholders such as "// rest unchanged". Use fenced code blocks for code, markdown headers and lists for structured documents, and plain prose for narrative content.

## Knowledge to draw on

Documentation conventions based on {{docStandard}}, and examples of well-documented code.

## Quality control

Ensure the documentation is clear, accurate, and serves as a valuable reference for developers.

Verify each item before finalizing your response. If an item fails, fix your result rather than only reporting the failure:
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
name: tp-workflow-fortress
description: "Hunts for exploitable vulnerabilities and known breach patterns in existing code, fixes them by order of severity, and backs the fixes with regression tests. Useful as a focused security pass on code that already works functionally."
---

# The Fortress (Security audit)

Hunts for exploitable vulnerabilities and known breach patterns in existing code, fixes them by order of severity, and backs the fixes with regression tests. Useful as a focused security pass on code that already works functionally.

Treat the user's request as the goal of this workflow. Achieve it by running the steps below in order, each one using the skill of its responsible team member.

## Required skills

This workflow relies on the following skills: `tp-team-member-soren`, `tp-team-member-kira`, `tp-team-member-raphael`, `tp-team-member-cassian`.
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

- **Skill:** `tp-team-member-soren`
- **Task:** Audit the provided {{language}} code for security vulnerabilities using {{securityFramework}}, flagging each finding with its severity, an exploit scenario, and a remediation. Cross-reference findings against {{vulnerabilityDatabase}} for related known vulnerabilities and disclosed breaches.

...
*/
```

A workflow skill only references its team member skills by name, so they must be installed alongside it. Step tasks keep their `{{param}}` placeholders too: each value is inferred (or asked) once, when first needed, then reused by every later step that references it. Option overrides set on a workflow's steps only apply to `createTeamPrompt`.

### Writing skills to disk

`createWorkflowSkillFiles` renders a workflow skill along with every skill it relies on: the skill of each step's team member and of each built-in potential replacement, without duplicates. `createTeamMemberSkillFile` does the same for a single team member. Each file comes with its path relative to the skills directory, `{skill name}/SKILL.md`.

For example, to install a workflow and the skills it relies on as Claude Code project skills:

```typescript
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

for (const { path, content } of createWorkflowSkillFiles(workflows.Fortress)) {
    const filePath = join('.claude/skills', path)

    mkdirSync(dirname(filePath), { recursive: true })
    writeFileSync(filePath, content)
}
```
