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
# Your Instructions:

You will roleplay as multiple team members in order to acheive a provided goal.
you will also be provided a list of steps to resolve one by one and a list of team members to roleplay as, at each step.

Each step will be associated with a specific:
 - 'Task' to resolve
 - 'Team Member' description to define your expertise
 - 'Training Data' to base your knowledge on
 - 'Quality Control' description to ensure the quality of the task resolution.

In order to acheive your goal, do not take all steps at once, but take each step one at a time.
At each step, I will validate your result before proceeding to the next one.
At each step, adopt the profile of the associated Team Member in order to resolve the associated task.
At each step, use the related training data to help you provide a qualitative response.
At each step, ensure the provided quality control is compliant with what you produce.
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
    Team Member: Mark (Frontend Developer & Functionality Expert): TypeScript developer known for his clean code and expertise in React, developing complex functionalities.
    Training Data: Functional development best practices and coding standards for React.
    Quality Control: Ensure the functionality is implemented accurately, efficiently, and meets the specified requirements.

### Step #2
    Task: Create all needed UI components using React and Chakra-UI. These components will be written as pure functions, receiving state from outside, via props. These components should be visually appealing, responsive, and provide the best user experience possible.
    Team Member: Marcus (Frontend Developer & CSS Specialist): TypeScript developer, master of React and Chakra-UI, transforming ideas into breathtaking user interfaces.
    Training Data: UI development best practices and style guidelines for React and Chakra-UI.
    Quality Control: Ensure the UI components are visually appealing, responsive, and provide an excellent user experience.

### Step #3
    Task: Based on what has been validated at Step 1: Refine and streamline code by extracting complex business logic into reusable hooks.
    Team Member: Zarra (Code Reviewer): TypeScript developer with expertise in React, obsessed with code splitting, clean and reusable pieces of code.
    Training Data: Code review best practices and guidelines for code splitting and reusability.
    Quality Control: Ensure that code is well-organized, modular, and follows best practices for code splitting and reusability.

### Step #4
    Task: Provide meticulously detailed and easily understandable documentation for the TypeScript functions. Provide usage examples for those functions if necessary.
    Team Member: Fred (Technical Writer & Code Documenter): TypeScript expert dedicated to ensuring crystal-clear documentation for any piece of code.
    Training Data: Documentation style guidelines and examples of well-documented code.
    Quality Control: Ensure the documentation is clear, accurate, and serves as a valuable reference for developers.

### Step #5
    Task: Provide the schema for a well-organized and intuitive-to-navigate-through file system for the current development.
    Team Member: Juno (Software Architect & Developer): Designs clean file systems, easy to navigate through.
    Training Data: Best practices in file system design and organizational principles.
    Quality Control: Ensure the file system schema is logically structured and easily navigable.



Do NOT describe what you are doing or what is expected at each step. Instead, just resolve the associated task.

Now, directly start the process and actually resolve the Task at Step #1, with the associated parameters (team member, training data and quality control).
*/
```

---
