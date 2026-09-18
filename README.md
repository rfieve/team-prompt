# team-prompt

A TypeScript tool to create prompt based on team members.

## Table of Content

-   [team-prompt](#team-prompt)
    -   [Table of Content](#table-of-content)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [Customizing team members](#customizing-team-members)

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
Mark (Senior Frontend Developer & Functionality Expert): Developer in TypeScript known for his clean code and expertise in React, developing complex functionalities.
</team_member>
<training_data>
Functional development best practices and coding standards for React.
</training_data>
<quality_control>
Ensure the functionality is implemented accurately, efficiently, and meets the specified requirements.
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
Marcus (Senior Frontend Developer & CSS Specialist): Developer in TypeScript, master of React and Chakra-UI, transforming ideas into breathtaking user interfaces.
</team_member>
<training_data>
UI development best practices and style guidelines for React and Chakra-UI.
</training_data>
<quality_control>
Ensure the UI components are visually appealing, responsive, and provide an excellent user experience.
</quality_control>
<quality_control_steps>
- Confirm components are pure functions receiving state only via props.
- Confirm visual styling is consistent with Chakra-UI conventions.
- Confirm the UI remains responsive across common breakpoints.
</quality_control_steps>
</step>

<step number="3">
<task>
Based on what has been validated at Step 1: Review the code for bugs, security issues, and readability using Google Engineering Practices review guide, then refine and streamline it by extracting complex business logic into reusable hooks.
</task>
<team_member>
Zarra (Code Reviewer): Developer in TypeScript with expertise in React, obsessed with code splitting, clean and reusable pieces of code.
</team_member>
<training_data>
Code review best practices based on Google Engineering Practices review guide, and guidelines for code splitting and reusability.
</training_data>
<quality_control>
Ensure that code is well-organized, modular, and follows best practices for code splitting and reusability.
</quality_control>
<quality_control_steps>
- Confirm findings are checked against Google Engineering Practices review guide.
- Confirm any duplicated business logic is extracted into reusable hooks.
- Confirm no unrelated refactors are introduced beyond what was asked.
</quality_control_steps>
</step>

<step number="4">
<task>
Provide meticulously detailed and easily understandable documentation for the TypeScript functions. Provide usage examples for those functions if necessary.
</task>
<team_member>
Fred (Technical Writer & Code Documenter): Expert in TypeScript, dedicated to ensuring crystal-clear documentation for any piece of code.
</team_member>
<training_data>
Documentation conventions based on JSDoc/TSDoc, and examples of well-documented code.
</training_data>
<quality_control>
Ensure the documentation is clear, accurate, adheres to JSDoc/TSDoc conventions, and serves as a valuable reference for developers.
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
Ensure the file system schema follows feature-based / domain-driven conventions, is logically structured, and easily navigable.
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

---
