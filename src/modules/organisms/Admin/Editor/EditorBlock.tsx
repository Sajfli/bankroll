import classNames from 'classnames'
import { ReactSortable } from 'react-sortablejs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import genKey from '@/utils/genKey'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'
import Button from '@/modules/atoms/Button'
import TextInput from '@/modules/atoms/TextInput'

import RenderValues from './EditorRenderValues'

import style from './Editor.module.scss'
import * as Editor from '@/types/editor'
import { ContentTypes, Modules } from '@/types/article'

const EditorBlock = ({
    value,
    handleContentModify,
    setContent,
    handleBlockRemove,
    type: __type,
    header,
}: {
    value: Editor.ContentValueType[]
    type: ContentTypes
    header?: string
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
                confirm={{
                    label: 'Tak, usuń',
                    action: () => {
                        removeFunction()
                        modal.hide()
                    },
                }}
                cancel={{
                    action: modal.hide,
                }}
            />
        )
        modal.show()
    }

    const initHandler: Editor.InitHandlerType = (id, rl) => {
        const _value = [...value]
        const index = _value.findIndex(({ id: _id }) => id === _id)

        const addToOrRemoveFromList = (removeId?: string) => {
            if (
                rl &&
                (!rl.side ||
                    !_value[index].leftRight ||
                    typeof rl.i === 'undefined')
            )
                return

            const value = rl
                ? _value[index].leftRight![rl.side][rl.i]
                : _value[index]

            let values: Editor.ContentValueType['values'] = value.values || []

            if (value.values && Array.isArray(value.values))
                values = value.values as Editor.ContentValueType['values']

            if (removeId) {
                const i = values!.findIndex(({ id }) => id === removeId)

                if (i < 0) return

                values!.splice(i, 1)
            } else
                values!.push({
                    id: genKey(values!),
                    value: '',
                })

            if (rl) _value[index].leftRight![rl.side][rl.i].values = values
            else _value[index].values = values

            update(_value)
        }

        const setValue = ({
            array,
            property,
            value,
            values,
            listType,
            id,
        }: {
            array: Editor.ContentValueType[]
            property: 'value' | 'values' | 'listType'
            value?: Editor.ContentValueType['value']
            values?: Editor.ContentValueType['values']
            listType?: Editor.ContentValueType['listType']
            id?: string
        }) => {
            const _array = [...array]
            const _value = _array[index]

            const _set = (
                prop: 'value' | 'values' | 'listType',
                val: any,
                i?: number
            ) => {
                if (typeof i !== 'undefined') {
                    if (prop !== 'values') return
                    if (!rl) _value[prop]![i].value = val
                    else if (_value.leftRight)
                        _value.leftRight[rl.side][rl.i][prop][i].value = val
                } else {
                    if (!rl) {
                        _value[prop] = val
                        if (_value.alreadyUploaded)
                            _value.alreadyUploaded = false
                    } else if (_value.leftRight) {
                        _value.leftRight[rl.side][rl.i][prop] = val
                        if (_value.leftRight[rl.side][rl.i].alreadyUploaded)
                            _value.leftRight[rl.side][rl.i].alreadyUploaded =
                                false
                    }
                }
            }

            if (property === 'value' && value) {
                _set(property, value)
            } else if (property === 'values' && values) {
                _set(property, values)
            } else if (property === 'listType' && listType) {
                _set(property, listType)
            } else if (property === 'values' && value) {
                if (!id || (!rl && !_value.values)) return null
                if (rl && !_value.leftRight![rl.side][rl.i].values) return null

                var i: number
                if (!rl)
                    i = _value.values!.findIndex(({ id: _id }) => id === _id)
                else
                    i = _value.leftRight![rl.side][rl.i].values.findIndex(
                        ({ id: _id }: { id: Editor.EditorId }) => id === _id
                    )

                if (i < 0) return null

                _set(property, value, i)
            }

            _array[index] = _value
            update(_array)
        }

        const update = (value: Editor.ContentValueType[] | null) => {
            if (!value) return
            if (!setContent) return console.error('no content updater')
            setContent(value)
        }

        const handleParagraphChange = (val: string) => {
            if (index < 0) return
            setValue({
                array: _value,
                property: 'value',
                value: val,
            })
        }

        const handleListChange = (id: string, val: string) => {
            if (index < 0) return

            setValue({
                array: _value,
                property: 'values',
                value: val,
                id,
            })
        }

        const handleListTypeChange = (type: 'ul' | 'ol') => {
            if (index < 0) return

            if (_value[index].listType && _value[index].listType === type)
                return

            setValue({
                array: _value,
                property: 'listType',
                listType: type,
            })
        }

        const handleListOrderChange = (
            newOrder: { id: string; value: string }[]
        ) => {
            if (index < 0) return
            setValue({
                array: _value,
                values: newOrder,
                property: 'values',
            })
        }

        const handleListRemove = (id: string) => {
            if (index < 0 || !_value[index].values) return

            addToOrRemoveFromList(id)
        }

        const handleListAdd = () => {
            if (index < 0) return

            addToOrRemoveFromList()
        }

        const handleModuleSelect = (module: Modules) => {
            if (index < 0) return
            _value[index].moduleName = module
            update(_value)
        }

        const handleFileChange = (file: File) => {
            if (index < 0) return
            setValue({
                array: _value,
                property: 'value',
                value: file,
            })
        }

        const handleFileCaptionChange = (id: string, value: string) => {
            if (index < 0) return
            setValue({
                array: _value,
                property: 'values',
                value,
                id,
            })
        }

        const handleRlAdd = (
            side: 'right' | 'left',
            type: Editor.ContentValueType['type']
        ) => {
            if (index < 0) return
            if (!_value[index].leftRight) return
            if (['rl ', 'module', 'author'].includes(type)) return
            if (_value[index].leftRight![side].length > 3) return

            type CreateContentValue = (
                type: Editor.ContentValueType['type'],
                n: number
            ) => Editor.ContentValueType

            const createContentValue: CreateContentValue = (type, n) => {
                const id = genKey(Array.from(Array(n).keys()))

                switch (type) {
                    case 'paragraph':
                    case 'quote':
                    case 'file':
                        return {
                            id,
                            value: '',
                            type,
                            values: [{ id, value: '' }],
                        }
                    case 'list':
                        return { id, values: [], type }
                    default:
                        return { id, type: 'paragraph', value: '' }
                }
            }

            const length =
                _value[index].leftRight!.left.length +
                _value[index].leftRight!.right.length

            _value[index].leftRight![side].push(
                createContentValue(type, length)
            )
            update(_value)
        }

        const handleRlOrderChange = (
            side: 'left' | 'right',
            newState: Editor.ContentValueType[]
        ) => {
            if (
                index < 0 ||
                !side ||
                !_value[index].leftRight ||
                !_value[index].leftRight![side]
            )
                return

            _value[index].leftRight![side] = newState
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
            handleRlAdd,
            handleRlOrderChange,
            handleFileCaptionChange,
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
                            defaultValue={header || ''}
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
                        forceFallback={true}
                    >
                        {value.map(
                            ({
                                type,
                                values,
                                value,
                                id,
                                listType,
                                leftRight,
                                moduleName,
                                alreadyUploaded,
                            }) => (
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
                                    leftRight={leftRight}
                                    value={value}
                                    moduleName={moduleName}
                                    alreadyUploaded={alreadyUploaded}
                                />
                            )
                        )}
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
                        <Button
                            onClick={() => {
                                handleContentModify('add', 'rl')
                            }}
                        >
                            Dodaj rl
                        </Button>
                        <Button
                            onClick={() => {
                                handleContentModify('add', 'youtube')
                            }}
                        >
                            Dodaj YT
                        </Button>
                    </div>
                )}
            </div>
            <div className={style.actionBlock}>
                <div>
                    <FontAwesomeIcon
                        icon="xmark"
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
