import { useEffect, useState } from 'react'
import ky, { HTTPError } from 'ky'
import { Interweave } from 'interweave'
import propTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

import LoaderScreen from '@/modules/molecules/LoaderScreen'

const Stage = ({ stage }: { stage: number }) => {
    const [stageContent, setStageContent] = useState<string | null>(null)
    const [error, setError] = useState<number | null>(null)

    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const response = await ky.get('/api/v1/article/stage' + stage)
                const data = (await response.json()) as {
                    ok: boolean
                    content: string
                }

                if (!data || !data.ok || !data.content) throw Error()

                if (mounted) setStageContent(data.content)
            } catch (err) {
                setStageContent(null)

                if ((err! as HTTPError).response) {
                    try {
                        const error = (err as HTTPError).response
                        if (error.status === 404) setError(404)
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

    if (error) {
        if (error === 404) return <Navigate to="/404" />
        else return <Navigate to="/" />
    }

    return (
        <div className="stage">
            <article>
                <h1 className="stage_header">Etap {stage}</h1>

                {stageContent ? (
                    <Interweave content={stageContent} />
                ) : (
                    <LoaderScreen />
                )}
            </article>
        </div>
    )
}

Stage.propTypes = {
    stage: propTypes.number,
}

export default Stage
