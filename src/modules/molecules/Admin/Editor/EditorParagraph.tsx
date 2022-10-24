import style from '@/modules/organisms/Admin/Editor/Editor.module.scss'
import TextArea from '@/modules/atoms/TextArea'

import { InitHandlerType } from '@/types/editor'

const EditorParagraph = ({
    id,
    initHandler,
}: {
    id: string
    initHandler: InitHandlerType
}) => {
    return (
        <div>
            <b>Paragraf</b>
            <div>
                <TextArea
                    className={style.input}
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement

                        initHandler(id).handleParagraphChange(target.value)
                    }}
                ></TextArea>
            </div>
        </div>
    )
}

export default EditorParagraph
