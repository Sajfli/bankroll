import { useEffect, useState } from 'react'
import Button from '@/modules/atoms/Button'
import TextInput from '@/modules/atoms/TextInput'
import { ReactSortable } from 'react-sortablejs'

import style from './ArticleEditor.module.scss'
import classNames from 'classnames'

import genKey from '@/utils/genKey'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'
import RenderValues from './EditorRenderValues'

import * as Editor from '@/types/editor'

const ContentPart = ({
    value,
    handleContentModify,
    setContent,
    handleBlockRemove,
}: {
    value: Editor.ContentValueType[]
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

        return {
            handleParagraphChange,
            handleListChange,
            handleListTypeChange,
            handleListOrderChange,
            handleListRemove,
            handleListAdd,
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
                <div>
                    <TextInput
                        label="Tytuł bloku"
                        handleInput={(val) =>
                            handleContentModify('modify', val, 'header')
                        }
                    />
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
                        group="valueElements"
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
                            />
                        ))}
                    </ReactSortable>
                )}

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
                </div>
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
                        // onClick={handleBlockRemoveModal}
                    />
                </div>
                <div className={style.draggableBlock}></div>
            </div>
        </div>
    )
}

const ArticleEditor = () => {
    const [contents, setContents] = useState<Editor.ContentType[] | null>(null)

    useEffect(() => {
        console.log(contents)
    }, [contents])

    const handleContentAdd = (type: Editor.ContentTypes) => {
        const _contents = contents ? [...contents] : []

        switch (type) {
            case 'part':
                _contents.push({
                    header: '',
                    type,
                    value: [],
                    id: genKey(_contents),
                })
                break
            case 'quote':
                _contents.push({
                    type: 'quote',
                    value: [
                        {
                            type: 'quote',
                            value: '',
                            id: genKey([1]),
                        },
                    ],
                    id: genKey(_contents),
                })
                break
            default:
                break
        }

        setContents(_contents)
    }

    const handlePartAdd = (
        index: number,
        value: string,
        _contents: Editor.ContentType
    ) => {
        const id = genKey(_contents.value)

        if (value === 'list')
            _contents.value.push({
                type: 'list',
                values: [
                    { id: genKey([1]), value: '' },
                    { id: genKey([1, 2]), value: '' },
                ],
                id,
            })
        else
            _contents.value.push({
                type: 'paragraph',
                value: '',
                id,
            })

        return _contents
    }

    const updateContentValue = (
        contentValue: Editor.ContentValueType[],
        value: string,
        id: string
    ) => {
        const index = contentValue.findIndex(({ id: _id }) => id === _id)
        if (index < 0) return contentValue

        contentValue[index].value = value

        return contentValue
    }

    const setContent = (id: string) => {
        if (!contents) return
        const index = contents.findIndex(({ id: _id }) => id === _id)
        if (index < 0) return
        return (values: Editor.ContentValueType[]) => {
            const _contents = [...contents]
            _contents[index].value = values
            setContents(_contents)
        }
    }

    const handleContentModify = (id: string) => {
        return (
            action: 'add' | 'modify',
            value: string,
            target?: string,
            attribute?: string
        ) => {
            if (!contents) return

            let _contents = [...contents]

            const index = _contents.findIndex(({ id: _id }) => _id === id)

            if (index < 0) return

            switch (action) {
                case 'add':
                    _contents[index] = handlePartAdd(
                        index,
                        value,
                        _contents[index]
                    )
                    break
                case 'modify':
                    if (target === 'header') _contents[index].header = value
                    else if (
                        (target === 'paragraph' || target === 'list') &&
                        attribute
                    ) {
                        _contents[index].value = updateContentValue(
                            _contents[index].value,
                            value,
                            attribute
                        )
                    }
            }

            setContents(_contents)
        }
    }

    const handleContentRemove = (id: string) => {
        if (!contents) return

        return () => {
            const _contents = [...contents]

            const index = _contents.findIndex(({ id: _id }) => _id === id)
            if (index < 0) return

            _contents.splice(index, 1)

            setContents(_contents)
        }
    }

    return (
        <div className={style.editor}>
            <form>
                <TextInput name="name" label="Nazwa artykułu" />
                <TextInput name="header" label="Nagłówek"></TextInput>

                {contents && (
                    <ReactSortable
                        list={contents}
                        setList={setContents}
                        className={style.contentBlocksList}
                        animation={200}
                        delay={2}
                        delayOnTouchOnly={true}
                        handle={`.${style.draggableBlock}`}
                    >
                        {contents.map(({ type, value, id }) => {
                            switch (type) {
                                case 'part':
                                    return (
                                        <ContentPart
                                            key={id}
                                            value={value}
                                            handleContentModify={handleContentModify(
                                                id
                                            )}
                                            setContent={setContent(id)}
                                            handleBlockRemove={handleContentRemove(
                                                id
                                            )}
                                        />
                                    )
                                default:
                                    return null
                            }
                        })}
                    </ReactSortable>
                )}

                <div className={style.add}>
                    <h2>Dodaj...</h2>
                    <Button onClick={() => handleContentAdd('part')}>
                        Part
                    </Button>
                    <Button onClick={() => handleContentAdd('quote')}>
                        Cytat
                    </Button>
                    <Button onClick={() => handleContentAdd('blockquote')}>
                        Cytat blokowy
                    </Button>
                    <Button onClick={() => handleContentAdd('module')}>
                        Moduł
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ArticleEditor
