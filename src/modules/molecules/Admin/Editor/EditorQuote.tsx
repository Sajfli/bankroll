import { InitHandlerType, EditorId } from '@/types/editor'

import EditorSimple from './EditorSimple'

const EditorQuote = ({
    id,
    initHandler,
}: {
    id: EditorId
    initHandler: InitHandlerType
}) => {
    return <EditorSimple id={id} initHandler={initHandler} label="Cytat" />
}

export default EditorQuote
