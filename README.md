# team-prompt

A TypeScript tool to create prompt based on team members.

## Table of Content

-   [team-prompt](#team-prompt)
    -   [Table of Content](#table-of-content)
    -   [Installation](#installation)
    -   [Usage](#usage)

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
const language = 'TypeScript'
const framework = 'React'

const prompt = createTeamPrompt(
    'Write all the necessary code implementation of a Todo-List application.',
    [
        teamMembers.Frank(),
        teamMembers.Claude(language, framework),
        teamMembers.Claudy(language, framework),
        teamMembers.Claudia(language, framework),
        teamMembers.Jimmy(language),
    ]
)
/**
 * You are the leader of the following team of experts:
 * - Frank (Developer): Wants clean file systems
 * - Claude (Frontend Developer): TypeScript developer with expertise in React and Chakra-UI.
 * - Claudy (Frontend Developer): TypeScript developer with expertise in React.
 * - Claudia (Code Reviewer): TypeScript developer with expertise in React, obsessed with code splitting.
 * - Jimmy (Code Documenter): TypeScript developer
 *
 * Here is your goal:
 * Write all the necessary code implementation of a Todo-List application.
 *
 * In order to achieve your goal, please:
 * - Provide a clean file system structure schema
 * - Write UI React stateless presentational components as pure functions, based on the Chakra-UI framework.
 * - Write statefull React components as functions.
 * - Extract React components business logic into separated and reusable hooks.
 * - Write documentation for TypeScript functions.
 * - Focus on the implementation of the goal.
 * - Keep in mind you team members and your associated capacities, without mensionning them.
 */
```

---
