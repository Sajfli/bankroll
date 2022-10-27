import { Handler } from '@/types/editor'

import EditorSimple from './EditorSimple'

const EditorParagraph = ({ handler }: { handler: Handler }) => {
    return <EditorSimple handler={handler} label="Paragraf" />
}

export default EditorParagraph
