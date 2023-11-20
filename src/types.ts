export enum TeamMemberTag {
    BackendDevelopement = 'Backend_Developement',
    Business = 'Business',
    CopyWriting = 'Copywriting',
    DataAnalysis = 'Data_Analysis',
    Documentation = 'Documentation',
    FrontendDevelopement = 'Frontend_Developement',
    Ideation = 'Ideation',
    Legal = 'Legal',
    Marketing = 'Marketing',
    ProjectManagement = 'Project_Management',
    Reporting = 'Reporting',
    SEO = 'SEO',
    SocialMedia = 'Social_Media',
    SoftwareEngineering = 'Software_Engineering',
    StructuredThinking = 'Structured_Thinking',
    VideoProduction = 'Video_Production',
}

export type TeamMember = {
    defaultTask    : string;
    description    : string;
    name           : string;
    qualityControl : string;
    tags           : TeamMemberTag[];
    title          : string;
    trainingData   : string;
}

export type Step = {
    responsible      : TeamMember;
    targetStepIndex? : number;
    task?            : string;
}
