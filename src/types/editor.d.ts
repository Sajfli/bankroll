import EditorModules from '@/utils/ArticleModules'

export type EditorId = string
export type Modules = typeof EditorModules[number]

export type ContentValueType = {
    type:
        | 'paragraph'
        | 'list'
        | 'quote'
        | 'image'
        | 'rl'
        | 'author'
        | 'module'
        | 'file'
    listType?: 'ul' | 'ol'
    value?: string | File
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

export type ContentTypes = 'part' | 'blockquote' | 'module'

export type ContentType = {
    type: ContentTypes
    header?: string
    value: ContentValueType[]
    id: EditorId
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
