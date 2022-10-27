import * as Editor from '@/types/editor'

const cleanEditorData = (data: Editor.ContentType) => {
    const cleaned: Editor.ContentType = {
        id: data.id,
        type: data.type,
        value: [],
    }
    const files: File[] = []
    if (data.header) cleaned.header = data.header

    data.value.forEach((value) => {
        if (
            !(
                ((value.type === 'module' && !value.moduleName) ||
                    (value.type === 'list' && !value.values)) &&
                !value.value
            )
        ) {
            if (value.type === 'module')
                cleaned.value.push({
                    id: value.id,
                    type: 'module',
                    moduleName: value.moduleName,
                })
            else if (value.type === 'list')
                cleaned.value.push({
                    id: value.id,
                    type: 'list',
                    values: value.values,
                })
            else if (value.type === 'image') {
                files.push(value.value as File)
                cleaned.value.push({
                    id: value.id,
                    type: 'file',
                    value: `file_${files.length - 1}`,
                })
            } else
                cleaned.value.push({
                    id: value.id,
                    type: value.type,
                    value: value.value,
                })
        }
    })

    return { cleaned, files }
}

export default cleanEditorData
