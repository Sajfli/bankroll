import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ReactSortable } from 'react-sortablejs'
import classNames from 'classnames'

import TextArea from '@/modules/atoms/TextArea'
import Button from '@/modules/atoms/Button'

import style from './ArticleEditor.module.scss'

import * as Editor from '@/types/editor'

const RenderValuesWrapper = ({
    children,
    type,
    id,
    handleRemoveModal,
    handleRemove,
}: Editor.RenderValuesWrapperType) => (
    <div className={style.value}>
        <div className={style.inputs}>{children}</div>
        <div className={style.icons}>
            <FontAwesomeIcon
                icon={faXmark}
                className={style.removeIcon}
                onClick={() => {
                    handleRemoveModal(
                        type === 'list' ? 'tę listę' : 'ten paragraf',
                        () => {
                            handleRemove(id)
                        }
                    )
                }}
            />
            <FontAwesomeIcon icon={faBars} className={style.draggable} />
        </div>
    </div>
)

const RenderValues = ({
    type,
    values,
    id,
    listType,
    handleRemoveModal,
    handleRemove,
    initHandler,
}: Editor.ContentValueType & {
    handleRemoveModal: Editor.HandleRemoveModalType
    handleRemove: (id: string) => void
    initHandler: Editor.InitHandlerType
}) => {
    return (
        <RenderValuesWrapper
            type={type}
            id={id}
            handleRemove={handleRemove}
            handleRemoveModal={handleRemoveModal}
        >
            <div className={style.inputs}>
                {type === 'paragraph' ? (
                    <div>
                        <b>Paragraf</b>
                        <div>
                            <TextArea
                                className={style.input}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement

                                    initHandler(id).handleParagraphChange(
                                        target.value
                                    )
                                }}
                            ></TextArea>
                        </div>
                    </div>
                ) : (
                    <div>
                        <b>Lista</b>
                        <div>
                            <select
                                style={{ marginTop: 10 }}
                                onChange={(e) => {
                                    let value = e.target.value
                                    if (!['ul', 'ol'].includes(value))
                                        value = 'ul'

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
                                    <div
                                        key={listElementId}
                                        className={style.listInput}
                                    >
                                        <div className={style.listTextArea}>
                                            <TextArea
                                                className={style.textarea}
                                                defaultValue={value}
                                                onInput={(e) => {
                                                    const value = (
                                                        e.target as HTMLTextAreaElement
                                                    ).value

                                                    initHandler(
                                                        id
                                                    ).handleListChange(
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
                                                    initHandler(
                                                        id
                                                    ).handleListRemove(
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
                )}
            </div>
        </RenderValuesWrapper>
    )
}

export default RenderValues
