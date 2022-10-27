import { Handler } from '@/types/editor'
import FileInput from '../../FileInput'

const EditorImage = ({ handler }: { handler: Handler }) => {
    return <FileInput handleFileChange={handler.handleFileChange} />
}

export default EditorImage
