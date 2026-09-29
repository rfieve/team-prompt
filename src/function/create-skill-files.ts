import { PromptOption, TeamMember, Workflow } from 'src/types'

import { toTeamMemberSkillName, toWorkflowSkillName } from './create-skill-frontmatter'
import { createTeamMemberSkill } from './create-team-member-skill'
import { createWorkflowSkill } from './create-workflow-skill'
import { tryFindTeamMember } from './find-team-member'

export type SkillFile = {
    /**
     * The `SKILL.md` content.
     */
    content : string;

    /**
     * The file path, relative to the skills directory: `{skill name}/SKILL.md`.
     */
    path : string;
}

function toSkillFile(skillName: string, content: string): SkillFile {
    return { content, path: `${skillName}/SKILL.md` }
}

/**
 * Renders a team member skill as a file to write into a skills directory.
 */
export function createTeamMemberSkillFile(teamMember: TeamMember): SkillFile {
    return toSkillFile(toTeamMemberSkillName(teamMember.id), createTeamMemberSkill(teamMember))
}

/**
 * Renders a workflow skill along with every skill it relies on, as files to write into a
 * skills directory: the workflow skill, then the skill of each step's responsible team
 * member, then the skill of each built-in potential replacement.
 *
 * A step's team member is rendered as given, so a `TeamMemberBuilder` override changes the
 * default its skill proposes. Replacements that are not built-in team members are skipped:
 * the workflow skill treats replacement skills as optional.
 *
 * @param workflow - the workflow to render
 * @param options - the same options as `createWorkflowSkill`
 * @returns one file per skill, without duplicates
 */
export function createWorkflowSkillFiles(workflow: Workflow, options: PromptOption = {}): SkillFile[] {
    const mainMembers        = workflow.steps.map(({ responsible }) => responsible)
    const replacementMembers = mainMembers.reduce<TeamMember[]>(
        (members, { potentialReplacements }) =>
            members.concat(
                (potentialReplacements ?? [])
                    .map(({ id }) => tryFindTeamMember(id))
                    .filter((member): member is TeamMember => member !== undefined)
            ),
        []
    )

    // The first occurrence of an id wins, so a step's own team member beats its built-in copy.
    const membersById = new Map<string, TeamMember>()

    for (const member of [...mainMembers, ...replacementMembers]) {
        if (!membersById.has(member.id)) {
            membersById.set(member.id, member)
        }
    }

    return [
        toSkillFile(toWorkflowSkillName(workflow.id), createWorkflowSkill(workflow, options)),
        ...Array.from(membersById.values(), (member) => createTeamMemberSkillFile(member)),
    ]
}
