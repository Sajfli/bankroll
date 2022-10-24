export type EditorId = string

export type ContentValueType = {
    type: 'paragraph' | 'list' | 'quote' | 'author'
    listType?: 'ul' | 'ol'
    value?: string
    values?: {
        id: string
        value: string
    }[]
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
}

export type RenderValuesWrapperType = {
    children: React.ReactNode
    type: ContentValueType['type']
    id: EditorId
    handleRemoveModal: handleRemoveModalType
    handleRemove: (id: EditorId) => void
    blockType: ContentTypes
}
