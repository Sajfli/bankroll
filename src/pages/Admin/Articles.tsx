import ArticlesList from '@/modules/molecules/Admin/ArticlesList'
import ky from 'ky'
import { useEffect, useState } from 'react'

import style from './Articles.module.scss'

import { A_ArticleType } from '@/types/panel'
import ButtonLink from '@/modules/atoms/ButtonLink'
import LoaderScreen from '@/modules/molecules/LoaderScreen'

const Articles = () => {
    const [articles, setArticles] = useState<A_ArticleType[] | null>(null)

    useEffect(() => {
        ;(async () => {
            try {
                const response = await ky.get('/api/v1/content/articles')

                const json = (await response.json()) as A_ArticleType[]

                if (json) {
                    setArticles(json)
                }
            } catch (err) {
                setArticles(null)
            }
        })()
    }, [])

    return (
        <div className="defaultFormatting">
            <h1 className="header">Artykuły</h1>

            {articles ? (
                <ArticlesList articles={articles} setArticles={setArticles} />
            ) : (
                <LoaderScreen />
            )}

            <div className={style.newBtn}>
                <ButtonLink to="/panel/articles/new">Dodaj nowy</ButtonLink>
            </div>
        </div>
    )
}

export default Articles
