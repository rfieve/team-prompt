import { TeamMemberBuilder } from 'src/class/team-member-builder'
import { StepRunningModes, Workflow } from 'src/types'

import {
    Ada,
    Alexandra,
    Anemone,
    Aria,
    Atlas,
    Bastian,
    Bruno,
    Cassian,
    Claire,
    Claude,
    Dana,
    Dex,
    Elan,
    Emil,
    Ernest,
    Eva,
    Felix,
    Fred,
    Frida,
    Hazel,
    Hugo,
    Ingrid,
    Iris,
    Isabella,
    Jake,
    Jonas,
    Juno,
    Kai,
    Kira,
    Lena,
    Leo,
    Lily,
    Marcus,
    Mark,
    Mateo,
    Max,
    Maya,
    Milo,
    Mira,
    Mounir,
    Natalie,
    Nico,
    Nina,
    Nova,
    Olivia,
    Otis,
    Ouria,
    Petra,
    Piper,
    Priya,
    Quinn,
    Raphael,
    Reid,
    Remy,
    Renee,
    Rowan,
    Sasha,
    Sophia,
    Sophie,
    Soren,
    Sybilla,
    Tessa,
    Theo,
    Ulrich,
    Ulyss,
    Vera,
    Vince,
    Wren,
    Xavier,
    Zarra,
} from './team-members'
import { StepRunningMode } from '../types'


const runningModes: StepRunningMode[] = ['conversational', 'localExecution']

// Works on the user's codebase or systems, but can fall back to answering in chat.
const localFirst: StepRunningModes = {
    options : runningModes,
    value   : 'localExecution',
}

// Mostly a written deliverable, answered in chat or saved to disk on request.
const conversationalFirst: StepRunningModes = {
    options : runningModes,
    value   : 'conversational',
}

// Mounir provisions GCP by default: deploy the workloads on the same cloud.
const MiloOnGcp = new TeamMemberBuilder(Milo).setOption('platform', 'GCP')

// Data pipelines and ML models are written in Python.
const RaphaelPython = new TeamMemberBuilder(Raphael)
    .setOption('language', 'Python')
    .setOption('framework', 'PyTest')
const FredPython    = new TeamMemberBuilder(Fred)
    .setOption('language', 'Python')
    .setOption('docStandard', 'Google docstring style')

