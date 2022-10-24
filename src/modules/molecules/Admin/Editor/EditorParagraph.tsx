import { InitHandlerType, EditorId } from '@/types/editor'

import EditorSimple from './EditorSimple'

const EditorParagraph = ({
    id,
    initHandler,
}: {
    id: EditorId
    initHandler: InitHandlerType
}) => {
    return <EditorSimple id={id} initHandler={initHandler} label="Paragraf" />
}

export default EditorParagraph
