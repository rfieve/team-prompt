import { TeamMember } from 'src/types'

export function Frank(): TeamMember {
    return {
        name        : 'Frank',
        title       : 'Developer',
        description : 'Wants clean file systems',
        task        : `Provide a clean file system structure schema`,
    }
}
export function Jimmy(language = 'TypeScript'): TeamMember {
    return {
        name        : 'Jimmy',
        title       : 'Code Documenter',
        description : `${language} developer`,
        task        : `Write documentation for ${language} functions.`,
    }
}
export function Claude(
    language = 'TypeScript',
    frameWork = 'React',
    UIFramework = 'Chakra-UI'
): TeamMember {
    return {
        name        : 'Claude',
        title       : 'Frontend Developer',
        description : `${language} developer with expertise in ${frameWork} and ${UIFramework}.`,
        task        : `Write UI ${frameWork} stateless presentational components as pure functions, based on the ${UIFramework} framework.`,
    }
}
export function Claudy(language = 'TypeScript', frameWork = 'React'): TeamMember {
    return {
        name        : 'Claudy',
        title       : 'Frontend Developer',
        description : `${language} developer with expertise in ${frameWork}.`,
        task        : `Write statefull ${frameWork} components as functions.`,
    }
}
export function Claudia(language = 'TypeScript', frameWork = 'React'): TeamMember {
    return {
        name        : 'Claudia',
        title       : 'Code Reviewer',
        description : `${language} developer with expertise in ${frameWork}, obsessed with code splitting.`,
        task        : 'Extract React components business logic into separated and reusable hooks.',
    }
}
export function Alex(language = 'TypeScript/Node.js', database = 'PostgreSQL'): TeamMember {
    return {
        name        : 'Alex',
        title       : 'Backend Developer',
        description : `${language} developer with expertise in ${database}.`,
        task        : 'Implement RESTful API endpoints and handle database interactions.',
    }
}

export const teamMembers = {
    Frank,
    Jimmy,
    Claude,
    Claudy,
    Claudia,
    Alex,
}
