import { useState } from 'react'
import Button from '@/modules/atoms/Button'
import TextInput from '@/modules/atoms/TextInput'
import { ReactSortable } from 'react-sortablejs'

import style from './ArticleEditor.module.scss'
import classNames from 'classnames'

import genKey from '@/utils/genKey'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'

type ContentValueType = {
    type: 'paragraph' | 'list'
    value: string | string[]
    id: string
}

type ContentTypes = 'part' | 'quote' | 'blockquote' | 'module'

type ContentType = {
    type: ContentTypes
    header: string
    value: ContentValueType[]
    id: string
}

const ContentPart = ({
    value,
    handleContentModify,
    setContent,
    handleBlockRemove,
}: {
    value: ContentValueType[]
    handleContentModify: any
    setContent?: (values: ContentValueType[]) => void
    handleBlockRemove?: () => void
}) => {
    const modal = useModal()

    const handleBlockRemoveModal = () => {
        modal.setContent(
            <ConfirmModal
                question="Czy na pewno chcesz usunąć ten blok?"
                ConfirmButton={
                    <Button
                        onClick={() => {
                            if (!!handleBlockRemove) handleBlockRemove()
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

    const handleParagraphChange = (paragraphId: string, val: string) => {
        if (!setContent) return console.error('no content updater')

        const _value = [...value]
        const index = _value.findIndex(({ id }) => id === paragraphId)
        if (index < 0) return

        _value[index].value = val

        setContent!(_value)
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
                    >
                        {value.map(({ type, value, id }) => (
                            <div key={id} className={classNames(style.value)}>
                                {type === 'paragraph' ? (
                                    <textarea
                                        className={style.input}
                                        onInput={(e) => {
                                            const target =
                                                e.target as HTMLInputElement

                                            handleParagraphChange(
                                                id,
                                                target.value
                                            )
                                        }}
                                    ></textarea>
                                ) : (
                                    <div>lista</div>
                                )}

                                <div className={style.icons}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className={style.removeIcon}
                                        onClick={() => {
                                            handleRemove(id)
                                        }}
                                    />
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        className={style.draggable}
                                    />
                                </div>
                            </div>
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
                        onClick={handleBlockRemoveModal}
                    />
                </div>
                <div className={style.draggableBlock}></div>
            </div>
        </div>
    )
}

const ArticleEditor = () => {
    const [contents, setContents] = useState<ContentType[] | null>(null)

    const handleContentAdd = (type: ContentTypes) => {
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
            default:
                break
        }

        setContents(_contents)
    }

    const handlePartAdd = (
        index: number,
        value: string,
        _contents: ContentType
    ) => {
        const id = genKey(_contents.value)

        if (value === 'list')
            _contents.value.push({
                type: 'list',
                value: [],
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
        contentValue: ContentValueType[],
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
        return (values: ContentValueType[]) => {
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
