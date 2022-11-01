import { Handler, ContentValueType } from '@/types/editor'
import FileInput from '../../FileInput'

const EditorImage = ({
    handler,
    defaultValue,
    caption,
}: {
    handler: Handler
    alreadyUploaded?: ContentValueType['alreadyUploaded']
    defaultValue: ContentValueType['value']
    caption: ContentValueType['values']
}) => {
    return (
        <FileInput
            handleFileChange={handler.handleFileChange}
            handleFileCaptionChange={handler.handleFileCaptionChange}
            defaultValue={defaultValue}
            caption={caption}
        />
    )
}

export default EditorImage
