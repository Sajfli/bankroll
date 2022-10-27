import classNames from 'classnames'
import { ReactSortable } from 'react-sortablejs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import genKey from '@/utils/genKey'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'
import Button from '@/modules/atoms/Button'
import TextInput from '@/modules/atoms/TextInput'

import RenderValues from './EditorRenderValues'

import style from './Editor.module.scss'
import * as Editor from '@/types/editor'

const EditorBlock = ({
    value,
    handleContentModify,
    setContent,
    handleBlockRemove,
    type: __type,
}: {
    value: Editor.ContentValueType[]
    type: Editor.ContentTypes
    handleContentModify: any
    setContent?: (values: Editor.ContentValueType[]) => void
    handleBlockRemove?: () => void
}) => {
    const modal = useModal()

    const handleRemoveModal = (
        whatToRemove: string,
        removeFunction: () => void
    ) => {
        modal.setContent(
            <ConfirmModal
                question={`Czy na pewno chcesz usunąć ${whatToRemove}`}
                ConfirmButton={
                    <Button
                        onClick={() => {
                            removeFunction()
                            modal.hide()
                        }}
                    >
                        Tak, usuń
                    </Button>
                }
                CancelButton={<Button onClick={modal.hide}>Nie</Button>}
            />
        )
        modal.show()
    }

    const initHandler = (id: string) => {
        const _value = [...value]
        const index = _value.findIndex(({ id: _id }) => id === _id)

        const update = (value: Editor.ContentValueType[]) => {
            if (!setContent) return console.error('no content updater')
            setContent!(value)
        }

        const handleParagraphChange = (val: string) => {
            if (index < 0) return
            _value[index].value = val

            update(_value)
        }

        const handleListChange = (id: string, val: string) => {
            if (index < 0) return

            if (!_value[index].values) return

            const i = _value[index].values!.findIndex(
                ({ id: _id }) => id === _id
            )
            if (i < 0) return

            _value[index].values![i].value = val

            update(_value)
        }

        const handleListTypeChange = (type: 'ul' | 'ol') => {
            if (index < 0) return
            if (!_value[index].listType || _value[index].listType !== type)
                _value[index].listType = type
            update(_value)
        }

        const handleListOrderChange = (
            newOrder: { id: string; value: string }[]
        ) => {
            if (index < 0) return
            _value[index].values = newOrder
            update(_value)
        }

        const handleListRemove = (id: string) => {
            if (index < 0 || !_value[index].values) return

            const i = _value[index].values!.findIndex(
                ({ id: _id }) => id === _id
            )
            if (i < 0) return

            _value[index].values!.splice(i, 1)

            update(_value)
        }

        const handleListAdd = () => {
            if (index < 0) return
            if (!_value[index].values || !Array.isArray(_value[index].values))
                _value[index].values = []

            _value[index].values!.push({
                id: genKey(_value[index].values!),
                value: '',
            })

            update(_value)
        }

        const handleModuleSelect = (module: Editor.Modules) => {
            if (index < 0) return
            _value[index].moduleName = module
            update(_value)
        }

        const handleFileChange = (file: File) => {
            if (index < 0) return
            _value[index].value = file
            update(_value)
        }

        return {
            handleParagraphChange,
            handleListChange,
            handleListTypeChange,
            handleListOrderChange,
            handleListRemove,
            handleListAdd,
            handleModuleSelect,
            handleFileChange,
        }
    }

    const handleRemove = (id: string) => {
        if (!setContent) return console.error('no content updater')

        const _value = [...value]

        const index = _value.findIndex(({ id: _id }) => _id === id)

        _value.splice(index, 1)

        setContent!(_value)
    }

    return (
        <div className={classNames(style.contentBlock)}>
            <div>
                <h2 style={{ marginBottom: 0, textTransform: 'capitalize' }}>
                    {__type}
                </h2>
                <div>
                    {__type === 'part' ? (
                        <TextInput
                            label="Tytuł bloku"
                            handleInput={(val) =>
                                handleContentModify('modify', val, 'header')
                            }
                        />
                    ) : null}
                </div>

                {value && (
                    <ReactSortable
                        list={value}
                        setList={setContent ? setContent : () => {}}
                        animation={200}
                        delay={2}
                        delayOnTouchOnly={true}
                        className={style.valuesList}
                        handle={`.${style.draggable}`}
                        group={__type === 'part' ? 'valueElements' : undefined}
                    >
                        {value.map(({ type, values, id, listType }) => (
                            <RenderValues
                                key={id}
                                type={type}
                                id={id}
                                values={values}
                                listType={listType}
                                handleRemove={handleRemove}
                                handleRemoveModal={handleRemoveModal}
                                initHandler={initHandler}
                                blockType={__type}
                            />
                        ))}
                    </ReactSortable>
                )}

                {__type === 'part' && (
                    <div className={style.buttons}>
                        <Button
                            onClick={() => {
                                handleContentModify('add', 'paragraph')
                            }}
                        >
                            Dodaj paragraf
                        </Button>
                        <Button
                            onClick={() => {
                                handleContentModify('add', 'list')
                            }}
                        >
                            Dodaj liste
                        </Button>
                        <Button
                            onClick={() => {
                                handleContentModify('add', 'quote')
                            }}
                        >
                            Dodaj cytat
                        </Button>
                        <Button
                            onClick={() => {
                                handleContentModify('add', 'image')
                            }}
                        >
                            Dodaj zdjęcie
                        </Button>
                    </div>
                )}
            </div>
            <div className={style.actionBlock}>
                <div>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={style.removeIcon}
                        onClick={() => {
                            handleRemoveModal('ten blok', () => {
                                if (!!handleBlockRemove) handleBlockRemove()
                            })
                        }}
                    />
                </div>
                <div className={style.draggableBlock}></div>
            </div>
        </div>
    )
}

export default EditorBlock
