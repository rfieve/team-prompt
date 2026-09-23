import { TeamMemberBuilder } from 'src/class/team-member-builder'
import { Workflow } from 'src/types'

import {
    Alexandra,
    Anemone,
    Atlas,
    Bastian,
    Cassian,
    Claire,
    Claude,
    Dana,
    Dex,
    Elan,
    Ernest,
    Eva,
    Fred,
    Frida,
    Hugo,
    Ingrid,
    Iris,
    Isabella,
    Jake,
    Juno,
    Kai,
    Kira,
    Leo,
    Lily,
    Marcus,
    Mark,
    Max,
    Maya,
    Milo,
    Mira,
    Mounir,
    Natalie,
    Nova,
    Olivia,
    Otis,
    Ouria,
    Piper,
    Priya,
    Quinn,
    Raphael,
    Reid,
    Renee,
    Rowan,
    Sophia,
    Sophie,
    Soren,
    Sybilla,
    Tessa,
    Theo,
    Ulrich,
    Ulyss,
    Vince,
    Wren,
    Xavier,
    Zarra,
} from './team-members'

// Mounir provisions GCP by default: deploy the workloads on the same cloud.
const MiloOnGcp = new TeamMemberBuilder(Milo).setOption('platform', 'GCP')

// Data pipelines and ML models are written in Python.
const RaphaelPython = new TeamMemberBuilder(Raphael)
    .setOption('language', 'Python')
    .setOption('framework', 'PyTest')
const FredPython = new TeamMemberBuilder(Fred)
    .setOption('language', 'Python')
    .setOption('docStandard', 'Google docstring style')

