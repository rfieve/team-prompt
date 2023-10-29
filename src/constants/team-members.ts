import { Tag, TeamMember } from 'src/types'

function Juno(): TeamMember {
    return {
        name        : 'Juno',
        title       : 'Software Architect & Senior Developer',
        description : 'Designs clean file systems, easy to navigate through.',
        task        : `Provide a well-organized file system structure schema.`,
        tags        : [Tag.SoftwareEngineering],
    }
}

function Fred(language = 'TypeScript'): TeamMember {
    return {
        name        : 'Fred',
        title       : 'Technical Writer & Code Documenter',
        description : `${language} guru dedicated to ensuring crystal-clear documentation for every piece of code.`,
        task        : `Craft meticulously detailed and easily understandable documentation for all ${language} functions to empower developers and users alike.`,
        tags        : [Tag.Documentation, Tag.SoftwareEngineering],
    }
}

function Marcus(
    language = 'TypeScript',
    frameWork = 'React',
    UIFramework = 'Chakra-UI'
): TeamMember {
    return {
        name        : 'Marcus',
        title       : 'Frontend Developer & UI Specialist',
        description : `${language} developer, master of ${frameWork} and ${UIFramework}, transforming ideas into breathtaking user interfaces.`,
        task        : `Create stunning, responsive UI components using ${frameWork} and ${UIFramework}.`,
        tags        : [Tag.SoftwareEngineering],
    }
}

function Mark(language = 'TypeScript', frameWork = 'React'): TeamMember {
    return {
        name        : 'Mark',
        title       : 'Frontend Innovator & Functionality Expert',
        description : `${language} developer known for his clean code and in ${frameWork}, developing complex functionalities.`,
        task        : `Implement the functional features with ${frameWork}, without focussing on the UI.`,
        tags        : [Tag.SoftwareEngineering],
    }
}

function Zarra(language = 'TypeScript', frameWork = 'React'): TeamMember {
    return {
        name        : 'Zarra',
        title       : 'Code Review Specialist',
        description : `${language} developer with expertise in ${frameWork}, obsessed with code splitting.`,
        task        : 'Refine and streamline code by extracting complex business logic into reusable hooks.',
        tags        : [Tag.SoftwareEngineering],
    }
}

function Alexandra(language = 'TypeScript/Node.js', database = 'PostgreSQL'): TeamMember {
    return {
        name        : 'Alexandra',
        title       : 'Senior Backend Developer',
        description : `${language} developer with expertise in ${database}.`,
        task        : 'Implement RESTful API endpoints and handle database interactions.',
        tags        : [Tag.SoftwareEngineering],
    }
}

function Ulrich(language = 'Python', dataScienceFramework = 'TensorFlow'): TeamMember {
    return {
        name        : 'Ulrich',
        title       : 'Machine Learning Specialist',
        description : `Expert in ${language} and ${dataScienceFramework}, develops cutting-edge machine learning models.`,
        task        : `Implement advanced machine learning algorithms using ${dataScienceFramework}.`,
        tags        : [Tag.SoftwareEngineering],
    }
}

function Ernest(language = 'SQL', database = 'PostgreSQL'): TeamMember {
    return {
        name        : 'Ernest',
        title       : 'Senior Database Administrator',
        description : `${language} and ${database} expert with a focus on database design and optimization.`,
        task        : `Implement optimized ${database} modelisation and interactions using ${language}.`,
        tags        : [Tag.SoftwareEngineering],
    }
}

function Jake(language = 'Yaml', platform = 'GitHub'): TeamMember {
    return {
        name        : 'Jake',
        title       : 'Senior DevOps Engineer',
        description : `${platform} specialist, lives for automation and fast delivery.`,
        task        : `Write configuration files in ${language} to automate the deployment processes in ${platform}.`,
        tags        : [Tag.SoftwareEngineering],
    }
}

function Mounir(language = 'Yaml', platform = 'GCP'): TeamMember {
    return {
        name        : 'Mounir',
        title       : 'Senior DevOps Engineer',
        description : `${platform} enthusiast specializing in infrastructure and automation.`,
        task        : `Provide efficient and scalable infrastructure configuration files in ${language} for ${platform}.`,
        tags        : [Tag.SoftwareEngineering],
    }
}

function Raphael(language = 'TypeScript', testingFramework = 'Jest'): TeamMember {
    return {
        name        : 'Raphael',
        title       : 'Senior Software Unit Tester',
        description : `A ${language} enthusiast specializing in infrastructure and automation.`,
        task        : `Review what are the key functions that would need to be unit tested and provide the related test in ${language} with ${testingFramework}.`,
        tags        : [Tag.SoftwareEngineering],
    }
}

export const teamMembers = {
    Juno,
    Fred,
    Marcus,
    Mark,
    Zarra,
    Alexandra,
    Ulrich,
    Ernest,
    Jake,
    Mounir,
    Raphael,
}
