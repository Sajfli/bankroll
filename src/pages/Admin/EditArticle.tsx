import ky from 'ky'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoaderScreen from '@/modules/molecules/LoaderScreen'
import ArticleEditor from '@/modules/organisms/Admin/Editor/ArticleEditor'
import genKey from '@/utils/genKey'
import { EditorArticle } from '@/types/editor'

const EdititArticle = () => {
    const params = useParams()
    const [article, setArticle] = useState<EditorArticle | null>(null)

    useEffect(() => {
        if (!params.article) return
        ;(async () => {
            try {
                const response = await ky.get(
                    `/api/v1/content/article/${params.article}?panel=true`
                )

                const res = (await response.json()) as {
                    article: EditorArticle
                    ok: boolean
                }

                if (!res.ok) throw Error('404')

                let _article = JSON.parse(
                    JSON.stringify(res.article).split('_id').join('id')
                ) as EditorArticle

                for (let i in _article.content) {
                    for (let j in _article.content[i].value) {
                        if (
                            ['file', 'image'].includes(
                                _article.content[i].value[j].type
                            )
                        ) {
                            _article.content[i].value[j].alreadyUploaded = true

                            if (
                                !_article.content[i].value[j].values ||
                                _article.content[i].value[j].values!.length < 1
                            )
                                _article.content[i].value[j].values = [
                                    { id: genKey([1]), value: '' },
                                ]
                        } else if (
                            _article.content[i].value[j].type === 'rl' &&
                            _article.content[i].value[j].leftRight
                        ) {
                            for (const side of ['left', 'right'] as const) {
                                for (let k in _article.content[i].value[j]
                                    .leftRight![side]) {
                                    if (
                                        ['file', 'image'].includes(
                                            _article.content[i].value[j]
                                                .leftRight![side][k].type
                                        )
                                    ) {
                                        _article.content[i].value[j].leftRight![
                                            side
                                        ][k].alreadyUploaded = true

                                        if (
                                            !_article.content[i].value[j]
                                                .leftRight![side][k].values ||
                                            _article.content[i].value[j]
                                                .leftRight![side][k].values!
                                                .length < 1
                                        )
                                            _article.content[i].value[
                                                j
                                            ].leftRight![side][k].values = [
                                                { id: genKey([1]), value: '' },
                                            ]
                                    }
                                }
                            }
                        }
                    }
                }

                setArticle(_article)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [params])

    if (!article) return <LoaderScreen />

    return (
        <ArticleEditor
            title={article.title}
            name={article.name}
            content={article.content}
            requiredStage={article.requiredStage}
            update={true}
        />
    )
}

export default EdititArticle
