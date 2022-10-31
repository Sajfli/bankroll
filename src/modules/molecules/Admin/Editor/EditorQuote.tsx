import { Handler } from '@/types/editor'

import EditorSimple from './EditorSimple'

const EditorQuote = ({
    handler,
    value,
}: {
    handler: Handler
    value: string
}) => {
    return <EditorSimple handler={handler} label="Cytat" value={value} />
}

export default EditorQuote
