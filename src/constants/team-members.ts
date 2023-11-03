import { TeamMemberTag, TeamMember } from 'src/types'

function Juno(): TeamMember {
    return {
        name        : 'Juno',
        title       : 'Software Architect & Developer',
        description : 'Designs clean file systems, easy to navigate through.',
        defaultTask : `Provide a well-organized file system structure schema.`,
        tags        : [TeamMemberTag.SoftwareEngineering],
    }
}

function Fred(language = 'TypeScript'): TeamMember {
    return {
        name        : 'Fred',
        title       : 'Technical Writer & Code Documenter',
        description : `${language} guru dedicated to ensuring crystal-clear documentation for every piece of code.`,
        defaultTask : `Craft meticulously detailed and easily understandable documentation for all ${language} functions to empower developers and users alike.`,
        tags        : [TeamMemberTag.Documentation, TeamMemberTag.SoftwareEngineering],
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
        defaultTask : `Create stunning, responsive UI components using ${frameWork} and ${UIFramework}.`,
        tags        : [TeamMemberTag.SoftwareEngineering],
    }
}

function Mark(language = 'TypeScript', frameWork = 'React'): TeamMember {
    return {
        name        : 'Mark',
        title       : 'Frontend Developer & Functionality Expert',
        description : `${language} developer known for his clean code and in ${frameWork}, developing complex functionalities.`,
        defaultTask : `Implement the functional features with ${frameWork}, without focussing on the UI.`,
        tags        : [TeamMemberTag.SoftwareEngineering],
    }
}

function Zarra(language = 'TypeScript', frameWork = 'React'): TeamMember {
    return {
        name        : 'Zarra',
        title       : 'Code Reviewer',
        description : `${language} developer with expertise in ${frameWork}, obsessed with code splitting, clean and reusable pieces of code.`,
        defaultTask :
            'Refine and streamline code by extracting complex business logic into reusable hooks.',
        tags : [TeamMemberTag.SoftwareEngineering],
    }
}

function Alexandra(language = 'TypeScript/Node.js', database = 'PostgreSQL'): TeamMember {
    return {
        name        : 'Alexandra',
        title       : 'Backend Developer',
        description : `${language} developer with expertise in ${database}.`,
        defaultTask : 'Implement RESTful API endpoints and handle database interactions.',
        tags        : [TeamMemberTag.SoftwareEngineering],
    }
}

function Ulrich(language = 'Python', dataScienceFramework = 'TensorFlow'): TeamMember {
    return {
        name        : 'Ulrich',
        title       : 'Machine Learning Specialist',
        description : `Expert in ${language} and ${dataScienceFramework}, develops cutting-edge machine learning models.`,
        defaultTask : `Implement advanced machine learning algorithms using ${dataScienceFramework}.`,
        tags        : [TeamMemberTag.SoftwareEngineering],
    }
}

function Ernest(language = 'SQL', database = 'PostgreSQL'): TeamMember {
    return {
        name        : 'Ernest',
        title       : 'Database Administrator',
        description : `${language} and ${database} expert with a focus on database design and optimization.`,
        defaultTask : `Implement optimized ${database} modelisation and interactions using ${language}.`,
        tags        : [TeamMemberTag.SoftwareEngineering],
    }
}

function Jake(language = 'Yaml', platform = 'GitHub'): TeamMember {
    return {
        name        : 'Jake',
        title       : 'DevOps Engineer',
        description : `${platform} specialist, lives for automation and fast delivery.`,
        defaultTask : `Write configuration files in ${language} to automate the deployment processes in ${platform}.`,
        tags        : [TeamMemberTag.SoftwareEngineering],
    }
}

function Mounir(language = 'Yaml', platform = 'GCP'): TeamMember {
    return {
        name        : 'Mounir',
        title       : 'DevOps Engineer',
        description : `${platform} enthusiast specializing in infrastructure and automation.`,
        defaultTask : `Provide efficient and scalable infrastructure configuration files in ${language} for ${platform}.`,
        tags        : [TeamMemberTag.SoftwareEngineering],
    }
}

function Raphael(language = 'TypeScript', testingFramework = 'Jest'): TeamMember {
    return {
        name        : 'Raphael',
        title       : 'Software Unit Tester',
        description : `A ${language} enthusiast specializing in infrastructure and automation.`,
        defaultTask : `Review what are the key functions that would need to be unit tested and provide the related test in ${language} with ${testingFramework}.`,
        tags        : [TeamMemberTag.SoftwareEngineering],
    }
}

function Renee(wordsCount = 300): TeamMember {
    return {
        name        : 'Renee',
        title       : 'CopyWriter',
        description : `Synthecical thinker.`,
        defaultTask : `Summerize the text in ${wordsCount} words.`,
        tags        : [TeamMemberTag.CopyWriting],
    }
}

function Mira(): TeamMember {
    return {
        name        : 'Mira',
        title       : 'Functional Analyst',
        description : `Analytical thinker.`,
        defaultTask : `Create a detailed functional analysis to detail de features required.`,
        tags        : [TeamMemberTag.SoftwareEngineering, TeamMemberTag.Documentation],
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
    Renee,
    Mira,
}
