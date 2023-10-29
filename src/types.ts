export enum Tag {
    Documentation = 'Documentation',
    SoftwareEngineering = 'SoftwareEngineering',
}

export type TeamMember = {
    description : string;
    name        : string;
    tags        : Tag[];
    task        : string;
    title       : string;
}
