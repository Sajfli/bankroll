import { ContentTypes, Modules, ValueTypes } from './article'

export type EditorId = string

export type ContentValueType = {
    type: ValueTypes | 'image'
    listType?: 'ul' | 'ol'
    value?: string | File
    alreadyUploaded?: boolean
    values?: {
        id: EditorId
        value: string
    }[]
    leftRight?: {
        left: ContentValueType[]
        right: ContentTypeType[]
    }
    moduleName?: Modules | null
    id: EditorId
}

export type ContentType = {
    type: ContentTypes
    header?: string
    value: ContentValueType[]
    id: EditorId
}

export type EditorArticle = {
    title: string
    name: string
    requiredStage: Stage
    content: ContentType[]
}

export type HandleRemoveModalType = (
    whatToRemove: string,
    remove: () => void
) => void

export type Handler = {
    handleParagraphChange: (val: string) => void
    handleListChange: (id: EditorId, val: string) => void
    handleListTypeChange: (type: 'ul' | 'ol') => void
    handleListOrderChange: (
        newOrder: {
            id: string
            value: string
        }[]
    ) => void
    handleListRemove: (id: EditorId) => void
    handleListAdd: () => void
    handleModuleSelect: (module: Modules) => void
    handleFileChange: (file: File) => void
    handleRlAdd: (
        side: 'left' | 'right',
        type: EditorId.ContentValueType['type']
    ) => void
    handleRlOrderChange: (
        side: 'left' | 'right',
        newState: ContentValueType[]
    ) => void
    handleFileCaptionChange: (id: string, value: string) => void
}

export type Rl = {
    side: 'right' | 'left'
    i: number
}

export type InitHandlerType = (id: EditorId, rl?: Rl) => Handler

export type RenderValuesWrapperType = {
    children: React.ReactNode
    type: ContentValueType['type']
    id: EditorId
    handleRemoveModal: handleRemoveModalType
    handleRemove: (id: EditorId) => void
    blockType: ContentTypes
    customGrabHandle?: string
    rlId: Id
}
