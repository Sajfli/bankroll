import { InitHandlerType, EditorId } from '@/types/editor'

import EditorSimple from './EditorSimple'

const EditorAuthor = ({
    id,
    initHandler,
}: {
    id: EditorId
    initHandler: InitHandlerType
}) => {
    return (
        <EditorSimple
            id={id}
            initHandler={initHandler}
            simpleInput={true}
            label="Autor"
        />
    )
}

export default EditorAuthor
