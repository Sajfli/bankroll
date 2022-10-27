import EditorModules from '@/utils/ArticleModules'

export type EditorId = string
export type Modules = typeof EditorModules[number]

export type ContentValueType = {
    type:
        | 'paragraph'
        | 'list'
        | 'quote'
        | 'image'
        | 'rl_image'
        | 'author'
        | 'module'
        | 'file'
    listType?: 'ul' | 'ol'
    value?: string | File
    values?: {
        id: string
        value: string
    }[]
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

export type InitHandlerType = (id: EditorId) => {
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
}

export type RenderValuesWrapperType = {
    children: React.ReactNode
    type: ContentValueType['type']
    id: EditorId
    handleRemoveModal: handleRemoveModalType
    handleRemove: (id: EditorId) => void
    blockType: ContentTypes
}
