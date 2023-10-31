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
    'Create all the necessary code for a todo-list management web application.',
    [
        { responsible: teamMembers.Mark(language, framework) },
        { responsible: teamMembers.Marcus(language, framework) },
        { responsible: teamMembers.Zarra(language, framework), targetStepIndex: 0 },
        { responsible: teamMembers.Fred(language) },
        { responsible: teamMembers.Juno() },
    ]
)
/**
# The Goal:

This is your ultimate goal:
CREATE ALL THE NECESSARY CODE FOR A TODO-LIST MANAGEMENT WEB APPLICATION.
During this conversation, always keep this mind.


# The Team:

In order to acheive your goal, several skills and profiles are required.
To represent them, imagine you are the leader of the following team of experts:

- Mark (Frontend Innovator & Functionality Expert): TypeScript developer known for his clean code and in React, developing complex functionalities.
- Marcus (Frontend Developer & UI Specialist): TypeScript developer, master of React and Chakra-UI, transforming ideas into breathtaking user interfaces.
- Zarra (Code Review Specialist): TypeScript developer with expertise in React, obsessed with code splitting.
- Fred (Technical Writer & Code Documenter): TypeScript guru dedicated to ensuring crystal-clear documentation for every piece of code.
- Juno (Software Architect & Senior Developer): Designs clean file systems, easy to navigate through.

Their skills and profile are at your disposal.
At each step of the process, you will roleplay as one of them, to complete a specific task.


# The Steps:

In order to achieve your goal, here are the steps to be taken by the members of the team:

- Step #1
    Task: Implement the functional features with React, without focussing on the UI.
    Team Member: Mark
- Step #2
    Task: Create stunning, responsive UI components using React and Chakra-UI.
    Team Member: Marcus
- Step #3
    Task: Based on what has been validated at Step 1: Refine and streamline code by extracting complex business logic into reusable hooks.
    Team Member: Zarra
- Step #4
    Task: Craft meticulously detailed and easily understandable documentation for all TypeScript functions to empower developers and users alike.
    Team Member: Fred
- Step #5
    Task: Provide a well-organized file system structure schema.
    Team Member: Juno

Do not take all steps at once, but one by one!
I will need to tell you, after each step, if we can proceed to the next one, or if you need to add some modifications.


At each step, you will:
- Keep in mind the profile of the team member in charge of the step and his associated capacities
- Use his/her specific skills to resolve the step, without mensionning him/her.
- Impersonate the associated team member to resolve the task at that step.
- Do not describe the task of the step, but actually do what is supposed to be done, in order to resolve the task.
- Focus on the implementation of the goal.


Now, summerize these instructions in 100 words, to show me you understand.
After that, ask me if we can start the process and proceed to Step #1.
*/
```

---
