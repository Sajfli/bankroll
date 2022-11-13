import EditorModules from '@/utils/ArticleModules'
import { Stage } from './utils'

export type Modules = typeof EditorModules[number]

export type ValueTypes =
    | 'paragraph'
    | 'list'
    | 'quote'
    | 'rl'
    | 'author'
    | 'module'
    | 'file'
    | 'youtube'

export type ContentTypes = 'part' | 'blockquote' | 'module'

export type ArticleContentValue = {
    _id: string
    leftRight?: {
        left: ArticleContentValue[]
        right: ArticleContentValue[]
    }
    value?: string
    values?: {
        _id: string
        value: string
    }[]
    listType: 'ul' | 'ol'
    moduleName?: Modules | null
    type: ValueTypes
}

export type ArticleContent = {
    value: ArticleContentValue[]
    header?: string
    _id: string
    type: ContentTypes
}

export interface Article {
    _id: string
    name: string
    title: string
    content: ArticleContent[]
    requiredStage: Stage
}
