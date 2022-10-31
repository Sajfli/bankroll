import EditorSimple, { PropsForEditorSimple } from './EditorSimple'

const EditorAuthor = ({ handler, value }: PropsForEditorSimple) => {
    return (
        <EditorSimple
            handler={handler}
            simpleInput={true}
            label="Autor"
            value={value}
        />
    )
}

export default EditorAuthor
