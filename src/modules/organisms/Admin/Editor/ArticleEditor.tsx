import { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import genKey from '@/utils/genKey'

import Button from '@/modules/atoms/Button'
import TextInput from '@/modules/atoms/TextInput'
import EditorBlock from './EditorBlock'

import style from './Editor.module.scss'
import * as Editor from '@/types/editor'

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
                                        <EditorBlock
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
