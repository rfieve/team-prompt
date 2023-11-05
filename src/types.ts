export enum TeamMemberTag {
    CopyWriting = 'CopyWriting',
    Documentation = 'Documentation',
    Marketting = 'Marketting',
    SEO = 'SEO',
    SoftwareEngineering = 'SoftwareEngineering'
}

export type TeamMember = {
    defaultTask : string;
    description : string;
    name        : string;
    tags        : TeamMemberTag[];
    title       : string;
}

export type Step = {
    responsible      : TeamMember;
    targetStepIndex? : number;
    task?            : string;
}
