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

export enum TeamMemberOptionType {
    Number = 'Number',
    String = 'String',
}

export type TeamMemberOptionString = {
    from? : string[];
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

export type TeamMember = {
    defaultTask    : string;
    description    : string;
    name           : string;
    options?       : Record<string, TeamMemberOption>;
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
