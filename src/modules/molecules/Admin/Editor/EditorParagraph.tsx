import EditorSimple, { PropsForEditorSimple } from './EditorSimple'

const EditorParagraph = ({ handler, value }: PropsForEditorSimple) => {
    return <EditorSimple handler={handler} label="Paragraf" value={value} />
}

export default EditorParagraph
