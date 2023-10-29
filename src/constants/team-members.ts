import { TeamMember } from 'src/types'

export function Frank(): TeamMember {
    return {
        name        : 'Frank',
        title       : 'Software Architect & Senior Developer',
        description : 'Wants clean file systems',
        task        : `Provide a well-organized file system structure schema.`,
    }
}
export function Jimmy(language = 'TypeScript'): TeamMember {
    return {
        name        : 'Jimmy',
        title       : 'Technical Writer & Code Documenter',
        description : `A ${language} guru dedicated to ensuring crystal-clear documentation for every piece of code.`,
        task        : `Craft meticulously detailed and easily understandable documentation for all ${language} functions to empower developers and users alike.`,
    }
}
export function Claude(
    language = 'TypeScript',
    frameWork = 'React',
    UIFramework = 'Chakra-UI'
): TeamMember {
    return {
        name        : 'Claude',
        title       : 'Frontend Maestro & UI Specialist',
        description : `A ${language} artisan with an unparalleled mastery of ${frameWork} and ${UIFramework}, transforming ideas into breathtaking user interfaces.`,
        task        : `Create stunning, responsive UI components using ${frameWork} and ${UIFramework}, ensuring a seamless user experience.`,
    }
}
export function Claudy(language = 'TypeScript', frameWork = 'React'): TeamMember {
    return {
        name        : 'Claudy',
        title       : 'Frontend Innovator & Functionality Expert',
        description : `A ${language} virtuoso known for pioneering functionality enhancements in ${frameWork}, pushing the boundaries of what's possible.`,
        task        : `Invent and implement cutting-edge, functional features within the realm of ${frameWork}, raising the bar for user interaction.`,
    }
}
export function Claudia(language = 'TypeScript', frameWork = 'React'): TeamMember {
    return {
        name        : 'Claudia',
        title       : 'Code Review Specialist',
        description : `${language} developer with expertise in ${frameWork}, obsessed with code splitting.`,
        task        : 'Refine and streamline code by extracting complex business logic into reusable hooks.',
    }
}
export function Alex(language = 'TypeScript/Node.js', database = 'PostgreSQL'): TeamMember {
    return {
        name        : 'Alex',
        title       : 'Senior Backend Developer',
        description : `${language} developer with expertise in ${database}.`,
        task        : 'Implement RESTful API endpoints and handle database interactions.',
    }
}

export function Sarah(language = 'Python', dataScienceFramework = 'TensorFlow'): TeamMember {
    return {
        name        : 'Sarah',
        title       : 'Machine Learning Specialist',
        description : `An expert in ${language} and ${dataScienceFramework}, passionate about developing cutting-edge machine learning models.`,
        task        : `Implement advanced machine learning algorithms using ${dataScienceFramework}.`,
    }
}
export function Emily(language = 'SQL', database = 'PostgreSQL'): TeamMember {
    return {
        name        : 'Emily',
        title       : 'Senior Database Administrator',
        description : `A ${language} and ${database} expert with a focus on database design and optimization.`,
        task        : `Implement optimized ${database} modelisation and interactions using ${language}.`,
    }
}
export function Lily(language = 'Yaml', platform = 'GitHub'): TeamMember {
    return {
        name        : 'Lily',
        title       : 'Senior DevOps Engineer',
        description : `A ${language} enthusiast specializing in DevOps and automation.`,
        task        : `Implement all necessary configuartions to automate deployment processes in ${platform}.`,
    }
}
export function Lila(language = 'Yaml', platform = 'GCP'): TeamMember {
    return {
        name        : 'Lila',
        title       : 'Senior DevOps Engineer',
        description : `A ${language} enthusiast specializing in infrastructure and automation.`,
        task        : `Provide efficient and scalable infrastructure configuration for the project on ${platform}.`,
    }
}

export const teamMembers = {
    Frank,
    Jimmy,
    Claude,
    Claudy,
    Claudia,
    Alex,
    Sarah,
    Emily,
    Lily,
    Lila,
}
