import { ReactSortable } from 'react-sortablejs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import TextArea from '@/modules/atoms/TextArea'
import Button from '@/modules/atoms/Button'

import style from '@/modules/organisms/Admin/Editor/Editor.module.scss'
import * as Editor from '@/types/editor'

type EditorListProps = {
    initHandler: Editor.InitHandlerType
    listType: Editor.ContentValueType['listType']
    values: Editor.ContentValueType['values']
    id: Editor.ContentValueType['id']
}

const EditorList = ({ initHandler, listType, values, id }: EditorListProps) => {
    return (
        <div>
            <b>Lista</b>
            <div>
                <select
                    style={{ marginTop: 10 }}
                    onChange={(e) => {
                        let value = e.target.value
                        if (!['ul', 'ol'].includes(value)) value = 'ul'

                        initHandler(id).handleListTypeChange(
                            value as 'ol' | 'ul'
                        )
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
                    setList={initHandler(id).handleListOrderChange}
                    className={style.listInputs}
                    handle={`.${style.draggableListElement}`}
                    animation={200}
                    delay={2}
                    delayOnTouchOnly={true}
                    group="lists"
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

                                        initHandler(id).handleListChange(
                                            listElementId,
                                            value
                                        )
                                    }}
                                />
                            </div>
                            <div className={style.listIcons}>
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className={classNames(
                                        style.icon,
                                        style.draggableListElement
                                    )}
                                />
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className={classNames(
                                        style.icon,
                                        style.removeIcon
                                    )}
                                    onClick={() => {
                                        initHandler(id).handleListRemove(
                                            listElementId
                                        )
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
                    initHandler(id).handleListAdd()
                }}
            >
                <>
                    Dodaj <FontAwesomeIcon icon={faPlus} />
                </>
            </Button>
        </div>
    )
}

export default EditorList
