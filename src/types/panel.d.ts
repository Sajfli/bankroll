import { Stage, User } from './utils'

export type A_ArticleType = {
    name: string
    requiredStage: Stage
}

export type A_User<isDateParsed extends boolean> = {
    id: string
    displayName: string
    picture: string
    stage: User['stage']
    userRole: User['userRole']
    createdAt: isDateParsed extends true ? Date : string
    updatedAt: isDateParsed extends true ? Date : string
    standardSortIndex: isDateParsed extends true ? number : undefined
}
