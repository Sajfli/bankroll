import { ReactSortable } from 'react-sortablejs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import TextArea from '@/modules/atoms/TextArea'
import Button from '@/modules/atoms/Button'

import style from '@/modules/organisms/Admin/Editor/Editor.module.scss'
import * as Editor from '@/types/editor'

type EditorListProps = {
    handler: Editor.Handler
    listType: Editor.ContentValueType['listType']
    values: Editor.ContentValueType['values']
}

const EditorList = ({ handler, listType, values }: EditorListProps) => {
    return (
        <div>
            <b>Lista</b>
            <div>
                <select
                    style={{ marginTop: 10 }}
                    onChange={(e) => {
                        let value = e.target.value
                        if (!['ul', 'ol'].includes(value)) value = 'ul'

                        handler.handleListTypeChange(value as 'ol' | 'ul')
                    }}
                    value={listType || 'ul'}
                >
                    <option value="ol">Numerowana</option>
                    <option value="ul">Punktowana</option>
                </select>
            </div>

            {values && (
                <ReactSortable
                    list={values}
                    setList={handler.handleListOrderChange}
                    className={style.listInputs}
                    handle={`.${style.draggableListElement}`}
                    animation={200}
                    delay={2}
                    delayOnTouchOnly={true}
                    group="lists"
                    forceFallback={true}
                >
                    {values.map(({ value, id: listElementId }) => (
                        <div key={listElementId} className={style.listInput}>
                            <div className={style.listTextArea}>
                                <TextArea
                                    className={style.textarea}
                                    defaultValue={value}
                                    onInput={(e) => {
                                        const value = (
                                            e.target as HTMLTextAreaElement
                                        ).value

                                        handler.handleListChange(
                                            listElementId,
                                            value
                                        )
                                    }}
                                />
                            </div>
                            <div className={style.listIcons}>
                                <FontAwesomeIcon
                                    icon="bars"
                                    className={classNames(
                                        style.icon,
                                        style.draggableListElement
                                    )}
                                />
                                <FontAwesomeIcon
                                    icon="xmark"
                                    className={classNames(
                                        style.icon,
                                        style.removeIcon
                                    )}
                                    onClick={() => {
                                        handler.handleListRemove(listElementId)
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </ReactSortable>
            )}
            <Button
                className={style.listAddButton}
                onClick={() => {
                    handler.handleListAdd()
                }}
            >
                <>
                    Dodaj <FontAwesomeIcon icon="plus" />
                </>
            </Button>
        </div>
    )
}

export default EditorList
