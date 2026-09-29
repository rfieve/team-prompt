export type TeamPromptEntity = {
    description : string;
    id          : string;
    name        : string;
    title       : string;
}

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
    from? : readonly string[];
    type  : TeamMemberOptionType.String;
    value : string;
}

export type TeamMemberOptionNumber = {
    max?  : number;
    min?  : number;
    type  : TeamMemberOptionType.Number;
    value : number;
}

export type TeamMemberOption = TeamMemberOptionNumber | TeamMemberOptionString

export type TeamMemberReplacement = {
    /**
     * The `id` of the team member to use instead.
     */
    id : string;

    /**
     * The condition under which the replacement fits better, phrased to complete
     * "Use the replacement if…" (e.g. `'the project uses a NoSQL database'`).
     */
    when : string;
}

/**
 * How a team member delivers its work:
 * - `'conversational'`: answers in the chat, as a written deliverable
 * - `'localExecution'`: acts directly on the user's codebase or systems
 */
export type TeamMemberRunningMode = 'conversational' | 'localExecution'

export type TeamMemberRunningModes = {
    /**
     * The running modes this team member supports.
     */
    options : TeamMemberRunningMode[];

    /**
     * The default running mode. Must be one of `options`, and `'localExecution'`
     * whenever `options` includes it.
     */
    value : TeamMemberRunningMode;
}

export type TeamMember = TeamPromptEntity & {
    defaultTask : string;

    /**
     * What resolving `defaultTask` produces and how it is shaped (e.g. `'An audit
     * report: one finding per vulnerability, ordered by severity.'`).
     */
    deliverable? : string;
    options?     : Record<string, TeamMemberOption>;

    /**
     * Team members to use instead of this one when their condition matches the
     * context. A chosen replacement resolves its own `defaultTask`, not the step's `task`.
     */
    potentialReplacements? : TeamMemberReplacement[];
    qualityControl         : string;
    qualityControlSteps?   : string[];

    /**
     * The running modes this team member supports, and the one it uses by default.
     */
    runningModes : TeamMemberRunningModes;
    tags         : TeamMemberTag[];
    trainingData : string;
}

export type Step = {
    responsible      : TeamMember;
    targetStepIndex? : number;
    task?            : string;
}

export type Workflow = TeamPromptEntity & {
    steps : Step[];
}

export type CompanyTeam = TeamPromptEntity & {
    /** The children company team ids in the organigram */
    children    : string[];
    /** The parent company team ids in the organigram */
    parents     : string[];
    teamMembers : TeamMember[];
}

export type Company = TeamPromptEntity & {
    teams : CompanyTeam[];
}

export type PromptOption = {
    /**
     * When `true`, allows the model to ask a clarifying question instead of guessing
     * when a step's task is genuinely ambiguous.
     *
     * @defaultValue `false`
     */
    allowClarifyingQuestions? : boolean;

    /**
     * Free-form, cross-cutting constraints to respect throughout every step (e.g.
     * budget, deadline, target audience, compliance requirements). Rendered as its
     * own `# Context:` section between the goal and the steps.
     *
     * @defaultValue no context section is rendered
     */
    context? : string;

    /**
     * The 0-indexed step positions after which to pause and wait for validation
     * before continuing. Three distinct modes:
     * - omitted: pause after every step (fully manual, one step at a time)
     * - `[]`: never pause (fully automatic, run through all steps)
     * - `[i, j, ...]`: run continuously, pausing only after the specified steps
     *
     * @defaultValue omitted — pauses after every step
     */
    pauseAt? : number[];

    /**
     * Overrides how every step delivers its result, for the team members that support
     * this running mode; the others keep their default. Use `'localExecution'` when the
     * prompt is run by an agent acting on a codebase (e.g. Claude Code), and
     * `'conversational'` when it is run in a chat.
     *
     * Only used by `createWorkflowPrompt`.
     *
     * @defaultValue omitted — each step uses its team member's default running mode
     */
    runningMode? : TeamMemberRunningMode;

    /**
     * Controls whether each step's output is preceded by a brief explanation of the
     * model's reasoning, or is the resolved task output only.
     *
     * @defaultValue `'concise'`
     */
    verbosity? : 'concise' | 'explained';
}

export type CompanyPromptOption = Pick<
    PromptOption,
    'allowClarifyingQuestions' | 'context' | 'verbosity'
> & {
    /**
     * Whether to stop after the plan and wait for its validation before running it:
     * staffing mistakes are cheaper to fix before any step builds on them.
     *
     * @defaultValue `true`
     */
    pauseAfterPlan? : boolean;

    /**
     * Whether each step's output is reviewed by a member of one of its team's parent
     * teams before the next step builds on it.
     *
     * @defaultValue `false`
     */
    review? : boolean;
}
