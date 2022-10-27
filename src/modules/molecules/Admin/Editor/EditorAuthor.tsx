import { Handler } from '@/types/editor'

import EditorSimple from './EditorSimple'

const EditorAuthor = ({ handler }: { handler: Handler }) => {
    return <EditorSimple handler={handler} simpleInput={true} label="Autor" />
}

export default EditorAuthor
