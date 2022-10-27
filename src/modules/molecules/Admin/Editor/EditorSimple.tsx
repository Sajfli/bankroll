import style from '@/modules/organisms/Admin/Editor/Editor.module.scss'
import TextArea from '@/modules/atoms/TextArea'

import { Handler } from '@/types/editor'

const EditorSimple = ({
    handler,
    label,
    simpleInput,
}: {
    handler: Handler
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

                            handler.handleParagraphChange(target.value)
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