export const SwissArmyKnives = {
    id: 'swiss-army-knives',
    name: 'The Swiss Army Knives',
    title: 'Multi-purpose',
    description:
        'Turns a loosely defined goal into a prioritized, structured plan and the team needed to carry it out. Useful as a starting point whenever you know roughly what you want but not yet why it matters most or how to get there.',
    steps: [
        { responsible: Sybilla },
        { responsible: Priya, targetStepIndex: 0 },
        { responsible: Ouria, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const CodeSlingersUnited = {
    id: 'code-slingers-united',
    name: 'The Code Slingers United',
    title: 'Backend feature development',
    description:
        'Carries a backend feature all the way from data modeling to a documented, tested, reviewed, security-audited, and released implementation. Useful for shipping production-ready APIs and business logic without cutting corners.',
    steps: [
        { responsible: Sybilla },
        { responsible: Mira, targetStepIndex: 0 },
        { responsible: Juno, targetStepIndex: 1 },
        { responsible: Ernest, targetStepIndex: 1 },
        { responsible: Alexandra, targetStepIndex: 3 },
        { responsible: Bastian, targetStepIndex: 4 },
        { responsible: Soren, targetStepIndex: 5 },
        { responsible: Raphael, targetStepIndex: 6 },
        { responsible: Hugo, targetStepIndex: 4 },
        { responsible: Fred, targetStepIndex: 6 },
        { responsible: Vince, targetStepIndex: 7 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const PixelPioneers = {
    id: 'pixel-pioneers',
    name: 'The Pixel Pioneers',
    title: 'Frontend feature development',
    description:
        'Carries a frontend feature all the way from accessible markup to a polished, reviewed, unit- and end-to-end-tested, released UI. Useful for shipping production-ready interfaces without cutting corners on accessibility or quality.',
    steps: [
        { responsible: Sybilla },
        { responsible: Mira, targetStepIndex: 0 },
        { responsible: Juno, targetStepIndex: 1 },
        { responsible: Sophia, targetStepIndex: 1 },
        { responsible: Marcus, targetStepIndex: 3 },
        { responsible: Mark, targetStepIndex: 1 },
        { responsible: Zarra, targetStepIndex: 5 },
        { responsible: Raphael, targetStepIndex: 6 },
        { responsible: Quinn, targetStepIndex: 6 },
        { responsible: Fred, targetStepIndex: 4 },
        { responsible: Fred, targetStepIndex: 6 },
        { responsible: Vince, targetStepIndex: 8 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const NitpickingSquadron = {
    id: 'nitpicking-squadron',
    name: 'The Nitpicking Squadron',
    title: 'Frontend code review',
    description:
        'Hardens existing frontend code by reviewing it, documenting it, and backing it with unit tests. Useful for raising the quality and maintainability of a user interface before it ships.',
    steps: [
        { responsible: Zarra },
        { responsible: Fred, targetStepIndex: 0 },
        { responsible: Raphael, targetStepIndex: 0 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const QueryInquisitors = {
    id: 'query-inquisitors',
    name: 'The Query Inquisitors',
    title: 'Backend code review',
    description:
        'Hardens existing backend code by reviewing its layering, data access, and error handling, documenting it, and backing it with unit tests. Useful for raising the quality and maintainability of an API or service before it ships.',
    steps: [
        { responsible: Bastian },
        { responsible: Fred, targetStepIndex: 0 },
        { responsible: Raphael, targetStepIndex: 0 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const Renovators = {
    id: 'renovators',
    name: 'The Renovators',
    title: 'Refactoring',
    description:
        'Restructures an existing codebase into a clean, layered architecture, then refactors its internals with proven design patterns while preserving behavior, backed by unit tests and documentation. Useful for paying down technical debt before it slows down new features.',
    steps: [
        { responsible: Reid },
        { responsible: Rowan, targetStepIndex: 0 },
        { responsible: Raphael, targetStepIndex: 1 },
        { responsible: Fred, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const ShortOnes = {
    id: 'short-ones',
    name: 'The Short Ones',
    title: 'Content summarization',
    description:
        'Distills long or dense technical content into a clear, structured summary tailored to its readers, while preserving the numbers that matter. Useful for making technical material quick to digest without losing what matters.',
    steps: [
        { responsible: Anemone },
        { responsible: Renee, targetStepIndex: 0 },
        { responsible: Claude, targetStepIndex: 0 },
        { responsible: Frida, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const JargonBusters = {
    id: 'jargon-busters',
    name: 'The Jargon Busters',
    title: 'Technical content vulgarisation',
    description:
        'Turns technical content into clear, localized language adapted to a non-technical or international audience, without losing the numbers that matter. Useful for making complex material approachable without losing accuracy.',
    steps: [
        { responsible: Anemone },
        { responsible: Claude, targetStepIndex: 0 },
        { responsible: Max, targetStepIndex: 0 },
        { responsible: Isabella, targetStepIndex: 2 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const HypeSquad = {
    id: 'hype-squad',
    name: 'The Hype Squad',
    title: 'Marketing content production',
    description:
        'Turns raw content into a full package of audience-targeted, persuasive marketing material across channels. Useful for producing SEO-, social- and email-ready copy from a single starting piece.',
    steps: [
        { responsible: Anemone },
        { responsible: Eva, targetStepIndex: 0 },
        { responsible: Olivia, targetStepIndex: 1 },
        { responsible: Isabella, targetStepIndex: 2 },
        { responsible: Lily, targetStepIndex: 3 },
        { responsible: Xavier, targetStepIndex: 3 },
        { responsible: Natalie, targetStepIndex: 3 },
        { responsible: Claire, targetStepIndex: 3 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const BrandArchitects = {
    id: 'brand-architects',
    name: 'The Brand Architects',
    title: 'Design system & UI/UX',
    description:
        'Establishes the typography, color, and component foundations for a product, then applies them to concrete page-level UX and micro-interactions. Useful as the design phase that feeds into a frontend implementation flow like The Pixel Pioneers.',
    steps: [
        { responsible: Iris },
        { responsible: Theo, targetStepIndex: 0 },
        { responsible: Ulyss, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const ShipWrights = {
    id: 'ship-wrights',
    name: 'The Ship Wrights',
    title: 'Infrastructure & deployment',
    description:
        'Designs a scalable system architecture, provisions the cloud infrastructure, deploys the workloads behind a gateway, automates their delivery through a CI/CD pipeline, instruments them for observability, and hands off a running, monitored, released, and documented environment.',
    steps: [
        { responsible: Atlas },
        { responsible: Mounir, targetStepIndex: 0 },
        { responsible: MiloOnGcp, targetStepIndex: 1 },
        { responsible: Nova, targetStepIndex: 2 },
        { responsible: Jake, targetStepIndex: 2 },
        { responsible: Piper, targetStepIndex: 3 },
        { responsible: Otis, targetStepIndex: 5 },
        { responsible: Vince, targetStepIndex: 4 },
        { responsible: Ingrid, targetStepIndex: 6 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const NumberCrunchers = {
    id: 'number-crunchers',
    name: 'The Number Crunchers',
    title: 'Data analysis & machine learning',
    description:
        'Builds the data pipeline, analyzes what it produces for insights, and trains a documented, tested machine learning model informed by those insights. Useful for turning raw data into a shippable predictive model.',
    steps: [
        { responsible: Dana },
        { responsible: Sophie, targetStepIndex: 0 },
        { responsible: Ulrich, targetStepIndex: 1 },
        { responsible: RaphaelPython, targetStepIndex: 2 },
        { responsible: FredPython, targetStepIndex: 2 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const DirectorsCut = {
    id: 'directors-cut',
    name: 'The Directors Cut',
    title: 'Video content production',
    description:
        'Turns an audience strategy into a narratively polished, scripted video with a distribution plan. Useful for producing a YouTube, TikTok, or Reels video ready to ship, from strategy to rollout.',
    steps: [
        { responsible: Eva },
        { responsible: Olivia, targetStepIndex: 0 },
        { responsible: Maya, targetStepIndex: 1 },
        { responsible: Natalie, targetStepIndex: 2 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const PocketPioneers = {
    id: 'pocket-pioneers',
    name: 'The Pocket Pioneers',
    title: 'Mobile feature development',
    description:
        'Carries a mobile feature from analysis to a reviewed, end-to-end-tested, documented implementation handling offline behavior and platform-specific design. Best suited to the React Native default — swap the reviewer if targeting native Swift/Kotlin.',
    steps: [
        { responsible: Sybilla },
        { responsible: Mira, targetStepIndex: 0 },
        { responsible: Kai, targetStepIndex: 1 },
        { responsible: Zarra, targetStepIndex: 2 },
        { responsible: Dex, targetStepIndex: 3 },
        { responsible: Fred, targetStepIndex: 3 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const Fortress = {
    id: 'fortress',
    name: 'The Fortress',
    title: 'Security audit',
    description:
        'Hunts for exploitable vulnerabilities and known breach patterns in existing code, fixes them by order of severity, and backs the fixes with regression tests. Useful as a focused security pass on code that already works functionally.',
    steps: [
        { responsible: Soren },
        { responsible: Kira, targetStepIndex: 0 },
        { responsible: Raphael, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const StressTesters = {
    id: 'stress-testers',
    name: 'The Stress Testers',
    title: 'Performance & reliability hardening',
    description:
        'Load-tests a system to find its breaking point, fixes the bottlenecks, confirms the fix with a second load test, then instruments and documents the system so the fix is both durable and observable going forward. Useful before a launch or traffic spike you need to be confident the system can survive.',
    steps: [
        { responsible: Leo },
        { responsible: Tessa, targetStepIndex: 0 },
        {
            responsible: Leo,
            targetStepIndex: 1,
            task: 'Re-run the same load tests against the optimized system and compare the results with the initial run, confirming each bottleneck is resolved and the performance targets are met.',
        },
        { responsible: Piper, targetStepIndex: 1 },
        { responsible: Ingrid, targetStepIndex: 3 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const MotionPicture = {
    id: 'motion-picture',
    name: 'The Motion Picture',
    title: 'Animation & motion design',
    description:
        'Designs the storyboard and keyframe concept behind a piece of motion, then implements it as smooth, purposeful web animation. Useful for adding polish to an interface or telling a story through movement.',
    steps: [
        { responsible: Elan },
        { responsible: Wren, targetStepIndex: 0 },
        { responsible: Cassian },
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
} satisfies Record<string, Workflow>
