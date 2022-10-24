import style from '@/modules/organisms/Admin/Editor/Editor.module.scss'
import TextArea from '@/modules/atoms/TextArea'

import { InitHandlerType, EditorId } from '@/types/editor'

const EditorSimple = ({
    id,
    initHandler,
    label,
    simpleInput,
}: {
    id: EditorId
    initHandler: InitHandlerType
    label: string
    simpleInput?: boolean
}) => {
    return (
        <div>
            <b>{label}</b>
            <div>
                {
                    <TextArea
                        className={style.input}
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement

                            initHandler(id).handleParagraphChange(target.value)
                        }}
                        rows={simpleInput ? 1 : undefined}
                        style={
                            simpleInput
                                ? {
                                      resize: 'none',
                                      height: 40,
                                  }
                                : undefined
                        }
                    />
                }
            </div>
        </div>
    )
}

export default EditorSimple
