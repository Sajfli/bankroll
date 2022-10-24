export type ContentValueType = {
    type: 'paragraph' | 'list' | 'quote'
    listType?: 'ul' | 'ol'
    value?: string
    values?: {
        id: string
        value: string
    }[]
    id: string
}

export type ContentTypes = 'part' | 'quote' | 'blockquote' | 'module'

export type ContentType = {
    type: ContentTypes
    header?: string
    value: ContentValueType[]
    id: string
}

export type HandleRemoveModalType = (
    whatToRemove: string,
    remove: () => void
) => void

export type InitHandlerType = (id: string) => {
    handleParagraphChange: (val: string) => void
    handleListChange: (id: string, val: string) => void
    handleListTypeChange: (type: 'ul' | 'ol') => void
    handleListOrderChange: (
        newOrder: {
            id: string
            value: string
        }[]
    ) => void
    handleListRemove: (id: string) => void
    handleListAdd: () => void
}

export type RenderValuesWrapperType = {
    children: React.ReactNode
    type: ContentValueType['type']
    id: string
    handleRemoveModal: handleRemoveModalType
    handleRemove: (id: string) => void
}
