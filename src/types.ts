export enum TeamMemberTag {
    CopyWriting = 'Copywriting',
    Documentation = 'Documentation',
    Marketting = 'Marketting',
    ProjectManagment = 'Project_Managment',
    SEO = 'SEO',
    SoftwareEngineering = 'Software_Engineering',
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
