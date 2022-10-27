import { EditorId, InitHandlerType } from '@/types/editor'
import FileInput from '../../FileInput'
import style from './EditorInputs.module.scss'

const EditorImage = ({
    initHandler,
    id,
}: {
    initHandler: InitHandlerType
    id: EditorId
}) => {
    return <FileInput handleFileChange={initHandler(id).handleFileChange} />
}

export default EditorImage
