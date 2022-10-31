import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactSortable } from 'react-sortablejs'
import genKey from '@/utils/genKey'

import Button from '@/modules/atoms/Button'
import TextInput from '@/modules/atoms/TextInput'
import EditorBlock from './EditorBlock'

import style from './Editor.module.scss'
import * as Editor from '@/types/editor'
import * as Article from '@/types/article'
import cleanEditorData from '@/utils/cleanEditorData'
import ky from 'ky'
import { Stage } from '@/types/utils'
import { isStageCorrect } from '@/utils/stages'
import useToast, { standardUpdateOptions } from '@/hooks/useToat'
import { handleKyErrorToast } from '@/utils/handleKyError'

type ArticleEditorProps = {
    content?: Editor.ContentType[]
    title?: string
    name?: string
    requiredStage?: Stage
    update?: boolean
}

const ArticleEditor = ({
    content: _content,
    title: _title,
    name: _name,
    requiredStage: _requiredStage,
    update,
}: ArticleEditorProps) => {
    const [contents, setContents] = useState<Editor.ContentType[] | null>(
        _content || null
    )
    const [name, setName] = useState<string>(_name || '')
    const [title, setTitle] = useState<string>(_title || '')
    const [requiredStage, setRequiredStage] = useState<Stage>(
        _requiredStage || 1
    )
    const [canSubmit, setCanSubmit] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)

    const toast = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        if (
            name.length > 0 &&
            title.length > 0 &&
            contents &&
            contents.length > 0 &&
            !isPending
        )
            setCanSubmit(true)
        else setCanSubmit(false)
    }, [contents, name, title, isPending])

    const handleContentAdd = (type: Article.ContentTypes | 'image') => {
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
            case 'blockquote':
                _contents.push({
                    type: 'blockquote',
                    value: [
                        {
                            type: 'quote',
                            value: '',
                            id: genKey([1]),
                        },
                        {
                            type: 'author',
                            value: '',
                            id: genKey([1, 2]),
                        },
                    ],
                    id: genKey(_contents),
                })
                break
            case 'module':
                _contents.push({
                    type: 'module',
                    value: [
                        {
                            type: 'module',
                            moduleName: null,
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

    const handlePartAdd = (value: string, _contents: Editor.ContentType) => {
        const id = genKey(_contents.value)

        switch (value) {
            case 'list':
                _contents.value.push({
                    type: 'list',
                    values: [
                        { id: genKey([1]), value: '' },
                        { id: genKey([1, 2]), value: '' },
                    ],
                    id,
                })
                break
            case 'paragraph':
                _contents.value.push({
                    type: 'paragraph',
                    value: '',
                    id,
                })
                break
            case 'quote':
                _contents.value.push({
                    type: 'quote',
                    id,
                })
                break
            case 'image':
                _contents.value.push({
                    type: 'image',
                    id,
                    value: '',
                    values: [
                        {
                            value: '',
                            id: genKey([1]),
                        },
                    ],
                })
                break
            case 'rl':
                _contents.value.push({
                    type: 'rl',
                    id,
                    leftRight: {
                        left: [],
                        right: [],
                    },
                })
                break
            default:
                break
        }

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
                    _contents[index] = handlePartAdd(value, _contents[index])
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!contents || !name || !title || !requiredStage) return
        setIsPending(true)

        const sendArticle = () =>
            new Promise(async (resolve, reject) => {
                try {
                    const body = new FormData()
                    let files: File[] = []

                    const _content: Editor.ContentType[] = []

                    for (let i in contents) {
                        const { cleaned, files: _files } = cleanEditorData(
                            contents[i]
                        )

                        if (_files) files = [...files, ..._files]

                        _content.push(cleaned)
                    }

                    body.append(
                        'article',
                        JSON.stringify({
                            name,
                            title,
                            requiredStage,
                            content: _content,
                        })
                    )

                    for (let i in files) {
                        body.append('file', files[i], `file_${i}`)
                    }

                    const url = '/api/v1/content/article'
                    const options = { body }

                    const response = !update
                        ? await ky.post(url, options)
                        : await ky.put(url, options)
                    const resp = (await response.json()) as any
                    if (resp.ok) resolve(resp)
                    else throw Error()
                } catch (err) {
                    reject(err)
                }

                setIsPending(false)
            })

        const toastId = toast.loading('Trwa zapisywanie artykułu')
        try {
            const resp = (await sendArticle()) as any

            if (!resp.ok) throw Error()

            toast.update(toastId, {
                ...standardUpdateOptions,
                type: 'success',
                render: 'Artykuł został zapisany',
            })
            navigate('/panel/articles')
        } catch (err: any) {
            handleKyErrorToast(err, toast, toastId)
        }
    }

    return (
        <div className={style.editor}>
            <form onSubmit={handleSubmit}>
                <TextInput
                    name="name"
                    label="Nazwa artykułu"
                    handleInput={setName}
                    defaultValue={name || ''}
                />
                <TextInput
                    name="header"
                    label="Nagłówek"
                    handleInput={setTitle}
                    defaultValue={title || ''}
                />
                Wymagany Etap
                <select
                    defaultValue={requiredStage}
                    onChange={({ target }: { target: HTMLSelectElement }) => {
                        const value = +target.value
                        if (isStageCorrect(value))
                            setRequiredStage(value as Stage)
                    }}
                >
                    {Array.from(Array(7).keys()).map((n) => (
                        <option value={n + 1} key={n}>
                            Etap {n + 1}
                        </option>
                    ))}
                </select>
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
                        {contents.map(({ type, value, id, header }) => {
                            switch (type) {
                                case 'part':
                                default:
                                    return (
                                        <EditorBlock
                                            type={type}
                                            key={id}
                                            value={value}
                                            handleContentModify={handleContentModify(
                                                id
                                            )}
                                            setContent={setContent(id)}
                                            handleBlockRemove={handleContentRemove(
                                                id
                                            )}
                                            header={header}
                                        />
                                    )
                            }
                        })}
                    </ReactSortable>
                )}
                <div className={style.add}>
                    <h2>Dodaj...</h2>
                    <Button onClick={() => handleContentAdd('part')}>
                        Blok
                    </Button>
                    <Button onClick={() => handleContentAdd('blockquote')}>
                        Cytat blokowy
                    </Button>
                    <Button onClick={() => handleContentAdd('module')}>
                        Moduł
                    </Button>
                </div>
                <div className={style.save}>
                    <Button type="submit" disabled={!canSubmit}>
                        Zapisz
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ArticleEditor
