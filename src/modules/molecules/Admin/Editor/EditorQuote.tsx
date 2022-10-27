import { Handler } from '@/types/editor'

import EditorSimple from './EditorSimple'

const EditorQuote = ({ handler }: { handler: Handler }) => {
    return <EditorSimple handler={handler} label="Cytat" />
}

export default EditorQuote
