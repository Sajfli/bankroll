import { useParams, Navigate, useLocation } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Stage1 from './Stage1'
import Stage from './Stage'
import './Stage.scss'

const stages = [1, 2, 3, 4, 5, 6, 7]

const Stages = () => {
    const params = useParams()
    const auth = useAuth()
    const location = useLocation()

    if (!params || !params.stage || !stages.includes(+params.stage)) {
        return <Navigate to="/" />
    } else {
        const stage = +params.stage!

        if (stage === 1) return <Stage1 />
        if (
            !auth.stage ||
            typeof auth.stage !== 'number' ||
            auth.stage < stage
        ) {
            localStorage.setItem(
                'noAuthRedirFrom',
                `${location.pathname} ${Date.now()}`
            )
            return <Navigate to="/" />
        } else return <Stage stage={stage} />
    }
}

export default Stages
