import { useEffect, useState } from 'react'
import ky, { HTTPError } from 'ky'
import propTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

import ParseArticle from '@/modules/organisms/Article'
import { Article } from '@/types/article'

const Stage = ({ stage }: { stage: number }) => {
    const [stageContent, setStageContent] = useState<Article | null>(null)
    const [error, setError] = useState<number | null>(null)

    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const response = await ky.get(
                    '/api/v1/content/article/stage' + stage
                )
                const data = (await response.json()) as {
                    ok: boolean
                    article: Article
                }

                if (!data || !data.ok || !data.article) throw Error()

                if (mounted) setStageContent(data.article)
            } catch (err) {
                setStageContent(null)

                if ((err! as HTTPError).response) {
                    try {
                        const error = (err as HTTPError).response
                        if (error.status) setError(error.status)
                        else setError(400)
                    } catch (err) {
                        setError(500)
                    }
                }
            }
        })()
        return () => {
            mounted = false
        }
    }, [stage])

    if (error) return <Navigate to={`/error/${error}`} />

    return <ParseArticle article={stageContent} type="stage" />
}

Stage.propTypes = {
    stage: propTypes.number,
}

export default Stage
