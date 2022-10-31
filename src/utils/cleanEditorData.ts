import * as Editor from '@/types/editor'

const cleanData = (
    data: Editor.ContentValueType[],
    imagesCount: number = 0,
    allowRl: boolean = false
) => {
    const cleaned: Editor.ContentValueType[] = []
    var files: File[] = []

    data.forEach((value) => {
        if (
            !(
                ((value.type === 'module' && !value.moduleName) ||
                    (value.type === 'list' && !value.values)) &&
                !value.value
            )
        ) {
            if (value.type === 'module')
                cleaned.push({
                    id: value.id,
                    type: 'module',
                    moduleName: value.moduleName,
                })
            else if (value.type === 'list')
                cleaned.push({
                    id: value.id,
                    type: 'list',
                    values: value.values,
                })
            else if (value.type === 'image' || value.type === 'file') {
                console.info(value.alreadyUploaded ? 'tak' : 'nie')
                if (value.alreadyUploaded) {
                    cleaned.push({
                        id: value.id,
                        type: 'file',
                        alreadyUploaded: true,
                        value: value.value,
                        values: value.values,
                    })
                } else {
                    files.push(value.value as File)
                    cleaned.push({
                        id: value.id,
                        type: 'file',
                        value: `file_${imagesCount}`,
                        values: value.values,
                    })
                    imagesCount++
                }
            } else if (value.type === 'rl') {
                if (value.leftRight && allowRl) {
                    const { values: left, files: files1 } = cleanData(
                        value.leftRight.left,
                        imagesCount
                    )

                    imagesCount += files1.length

                    const { values: right, files: files2 } = cleanData(
                        value.leftRight.right,
                        imagesCount
                    )

                    imagesCount += files2.length

                    files = [...files, ...files1, ...files2]

                    cleaned.push({
                        id: value.id,
                        type: 'rl',
                        leftRight: {
                            left,
                            right,
                        },
                    })
                }
            } else
                cleaned.push({
                    id: value.id,
                    type: value.type,
                    value: value.value,
                })
        }
    })

    return { values: cleaned, files }
}

const cleanEditorData = (data: Editor.ContentType) => {
    const cleaned: Editor.ContentType = {
        id: data.id,
        type: data.type,
        value: [],
    }
    if (data.header) cleaned.header = data.header

    const { values, files } = cleanData(data.value, 0, true)

    cleaned.value = values

    return { cleaned, files }
}

export default cleanEditorData