export const SwissArmyKnives = {
    id    : 'swiss-army-knives',
    name  : 'The Swiss Army Knives',
    title : 'Multi-purpose',
    description :
        'Turns a loosely defined goal into a prioritized, structured plan and the team needed to carry it out. Useful as a starting point whenever you know roughly what you want but not yet why it matters most or how to get there.',
    steps : [
        { responsible: Sybilla, runningModes: conversationalFirst },
        { responsible: Priya, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Ouria, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const CodeSlingersUnited = {
    id    : 'code-slingers-united',
    name  : 'The Code Slingers United',
    title : 'Backend feature development',
    description :
        'Carries a backend feature all the way from data modeling to a documented, tested, reviewed, security-audited, and released implementation. Useful for shipping production-ready APIs and business logic without cutting corners.',
    steps : [
        { responsible: Sybilla, runningModes: conversationalFirst },
        { responsible: Mira, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Juno, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Ernest, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Alexandra, targetStepIndex: 3, runningModes: localFirst },
        { responsible: Bastian, targetStepIndex: 4, runningModes: localFirst },
        { responsible: Soren, targetStepIndex: 5, runningModes: localFirst },
        { responsible: Raphael, targetStepIndex: 6, runningModes: localFirst },
        { responsible: Hugo, targetStepIndex: 4, runningModes: localFirst },
        { responsible: Fred, targetStepIndex: 6, runningModes: localFirst },
        { responsible: Vince, targetStepIndex: 7, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const PixelPioneers = {
    id    : 'pixel-pioneers',
    name  : 'The Pixel Pioneers',
    title : 'Frontend feature development',
    description :
        'Carries a frontend feature all the way from accessible markup to a polished, reviewed, unit- and end-to-end-tested, released UI. Useful for shipping production-ready interfaces without cutting corners on accessibility or quality.',
    steps : [
        { responsible: Sybilla, runningModes: conversationalFirst },
        { responsible: Mira, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Juno, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Sophia, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Marcus, targetStepIndex: 3, runningModes: localFirst },
        { responsible: Mark, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Zarra, targetStepIndex: 5, runningModes: localFirst },
        { responsible: Raphael, targetStepIndex: 6, runningModes: localFirst },
        { responsible: Quinn, targetStepIndex: 6, runningModes: localFirst },
        { responsible: Fred, targetStepIndex: 4, runningModes: localFirst },
        { responsible: Fred, targetStepIndex: 6, runningModes: localFirst },
        { responsible: Vince, targetStepIndex: 8, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const NitpickingSquadron = {
    id    : 'nitpicking-squadron',
    name  : 'The Nitpicking Squadron',
    title : 'Frontend code review',
    description :
        'Hardens existing frontend code by reviewing it, documenting it, and backing it with unit tests. Useful for raising the quality and maintainability of a user interface before it ships.',
    steps : [
        { responsible: Zarra, runningModes: localFirst },
        { responsible: Fred, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Raphael, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const QueryInquisitors = {
    id    : 'query-inquisitors',
    name  : 'The Query Inquisitors',
    title : 'Backend code review',
    description :
        'Hardens existing backend code by reviewing its layering, data access, and error handling, documenting it, and backing it with unit tests. Useful for raising the quality and maintainability of an API or service before it ships.',
    steps : [
        { responsible: Bastian, runningModes: localFirst },
        { responsible: Fred, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Raphael, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const Renovators = {
    id    : 'renovators',
    name  : 'The Renovators',
    title : 'Refactoring',
    description :
        'Restructures an existing codebase into a clean, layered architecture, then refactors its internals with proven design patterns while preserving behavior, backed by unit tests and documentation. Useful for paying down technical debt before it slows down new features.',
    steps : [
        { responsible: Reid, runningModes: localFirst },
        { responsible: Rowan, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Raphael, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Fred, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const ShortOnes = {
    id    : 'short-ones',
    name  : 'The Short Ones',
    title : 'Content summarization',
    description :
        'Distills long or dense technical content into a clear, structured summary tailored to its readers, while preserving the numbers that matter. Useful for making technical material quick to digest without losing what matters.',
    steps : [
        { responsible: Anemone, runningModes: conversationalFirst },
        { responsible: Renee, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Claude, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Frida, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const JargonBusters = {
    id    : 'jargon-busters',
    name  : 'The Jargon Busters',
    title : 'Technical content vulgarisation',
    description :
        'Turns technical content into clear, localized language adapted to a non-technical or international audience, without losing the numbers that matter. Useful for making complex material approachable without losing accuracy.',
    steps : [
        { responsible: Anemone, runningModes: conversationalFirst },
        { responsible: Claude, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Max, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Isabella, targetStepIndex: 2, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const HypeSquad = {
    id    : 'hype-squad',
    name  : 'The Hype Squad',
    title : 'Marketing content production',
    description :
        'Turns raw content into a full package of audience-targeted, persuasive marketing material across channels. Useful for producing SEO-, social- and email-ready copy from a single starting piece.',
    steps : [
        { responsible: Anemone, runningModes: conversationalFirst },
        { responsible: Eva, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Olivia, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Isabella, targetStepIndex: 2, runningModes: conversationalFirst },
        { responsible: Lily, targetStepIndex: 3, runningModes: conversationalFirst },
        { responsible: Xavier, targetStepIndex: 3, runningModes: conversationalFirst },
        { responsible: Natalie, targetStepIndex: 3, runningModes: conversationalFirst },
        { responsible: Claire, targetStepIndex: 3, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const BrandArchitects = {
    id    : 'brand-architects',
    name  : 'The Brand Architects',
    title : 'Design system & UI/UX',
    description :
        'Establishes the typography, color, and component foundations for a product, then applies them to concrete page-level UX and micro-interactions. Useful as the design phase that feeds into a frontend implementation flow like The Pixel Pioneers.',
    steps : [
        { responsible: Iris, runningModes: conversationalFirst },
        { responsible: Theo, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Ulyss, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const ShipWrights = {
    id    : 'ship-wrights',
    name  : 'The Ship Wrights',
    title : 'Infrastructure & deployment',
    description :
        'Designs a scalable system architecture, provisions the cloud infrastructure, deploys the workloads behind a gateway, automates their delivery through a CI/CD pipeline, instruments them for observability, and hands off a running, monitored, released, and documented environment.',
    steps : [
        { responsible: Atlas, runningModes: conversationalFirst },
        { responsible: Mounir, targetStepIndex: 0, runningModes: localFirst },
        { responsible: MiloOnGcp, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Nova, targetStepIndex: 2, runningModes: localFirst },
        { responsible: Jake, targetStepIndex: 2, runningModes: localFirst },
        { responsible: Piper, targetStepIndex: 3, runningModes: localFirst },
        { responsible: Otis, targetStepIndex: 5, runningModes: localFirst },
        { responsible: Vince, targetStepIndex: 4, runningModes: conversationalFirst },
        { responsible: Ingrid, targetStepIndex: 6, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const NumberCrunchers = {
    id    : 'number-crunchers',
    name  : 'The Number Crunchers',
    title : 'Data analysis & machine learning',
    description :
        'Builds the data pipeline, analyzes what it produces for insights, and trains a documented, tested machine learning model informed by those insights. Useful for turning raw data into a shippable predictive model.',
    steps : [
        { responsible: Dana, runningModes: localFirst },
        { responsible: Sophie, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Ulrich, targetStepIndex: 1, runningModes: localFirst },
        { responsible: RaphaelPython, targetStepIndex: 2, runningModes: localFirst },
        { responsible: FredPython, targetStepIndex: 2, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const DirectorsCut = {
    id    : 'directors-cut',
    name  : 'The Directors Cut',
    title : 'Video content production',
    description :
        'Turns an audience strategy into a narratively polished, scripted video with a distribution plan. Useful for producing a YouTube, TikTok, or Reels video ready to ship, from strategy to rollout.',
    steps : [
        { responsible: Eva, runningModes: conversationalFirst },
        { responsible: Olivia, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Maya, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Natalie, targetStepIndex: 2, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const PocketPioneers = {
    id    : 'pocket-pioneers',
    name  : 'The Pocket Pioneers',
    title : 'Mobile feature development',
    description :
        'Carries a mobile feature from analysis to a reviewed, end-to-end-tested, documented implementation handling offline behavior and platform-specific design. Best suited to the React Native default — swap the reviewer if targeting native Swift/Kotlin.',
    steps : [
        { responsible: Sybilla, runningModes: conversationalFirst },
        { responsible: Mira, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Kai, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Zarra, targetStepIndex: 2, runningModes: localFirst },
        { responsible: Dex, targetStepIndex: 3, runningModes: localFirst },
        { responsible: Fred, targetStepIndex: 3, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const Fortress = {
    id    : 'fortress',
    name  : 'The Fortress',
    title : 'Security audit',
    description :
        'Hunts for exploitable vulnerabilities and known breach patterns in existing code, fixes them by order of severity, and backs the fixes with regression tests. Useful as a focused security pass on code that already works functionally.',
    steps : [
        { responsible: Soren, runningModes: localFirst },
        { responsible: Kira, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Raphael, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const StressTesters = {
    id    : 'stress-testers',
    name  : 'The Stress Testers',
    title : 'Performance & reliability hardening',
    description :
        'Load-tests a system to find its breaking point, fixes the bottlenecks, confirms the fix with a second load test, then instruments and documents the system so the fix is both durable and observable going forward. Useful before a launch or traffic spike you need to be confident the system can survive.',
    steps : [
        { responsible: Leo, runningModes: localFirst },
        { responsible: Tessa, targetStepIndex: 0, runningModes: localFirst },
        {
            responsible     : Leo,
            runningModes    : localFirst,
            targetStepIndex : 1,
            task            : 'Re-run the same load tests against the optimized system and compare the results with the initial run, confirming each bottleneck is resolved and the performance targets are met.',
        },
        { responsible: Piper, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Ingrid, targetStepIndex: 3, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const MotionPicture = {
    id    : 'motion-picture',
    name  : 'The Motion Picture',
    title : 'Animation & motion design',
    description :
        'Designs the storyboard and keyframe concept behind a piece of motion, then implements it as smooth, purposeful web animation. Useful for adding polish to an interface or telling a story through movement.',
    steps : [
        { responsible: Elan, runningModes: conversationalFirst },
        { responsible: Wren, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const BugHunters = {
    id    : 'bug-hunters',
    name  : 'The Bug Hunters',
    title : 'Bug fixing',
    description :
        'Reproduces a reported bug as a failing test, traces it to its root cause, fixes it everywhere it applies, hardens the fix with edge-case tests, and writes a blameless postmortem. Useful for fixing a bug for good instead of patching its symptom.',
    steps : [
        { responsible: Remy, runningModes: localFirst },
        { responsible: Vera, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Felix, targetStepIndex: 1, runningModes: localFirst },
        {
            responsible     : Raphael,
            runningModes    : localFirst,
            targetStepIndex : 2,
            task            : 'Add unit tests for the edge cases surrounding the fix, next to the reproduction test, so that neighboring variants of the bug are caught too.',
        },
        {
            responsible     : Ingrid,
            runningModes    : conversationalFirst,
            targetStepIndex : 2,
            task            : 'Write a blameless postmortem of the bug: its impact, timeline, root cause, the fix, and the follow-up actions that would prevent this class of defect from happening again.',
        },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const FullStackers = {
    id    : 'full-stackers',
    name  : 'The Full Stackers',
    title : 'Full-stack feature development',
    description :
        'Carries a feature across the whole stack, from data modeling and a documented API contract to the accessible UI that consumes it, reviewed on both sides, tested end to end, and released. Useful when a feature needs backend and frontend changes designed together.',
    steps : [
        { responsible: Sybilla, runningModes: conversationalFirst },
        { responsible: Mira, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Juno, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Ernest, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Alexandra, targetStepIndex: 3, runningModes: localFirst },
        { responsible: Hugo, targetStepIndex: 4, runningModes: localFirst },
        { responsible: Sophia, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Marcus, targetStepIndex: 6, runningModes: localFirst },
        { responsible: Mark, targetStepIndex: 5, runningModes: localFirst },
        { responsible: Bastian, targetStepIndex: 4, runningModes: localFirst },
        { responsible: Zarra, targetStepIndex: 8, runningModes: localFirst },
        { responsible: Raphael, targetStepIndex: 9, runningModes: localFirst },
        { responsible: Quinn, targetStepIndex: 10, runningModes: localFirst },
        { responsible: Vince, targetStepIndex: 12, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const Upgraders = {
    id    : 'upgraders',
    name  : 'The Upgraders',
    title : 'Dependency & framework upgrade',
    description :
        'Upgrades a dependency or framework across breaking versions, from reading the migration guides to a migrated, tested codebase with a rollout and rollback plan. Useful for major version upgrades that are too risky to do blindly.',
    steps : [
        { responsible: Nico, runningModes: localFirst },
        { responsible: Bruno, targetStepIndex: 0, runningModes: localFirst },
        {
            responsible     : Raphael,
            runningModes    : localFirst,
            targetStepIndex : 1,
            task            : 'Run the existing test suite against the upgraded codebase, fix the tests broken by legitimate API changes, and add tests for the behaviors most at risk from the breaking changes listed in the upgrade plan.',
        },
        { responsible: Quinn, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Vince, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const ComplianceOffice = {
    id    : 'compliance-office',
    name  : 'The Compliance Office',
    title : 'Privacy & compliance',
    description :
        'Maps how a system handles personal data, assesses it against privacy regulations and security best practices, and drafts the legal documents needed to close the gaps. Useful before a launch in a new market or ahead of a privacy audit.',
    steps : [
        { responsible: Lena, runningModes: localFirst },
        { responsible: Petra, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Soren, targetStepIndex: 0, runningModes: localFirst },
        {
            responsible     : Aria,
            runningModes    : conversationalFirst,
            targetStepIndex : 1,
            task            : 'Draft the privacy policy and data processing agreement language needed to address the compliance gaps identified, flagging the points that require a business decision, while noting this is not a substitute for advice from a licensed attorney.',
        },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const Showrunners = {
    id    : 'showrunners',
    name  : 'The Showrunners',
    title : 'Immersive landing page',
    description :
        'Designs and builds a striking landing page with a 3D scene and purposeful motion, wrapped in accessible markup and optimized to stay fast on mid-range devices. Useful for product launches and showcases where the first impression matters.',
    steps : [
        { responsible: Iris, runningModes: conversationalFirst },
        { responsible: Ulyss, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Sasha, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Wren, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Sophia, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Jonas, targetStepIndex: 4, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const Inclusionists = {
    id    : 'inclusionists',
    name  : 'The Inclusionists',
    title : 'Accessibility audit',
    description :
        'Audits an interface the way people with disabilities use it, fixes the issues by severity, and adds automated checks so they do not come back. Useful for meeting accessibility standards and legal requirements such as the European Accessibility Act.',
    steps : [
        { responsible: Ada, runningModes: localFirst },
        { responsible: Emil, targetStepIndex: 0, runningModes: localFirst },
        {
            responsible     : Quinn,
            runningModes    : localFirst,
            targetStepIndex : 1,
            task            : 'Add automated accessibility checks with axe-core to the end-to-end test suite, covering the critical user journeys and the pages fixed in the previous step, so that accessibility regressions fail the build.',
        },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const Heralds = {
    id    : 'heralds',
    name  : 'The Heralds',
    title : 'Release notes & announcement',
    description :
        'Turns commits and diffs into a structured changelog, rewrites it for end users, and announces the release on social media and by email. Useful for shipping release notes that people actually read.',
    steps : [
        { responsible: Hazel, runningModes: conversationalFirst },
        { responsible: Max, targetStepIndex: 0, runningModes: conversationalFirst },
        { responsible: Natalie, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Claire, targetStepIndex: 1, runningModes: conversationalFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const Cartographers = {
    id    : 'cartographers',
    name  : 'The Cartographers',
    title : 'Codebase documentation',
    description :
        'Maps an existing codebase and documents it at every level: architecture, code, API, operations, and a first-day onboarding guide. Useful for bringing an undocumented project up to date or preparing it for new contributors.',
    steps : [
        { responsible: Mateo, runningModes: localFirst },
        {
            responsible     : Atlas,
            runningModes    : localFirst,
            targetStepIndex : 0,
            task            : 'Document the existing architecture as architecture decision records: the main components and their boundaries, the key technology choices, and the tradeoffs they imply, inferring the reasoning from the code where it was never written down.',
        },
        { responsible: Fred, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Hugo, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Ingrid, targetStepIndex: 0, runningModes: localFirst },
        { responsible: Nina, targetStepIndex: 1, runningModes: localFirst },
        { responsible: Cassian, runningModes: conversationalFirst },
    ],
} satisfies Workflow

export const workflows = {
    SwissArmyKnives,
    CodeSlingersUnited,
    PixelPioneers,
    NitpickingSquadron,
    QueryInquisitors,
    Renovators,
    ShortOnes,
    JargonBusters,
    HypeSquad,
    BrandArchitects,
    ShipWrights,
    NumberCrunchers,
    DirectorsCut,
    PocketPioneers,
    Fortress,
    StressTesters,
    MotionPicture,
    BugHunters,
    FullStackers,
    Upgraders,
    ComplianceOffice,
    Showrunners,
    Inclusionists,
    Heralds,
    Cartographers,
} satisfies Record<string, Workflow>
