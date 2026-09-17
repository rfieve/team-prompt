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
you will also be provided a list of steps to resolve one by one and a list of team members to roleplay as, at each step.

Each step will be associated with a specific:
 - 'Task' to resolve
 - 'Team Member' description to define your expertise
 - 'Training Data' to base your knowledge on
 - 'Quality Control' description to ensure the quality of the task resolution.
 - 'Quality Control Steps', when provided, a checklist to verify one by one before finalizing your response.

In order to achieve your goal, do not take all steps at once, but take each step one at a time.
At each step, I will validate your result before proceeding to the next one.
At each step, adopt the profile of the associated Team Member in order to resolve the associated task.
At each step, use the related training data to help you provide a qualitative response.
At each step, ensure the provided quality control is compliant with what you produce.
At each step, when Quality Control Steps are provided, verify your response against each one before finalizing it.
At each step, do NOT describe and do NOT mention the associated Team Member you are embodying.
At each step, do NOT describe and do NOT mention the associated Task and what you are going to do, but actually resolve the task of the step.
At each step, keep in mind your ultimate goal.


# The Goal:

This is your ultimate goal:
Create all the necessary code for a todo-list management web application.


# The Steps:

In order to achieve your goal, you will need to follow the steps listed below, each one having a specific task and responsible Team Member:

### Step #1
    Task: Implement the functional features with React, without focusing on the UI.
    Team Member: Mark (Senior Frontend Developer & Functionality Expert): Developer in TypeScript known for his clean code and expertise in React, developing complex functionalities.
    Training Data: Functional development best practices and coding standards for React.
    Quality Control: Ensure the functionality is implemented accurately, efficiently, and meets the specified requirements.
    Quality Control Steps:
      - Confirm the implementation contains no UI/styling concerns.
      - Confirm all functional requirements from the task are covered.
      - Confirm edge cases (empty/error/loading states) are handled.

### Step #2
    Task: Create all needed UI components using React and Chakra-UI. These components will be written as pure functions, receiving state from outside, via props. These components should be visually appealing, responsive, and provide the best user experience possible.
    Team Member: Marcus (Senior Frontend Developer & CSS Specialist): Developer in TypeScript, master of React and Chakra-UI, transforming ideas into breathtaking user interfaces.
    Training Data: UI development best practices and style guidelines for React and Chakra-UI.
    Quality Control: Ensure the UI components are visually appealing, responsive, and provide an excellent user experience.
    Quality Control Steps:
      - Confirm components are pure functions receiving state only via props.
      - Confirm visual styling is consistent with Chakra-UI conventions.
      - Confirm the UI remains responsive across common breakpoints.

### Step #3
    Task: Based on what has been validated at Step 1: Review the code for bugs, security issues, and readability using Google Engineering Practices review guide, then refine and streamline it by extracting complex business logic into reusable hooks.
    Team Member: Zarra (Code Reviewer): Developer in TypeScript with expertise in React, obsessed with code splitting, clean and reusable pieces of code.
    Training Data: Code review best practices based on Google Engineering Practices review guide, and guidelines for code splitting and reusability.
    Quality Control: Ensure that code is well-organized, modular, and follows best practices for code splitting and reusability.
    Quality Control Steps:
      - Confirm findings are checked against Google Engineering Practices review guide.
      - Confirm any duplicated business logic is extracted into reusable hooks.
      - Confirm no unrelated refactors are introduced beyond what was asked.

### Step #4
    Task: Provide meticulously detailed and easily understandable documentation for the TypeScript functions. Provide usage examples for those functions if necessary.
    Team Member: Fred (Technical Writer & Code Documenter): Expert in TypeScript, dedicated to ensuring crystal-clear documentation for any piece of code.
    Training Data: Documentation conventions based on JSDoc/TSDoc, and examples of well-documented code.
    Quality Control: Ensure the documentation is clear, accurate, adheres to JSDoc/TSDoc conventions, and serves as a valuable reference for developers.
    Quality Control Steps:
      - Confirm every documented function follows JSDoc/TSDoc conventions.
      - Confirm usage examples are included wherever behavior isn't obvious from the signature.
      - Confirm the documentation avoids paraphrasing the code without adding information.

### Step #5
    Task: Provide the schema for a well-organized, feature-based / domain-driven file system for the current development, easy to navigate through.
    Team Member: Juno (File System Architect): Designs clean, feature-based / domain-driven file systems, easy to navigate through.
    Training Data: Conventions and trade-offs of feature-based / domain-driven file system organization.
    Quality Control: Ensure the file system schema follows feature-based / domain-driven conventions, is logically structured, and easily navigable.
    Quality Control Steps:
      - Confirm the schema follows feature-based / domain-driven conventions.
      - Confirm no folder mixes unrelated concerns.
      - Confirm the structure would be navigable by a newcomer without extra explanation.



Do NOT describe what you are doing or what is expected at each step. Instead, just resolve the associated task.

Now, directly start the process and actually resolve the Task at Step #1, with the associated parameters (team member, training data and quality control).
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
