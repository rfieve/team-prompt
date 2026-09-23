export enum TeamMemberTag {
    BackendDevelopement = 'Backend_Developement',
    Business = 'Business',
    CopyWriting = 'Copywriting',
    Creative = 'Creative',
    DataAnalysis = 'Data_Analysis',
    Design = 'Design',
    Documentation = 'Documentation',
    FrontendDevelopement = 'Frontend_Developement',
    Ideation = 'Ideation',
    Legal = 'Legal',
    Marketing = 'Marketing',
    ProjectManagement = 'Project_Management',
    Reporting = 'Reporting',
    SEO = 'SEO',
    Security = 'Security',
    SocialMedia = 'Social_Media',
    SoftwareEngineering = 'Software_Engineering',
    StructuredThinking = 'Structured_Thinking',
    VideoProduction = 'Video_Production',
}

export enum TeamMemberOptionType {
    Number = 'Number',
    String = 'String',
}

export type TeamMemberOptionString = {
    from?: readonly string[]
    type: TeamMemberOptionType.String
    value: string
}

export type TeamMemberOptionNumber = {
    max?: number
    min?: number
    type: TeamMemberOptionType.Number
    value: number
}

export type TeamMemberOption = TeamMemberOptionNumber | TeamMemberOptionString

export type TeamMember = {
    id: string
    defaultTask: string
    description: string
    name: string
    options?: Record<string, TeamMemberOption>
    qualityControl: string
    qualityControlSteps?: string[]
    tags: TeamMemberTag[]
    title: string
    trainingData: string
}

export type Step = {
    responsible: TeamMember
    targetStepIndex?: number
    task?: string
}

export type Workflow = {
    id: string
    name: string
    title: string
    description: string
    steps: Step[]
}

export type PromptOption = {
    /**
     * When `true`, allows the model to ask a clarifying question instead of guessing
     * when a step's task is genuinely ambiguous.
     *
     * @defaultValue `false`
     */
    allowClarifyingQuestions?: boolean

    /**
     * Free-form, cross-cutting constraints to respect throughout every step (e.g.
     * budget, deadline, target audience, compliance requirements). Rendered as its
     * own `# Context:` section between the goal and the steps.
     *
     * @defaultValue no context section is rendered
     */
    context?: string

    /**
     * The 0-indexed step positions after which to pause and wait for validation
     * before continuing. Three distinct modes:
     * - omitted: pause after every step (fully manual, one step at a time)
     * - `[]`: never pause (fully automatic, run through all steps)
     * - `[i, j, ...]`: run continuously, pausing only after the specified steps
     *
     * @defaultValue omitted — pauses after every step
     */
    pauseAt?: number[]

    /**
     * Controls whether each step's output is preceded by a brief explanation of the
     * model's reasoning, or is the resolved task output only.
     *
     * @defaultValue `'concise'`
     */
    verbosity?: 'concise' | 'explained'
}
