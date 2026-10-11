import { TeamMemberBuilder } from 'src/class/team-member-builder'
import { Workflow } from 'src/types'

import {
    Ada,
    Alexandra,
    Anemone,
    Anya,
    Aria,
    Atlas,
    Bastian,
    Bruno,
    Cassian,
    Celeste,
    Claire,
    Claude,
    Cora,
    Dana,
    Dante,
    Dex,
    Duncan,
    Edith,
    Elan,
    Emil,
    Ernest,
    Eva,
    Faye,
    Felix,
    Fred,
    Frida,
    Gaspard,
    Greta,
    Gustav,
    Hazel,
    Hugo,
    Ines,
    Ingrid,
    Iris,
    Isabella,
    Ivan,
    Jake,
    Jonas,
    Juno,
    Kai,
    Kenji,
    Kira,
    Lena,
    Leo,
    Lily,
    Linus,
    Lyra,
    Magnus,
    Marcus,
    Margot,
    Marie,
    Mark,
    Marlowe,
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
    Octavia,
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
    Silas,
    Simone,
    Sophia,
    Sophie,
    Soren,
    Sybilla,
    Tessa,
    Thea,
    Theo,
    Ulrich,
    Ulyss,
    Vera,
    Vikram,
    Vince,
    Wren,
    Xavier,
    Zarra,
    Zoe,
} from './team-members'

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
        { responsible: Sybilla },
        { responsible: Priya, targetStepIndex: 0 },
        { responsible: Ouria, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const CodeSlingersUnited = {
    id    : 'code-slingers-united',
    name  : 'The Code Slingers United',
    title : 'Backend feature development',
    description :
        'Carries a backend feature all the way from data modeling to a documented, tested, reviewed, security-audited, and released implementation. Useful for shipping production-ready APIs and business logic without cutting corners.',
    steps : [
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
    id    : 'pixel-pioneers',
    name  : 'The Pixel Pioneers',
    title : 'Frontend feature development',
    description :
        'Carries a frontend feature all the way from accessible markup to a polished, reviewed, unit- and end-to-end-tested, released UI. Useful for shipping production-ready interfaces without cutting corners on accessibility or quality.',
    steps : [
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
    id    : 'nitpicking-squadron',
    name  : 'The Nitpicking Squadron',
    title : 'Frontend code review',
    description :
        'Hardens existing frontend code by reviewing it, documenting it, and backing it with unit tests. Useful for raising the quality and maintainability of a user interface before it ships.',
    steps : [
        { responsible: Zarra },
        { responsible: Fred, targetStepIndex: 0 },
        { responsible: Raphael, targetStepIndex: 0 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const QueryInquisitors = {
    id    : 'query-inquisitors',
    name  : 'The Query Inquisitors',
    title : 'Backend code review',
    description :
        'Hardens existing backend code by reviewing its layering, data access, and error handling, documenting it, and backing it with unit tests. Useful for raising the quality and maintainability of an API or service before it ships.',
    steps : [
        { responsible: Bastian },
        { responsible: Fred, targetStepIndex: 0 },
        { responsible: Raphael, targetStepIndex: 0 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const Renovators = {
    id    : 'renovators',
    name  : 'The Renovators',
    title : 'Refactoring',
    description :
        'Restructures an existing codebase into a clean, layered architecture, then refactors its internals with proven design patterns while preserving behavior, backed by unit tests and documentation. Useful for paying down technical debt before it slows down new features.',
    steps : [
        { responsible: Reid },
        { responsible: Rowan, targetStepIndex: 0 },
        { responsible: Raphael, targetStepIndex: 1 },
        { responsible: Fred, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const ShortOnes = {
    id    : 'short-ones',
    name  : 'The Short Ones',
    title : 'Content summarization',
    description :
        'Distills long or dense technical content into a clear, structured summary tailored to its readers, while preserving the numbers that matter. Useful for making technical material quick to digest without losing what matters.',
    steps : [
        { responsible: Anemone },
        { responsible: Renee, targetStepIndex: 0 },
        { responsible: Claude, targetStepIndex: 0 },
        { responsible: Frida, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const JargonBusters = {
    id    : 'jargon-busters',
    name  : 'The Jargon Busters',
    title : 'Technical content vulgarisation',
    description :
        'Turns technical content into clear, localized language adapted to a non-technical or international audience, without losing the numbers that matter. Useful for making complex material approachable without losing accuracy.',
    steps : [
        { responsible: Anemone },
        { responsible: Claude, targetStepIndex: 0 },
        { responsible: Max, targetStepIndex: 0 },
        { responsible: Isabella, targetStepIndex: 2 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const HypeSquad = {
    id    : 'hype-squad',
    name  : 'The Hype Squad',
    title : 'Marketing content production',
    description :
        'Turns raw content into a full package of audience-targeted, persuasive marketing material across channels. Useful for producing SEO-, social- and email-ready copy from a single starting piece.',
    steps : [
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
    id    : 'brand-architects',
    name  : 'The Brand Architects',
    title : 'Design system & UI/UX',
    description :
        'Establishes the typography, color, and component foundations for a product, then applies them to concrete page-level UX and micro-interactions. Useful as the design phase that feeds into a frontend implementation flow like The Pixel Pioneers.',
    steps : [
        { responsible: Iris },
        { responsible: Theo, targetStepIndex: 0 },
        { responsible: Ulyss, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const ShipWrights = {
    id    : 'ship-wrights',
    name  : 'The Ship Wrights',
    title : 'Infrastructure & deployment',
    description :
        'Designs a scalable system architecture, provisions the cloud infrastructure, deploys the workloads behind a gateway, automates their delivery through a CI/CD pipeline, instruments them for observability, and hands off a running, monitored, released, and documented environment.',
    steps : [
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
    id    : 'number-crunchers',
    name  : 'The Number Crunchers',
    title : 'Data analysis & machine learning',
    description :
        'Builds the data pipeline, analyzes what it produces for insights, and trains a documented, tested machine learning model informed by those insights. Useful for turning raw data into a shippable predictive model.',
    steps : [
        { responsible: Dana },
        { responsible: Sophie, targetStepIndex: 0 },
        { responsible: Ulrich, targetStepIndex: 1 },
        { responsible: RaphaelPython, targetStepIndex: 2 },
        { responsible: FredPython, targetStepIndex: 2 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const DirectorsCut = {
    id    : 'directors-cut',
    name  : 'The Directors Cut',
    title : 'Video content production',
    description :
        'Turns an audience strategy into a narratively polished, scripted, and programmatically rendered video with a distribution plan. Useful for producing a YouTube, TikTok, or Reels video ready to ship, from strategy to rollout.',
    steps : [
        { responsible: Eva },
        { responsible: Olivia, targetStepIndex: 0 },
        { responsible: Maya, targetStepIndex: 1 },
        {
            responsible     : Celeste,
            targetStepIndex : 2,
            task            : 'Build the video programmatically from the script and storyboard: the compositions, timing, captions, and any data-driven scenes, then render it to a shippable video file.',
        },
        { responsible: Natalie, targetStepIndex: 3 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const PocketPioneers = {
    id    : 'pocket-pioneers',
    name  : 'The Pocket Pioneers',
    title : 'Mobile feature development',
    description :
        'Carries a mobile feature from analysis to a reviewed, end-to-end-tested, documented implementation handling offline behavior and platform-specific design. Best suited to the React Native default — swap the reviewer if targeting native Swift/Kotlin.',
    steps : [
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
    id    : 'fortress',
    name  : 'The Fortress',
    title : 'Security audit',
    description :
        'Hunts for exploitable vulnerabilities and known breach patterns in existing code, fixes them by order of severity, and backs the fixes with regression tests. Useful as a focused security pass on code that already works functionally.',
    steps : [
        { responsible: Soren },
        { responsible: Kira, targetStepIndex: 0 },
        { responsible: Raphael, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const StressTesters = {
    id    : 'stress-testers',
    name  : 'The Stress Testers',
    title : 'Performance & reliability hardening',
    description :
        'Load-tests a system to find its breaking point, fixes the bottlenecks, confirms the fix with a second load test, then instruments and documents the system so the fix is both durable and observable going forward. Useful before a launch or traffic spike you need to be confident the system can survive.',
    steps : [
        { responsible: Leo },
        { responsible: Tessa, targetStepIndex: 0 },
        {
            responsible     : Leo,
            targetStepIndex : 1,
            task            : 'Re-run the same load tests against the optimized system and compare the results with the initial run, confirming each bottleneck is resolved and the performance targets are met.',
        },
        { responsible: Piper, targetStepIndex: 1 },
        { responsible: Ingrid, targetStepIndex: 3 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const MotionPicture = {
    id    : 'motion-picture',
    name  : 'The Motion Picture',
    title : 'Animation & motion design',
    description :
        'Designs the storyboard and keyframe concept behind a piece of motion, then implements it as smooth, purposeful web animation. Useful for adding polish to an interface or telling a story through movement.',
    steps : [
        { responsible: Elan },
        { responsible: Wren, targetStepIndex: 0 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const BugHunters = {
    id    : 'bug-hunters',
    name  : 'The Bug Hunters',
    title : 'Bug fixing',
    description :
        'Reproduces a reported bug as a failing test, traces it to its root cause, fixes it everywhere it applies, hardens the fix with edge-case tests, and writes a blameless postmortem. Useful for fixing a bug for good instead of patching its symptom.',
    steps : [
        { responsible: Remy },
        { responsible: Vera, targetStepIndex: 0 },
        { responsible: Felix, targetStepIndex: 1 },
        {
            responsible     : Raphael,
            targetStepIndex : 2,
            task            : 'Add unit tests for the edge cases surrounding the fix, next to the reproduction test, so that neighboring variants of the bug are caught too.',
        },
        {
            responsible     : Ingrid,
            targetStepIndex : 2,
            task            : 'Write a blameless postmortem of the bug: its impact, timeline, root cause, the fix, and the follow-up actions that would prevent this class of defect from happening again.',
        },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const FullStackers = {
    id    : 'full-stackers',
    name  : 'The Full Stackers',
    title : 'Full-stack feature development',
    description :
        'Carries a feature across the whole stack, from a spec checked for gaps before any code is written, through data modeling and a documented API contract, to the accessible UI that consumes it, reviewed on both sides, tested end to end, and released. Useful when a feature needs backend and frontend changes designed together.',
    steps : [
        { responsible: Sybilla },
        { responsible: Mira, targetStepIndex: 0 },
        { responsible: Dante, targetStepIndex: 1 },
        { responsible: Juno, targetStepIndex: 1 },
        { responsible: Ernest, targetStepIndex: 1 },
        { responsible: Alexandra, targetStepIndex: 4 },
        { responsible: Hugo, targetStepIndex: 5 },
        { responsible: Sophia, targetStepIndex: 1 },
        { responsible: Marcus, targetStepIndex: 7 },
        { responsible: Mark, targetStepIndex: 6 },
        { responsible: Bastian, targetStepIndex: 5 },
        { responsible: Zarra, targetStepIndex: 9 },
        { responsible: Raphael, targetStepIndex: 10 },
        { responsible: Quinn, targetStepIndex: 11 },
        { responsible: Vince, targetStepIndex: 13 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const Upgraders = {
    id    : 'upgraders',
    name  : 'The Upgraders',
    title : 'Dependency & framework upgrade',
    description :
        'Upgrades a dependency or framework across breaking versions, from reading the migration guides to a migrated, tested codebase with a rollout and rollback plan. Useful for major version upgrades that are too risky to do blindly.',
    steps : [
        { responsible: Nico },
        { responsible: Bruno, targetStepIndex: 0 },
        {
            responsible     : Raphael,
            targetStepIndex : 1,
            task            : 'Run the existing test suite against the upgraded codebase, fix the tests broken by legitimate API changes, and add tests for the behaviors most at risk from the breaking changes listed in the upgrade plan.',
        },
        { responsible: Quinn, targetStepIndex: 1 },
        { responsible: Vince, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const ComplianceOffice = {
    id    : 'compliance-office',
    name  : 'The Compliance Office',
    title : 'Privacy & compliance',
    description :
        'Maps how a system handles personal data, assesses it against privacy regulations and security best practices, and drafts the legal documents needed to close the gaps. Useful before a launch in a new market or ahead of a privacy audit.',
    steps : [
        { responsible: Lena },
        { responsible: Petra, targetStepIndex: 0 },
        { responsible: Soren, targetStepIndex: 0 },
        {
            responsible     : Aria,
            targetStepIndex : 1,
            task            : 'Draft the privacy policy and data processing agreement language needed to address the compliance gaps identified, flagging the points that require a business decision, while noting this is not a substitute for advice from a licensed attorney.',
        },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const Showrunners = {
    id    : 'showrunners',
    name  : 'The Showrunners',
    title : 'Immersive landing page',
    description :
        'Designs and builds a striking landing page with a 3D scene and purposeful motion, wrapped in accessible markup and optimized to stay fast on mid-range devices. Useful for product launches and showcases where the first impression matters.',
    steps : [
        { responsible: Iris },
        { responsible: Ulyss, targetStepIndex: 0 },
        { responsible: Sasha, targetStepIndex: 1 },
        { responsible: Wren, targetStepIndex: 1 },
        { responsible: Sophia, targetStepIndex: 1 },
        { responsible: Jonas, targetStepIndex: 4 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const Inclusionists = {
    id    : 'inclusionists',
    name  : 'The Inclusionists',
    title : 'Accessibility audit',
    description :
        'Audits an interface the way people with disabilities use it, fixes the issues by severity, and adds automated checks so they do not come back. Useful for meeting accessibility standards and legal requirements such as the European Accessibility Act.',
    steps : [
        { responsible: Ada },
        { responsible: Emil, targetStepIndex: 0 },
        {
            responsible     : Quinn,
            targetStepIndex : 1,
            task            : 'Add automated accessibility checks with axe-core to the end-to-end test suite, covering the critical user journeys and the pages fixed in the previous step, so that accessibility regressions fail the build.',
        },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const Heralds = {
    id    : 'heralds',
    name  : 'The Heralds',
    title : 'Release notes & announcement',
    description :
        'Turns commits and diffs into a structured changelog, rewrites it for end users, and announces the release on social media and by email. Useful for shipping release notes that people actually read.',
    steps : [
        { responsible: Hazel },
        { responsible: Max, targetStepIndex: 0 },
        { responsible: Natalie, targetStepIndex: 1 },
        { responsible: Claire, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const Cartographers = {
    id    : 'cartographers',
    name  : 'The Cartographers',
    title : 'Codebase documentation',
    description :
        'Maps an existing codebase and documents it at every level: architecture, code, API, operations, and a first-day onboarding guide. Useful for bringing an undocumented project up to date or preparing it for new contributors.',
    steps : [
        { responsible: Mateo },
        {
            responsible     : Atlas,
            targetStepIndex : 0,
            task            : 'Document the existing architecture as architecture decision records: the main components and their boundaries, the key technology choices, and the tradeoffs they imply, inferring the reasoning from the code where it was never written down.',
        },
        { responsible: Fred, targetStepIndex: 0 },
        { responsible: Hugo, targetStepIndex: 0 },
        { responsible: Ingrid, targetStepIndex: 0 },
        { responsible: Nina, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const RedTeam = {
    id    : 'red-team',
    name  : 'The Red Team',
    title : 'Security assessment',
    description :
        'Threat models a running system, attacks it within an authorized scope to prove which threats are real, fixes what was found, backs the fixes with regression tests, and adds pipeline gates so the same flaws cannot ship again. Useful before a major launch, after a significant architecture change, or when a customer asks for a penetration test report.',
    steps : [
        { responsible: Magnus },
        { responsible: Zoe, targetStepIndex: 0 },
        { responsible: Kira, targetStepIndex: 1 },
        {
            responsible     : Raphael,
            targetStepIndex : 2,
            task            : 'Turn each confirmed finding from the penetration test into a regression test that reproduces the attack and passes now that it is fixed, so that the vulnerability cannot silently come back.',
        },
        { responsible: Silas, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const PaperTrail = {
    id    : 'paper-trail',
    name  : 'The Paper Trail',
    title : 'Security certification readiness',
    description :
        'Prepares an organization for a security certification or regulation such as SOC 2 or ISO 27001: maps the controls and their gaps, closes the technical ones in access control and the delivery pipeline, and writes the policies and procedures an auditor will ask for. Useful months before a first audit, or when a customer deal depends on one.',
    steps : [
        { responsible: Greta },
        { responsible: Magnus, targetStepIndex: 0 },
        {
            responsible     : Ivan,
            targetStepIndex : 0,
            task            : 'Close the access control gaps from the assessment: enforce multi-factor authentication and single sign-on for every internal tool, apply least privilege to every role, remove dormant accounts, and set up a periodic access review whose results are kept as audit evidence.',
        },
        {
            responsible     : Silas,
            targetStepIndex : 0,
            task            : 'Close the change management and vulnerability management gaps from the assessment: require reviewed pull requests and passing security scans before any deployment, and export the scan results and approvals automatically as audit evidence.',
        },
        {
            responsible     : Ingrid,
            targetStepIndex : 0,
            task            : 'Write the policies and procedures the assessment found missing (information security, access control, change management, incident response, business continuity, vendor management), each with its owner, its review cadence, and the evidence that proves it is followed.',
        },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const FunnelSurgeons = {
    id    : 'funnel-surgeons',
    name  : 'The Funnel Surgeons',
    title : 'Conversion optimization',
    description :
        'Instruments a funnel so its drop-offs are measured, audits it for friction, rewrites the copy of the most promising variants, and validates the winners with statistically sound A/B tests. Useful when traffic is there but signups, activations, or purchases are not.',
    steps : [
        { responsible: Anya },
        { responsible: Cora, targetStepIndex: 0 },
        { responsible: Lily, targetStepIndex: 1 },
        {
            responsible     : Sophie,
            targetStepIndex : 1,
            task            : 'Analyze the results of the A/B tests once they reach their planned sample size: the effect on the primary metric with its confidence interval, the guardrail metrics, and the segments that behaved differently, then recommend whether to ship, iterate, or drop each variant.',
        },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const Rainmakers = {
    id    : 'rainmakers',
    name  : 'The Rainmakers',
    title : 'Go-to-market launch',
    description :
        'Takes a product to market: sizes the opportunity, positions it against its alternatives, prices it on the value it delivers, instruments the funnel, makes the site findable in search, and launches paid campaigns with a sustainable cost per acquisition. Useful for launching a new product, or entering a new market with an existing one.',
    steps : [
        { responsible: Margot },
        { responsible: Marlowe, targetStepIndex: 0 },
        { responsible: Octavia, targetStepIndex: 1 },
        { responsible: Anya, targetStepIndex: 2 },
        { responsible: Gaspard, targetStepIndex: 1 },
        { responsible: Duncan, targetStepIndex: 3 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const AgentSmiths = {
    id    : 'agent-smiths',
    name  : 'The Agent Smiths',
    title : 'AI agent development',
    description :
        'Builds an AI agent from a spec checked for gaps: its tools and guardrails, its prompts, a threat model against prompt injection and tool misuse, and an evaluation suite that measures it on every change. Useful for shipping an agent that acts on real systems without acting out.',
    steps : [
        { responsible: Mira },
        { responsible: Dante, targetStepIndex: 0 },
        { responsible: Kenji, targetStepIndex: 0 },
        { responsible: Lyra, targetStepIndex: 2 },
        {
            responsible     : Magnus,
            targetStepIndex : 2,
            task            : 'Threat model the agent: treat every tool, every retrieved document, and every user input as an entry point, then enumerate the abuse paths through prompt injection, tool misuse, data exfiltration, and excessive autonomy, following the OWASP Top 10 for LLM Applications, and recommend a mitigation for each.',
        },
        { responsible: Edith, targetStepIndex: 3 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const FineTuners = {
    id    : 'fine-tuners',
    name  : 'The Fine Tuners',
    title : 'LLM fine-tuning',
    description :
        'Builds the training dataset, fine-tunes an open-weight model on it, serves it for inference, and proves with an evaluation suite that the tuned model beats a well-prompted baseline. Useful when prompting and retrieval are not enough for a narrow, high-volume task.',
    steps : [
        {
            responsible : Dana,
            task        : 'Build the pipeline that produces the fine-tuning dataset: collect the examples from the required sources, clean and deduplicate them, remove personal data, and split them into training and held-out evaluation sets with no overlap.',
        },
        { responsible: Ines, targetStepIndex: 0 },
        {
            responsible     : Vikram,
            targetStepIndex : 1,
            task            : 'Serve the fine-tuned model for inference: choose and configure the serving engine and quantization, size it for the expected load, expose an OpenAI-compatible endpoint, and load-test it to confirm its latency and throughput.',
        },
        { responsible: Edith, targetStepIndex: 1 },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const PennyPinchers = {
    id    : 'penny-pinchers',
    name  : 'The Penny Pinchers',
    title : 'Cloud cost optimization',
    description :
        'Attributes every cloud cost to its owner, finds the waste, applies the savings in the infrastructure code, and keeps the bill visible with dashboards and budget alerts. Useful when the cloud bill grows faster than the business.',
    steps : [
        { responsible: Faye },
        {
            responsible     : Mounir,
            targetStepIndex : 0,
            task            : 'Apply the cost recommendations in the infrastructure code, highest savings first: add the missing cost labels, rightsize or remove the idle and oversized resources, add storage lifecycle policies, and move eligible workloads to commitments or spot capacity, keeping each change reviewable and reversible.',
        },
        {
            responsible     : Piper,
            targetStepIndex : 1,
            task            : 'Build the cost dashboards by team, product, and environment, and alerts on budgets and on spending anomalies, then confirm that the optimized resources still meet their reliability targets.',
        },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const TestLab = {
    id    : 'test-lab',
    name  : 'The Test Lab',
    title : 'Test strategy & coverage',
    description :
        'Turns requirements into a prioritized test plan, then backs it with unit tests and automated end-to-end tests for the critical paths. Useful for building real coverage for a feature or product instead of ad-hoc tests written after the fact.',
    steps : [
        { responsible: Thea },
        {
            responsible     : Raphael,
            targetStepIndex : 0,
            task            : 'Implement unit tests for the functions behind the test cases in the plan, prioritizing the edge and boundary cases it calls out.',
        },
        {
            responsible     : Quinn,
            targetStepIndex : 0,
            task            : 'Automate the critical-path manual test cases from the plan as end-to-end tests, and fold them into the regression suite.',
        },
        { responsible: Cassian },
    ],
} satisfies Workflow

export const GrantLab = {
    id    : 'grant-lab',
    name  : 'The Grant Lab',
    title : 'Research proposal & review',
    description :
        'Turns a research idea into a funded proposal: reviews the literature to frame the gap, designs the study, writes the grant to the funder\'s criteria, and peer-reviews it before submission. Useful for taking a research direction from idea to a submission-ready proposal.',
    steps : [
        { responsible: Linus },
        { responsible: Marie, targetStepIndex: 0 },
        { responsible: Gustav, targetStepIndex: 1 },
        {
            responsible     : Simone,
            targetStepIndex : 2,
            task            : 'Peer-review the draft proposal before submission: assess the aims, the methodology and statistics, and the feasibility, and list the major and minor revisions it needs to be competitive.',
        },
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
    BugHunters,
    FullStackers,
    Upgraders,
    ComplianceOffice,
    Showrunners,
    Inclusionists,
    Heralds,
    Cartographers,
    RedTeam,
    PaperTrail,
    FunnelSurgeons,
    Rainmakers,
    AgentSmiths,
    FineTuners,
    PennyPinchers,
    TestLab,
    GrantLab,
} satisfies Record<string, Workflow>
