import { buildTeamMember } from 'src/function/build-team-member'
import {
    TeamMember,
    TeamMemberOption,
    TeamMemberOptionNumber,
    TeamMemberOptionString,
    TeamMemberReplacement,
    TeamMemberTag,
} from 'src/types'

// `string & {}` (not `Record<string, never>`) is the standard "LiteralUnion" idiom: it
// surfaces `TChoice` as autocomplete suggestions while still accepting any other string.
// eslint-disable-next-line @typescript-eslint/ban-types
type LooseAutocomplete<TChoice extends string> = TChoice | (string & {})

type OptionValue<TOption extends TeamMemberOption> = TOption extends TeamMemberOptionString
    ? TOption['from'] extends readonly (infer TChoice extends string)[]
        ? LooseAutocomplete<TChoice>
        : string
    : TOption extends TeamMemberOptionNumber
    ? number
    : never

export class TeamMemberBuilder<TOptions extends Record<string, TeamMemberOption>>
implements TeamMember
{
    id                     : string
    defaultTask            : string
    description            : string
    name                   : string
    options                : TOptions
    potentialReplacements? : TeamMemberReplacement[]
    qualityControl         : string
    qualityControlSteps?   : string[]
    tags                   : TeamMemberTag[]
    title                  : string
    trainingData           : string

    constructor(member: TeamMember & { options: TOptions }) {
        this.id                    = member.id
        this.defaultTask           = member.defaultTask
        this.description           = member.description
        this.name                  = member.name
        this.options               = member.options
        this.potentialReplacements = member.potentialReplacements
        this.qualityControl        = member.qualityControl
        this.qualityControlSteps   = member.qualityControlSteps
        this.tags                  = member.tags
        this.title                 = member.title
        this.trainingData          = member.trainingData
    }

    /**
     * Returns a new builder with `key`'s option value overridden to `value`.
     * This instance and the underlying team member are left untouched.
     *
     * @param key - an option key that exists on this team member
     * @param value - the new value; string options suggest their `from` choices via
     * autocomplete but accept any string, number options accept any number
     */
    setOption<TKey extends keyof TOptions>(
        key: TKey,
        value: OptionValue<TOptions[TKey]>
    ): TeamMemberBuilder<TOptions> {
        return new TeamMemberBuilder({
            ...this,
            options : {
                ...this.options,
                [key] : { ...this.options[key], value },
            },
        })
    }

    /**
     * Resolves every `{{param}}` placeholder in the profile's text fields using the
     * current option values.
     *
     * @returns a plain `TeamMember` object, not a `TeamMemberBuilder` instance
     */
    build(): TeamMember {
        return buildTeamMember(this)
    }

    /**
     * Returns the profile as a plain object, without resolving any `{{param}}`
     * placeholder. Use {@link TeamMemberBuilder.build} to get them substituted instead.
     */
    raw(): TeamMember & { options: TOptions } {
        return { ...this }
    }
}
