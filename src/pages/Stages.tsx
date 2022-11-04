import { useParams, Navigate, useLocation } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Stage1 from './Stage1'
import Stage from './Stage'

const stages = [1, 2, 3, 4, 5, 6, 7]

const Stages = () => {
    const params = useParams()
    const auth = useAuth()
    const location = useLocation()

    if (!params || !params.stage || !stages.includes(+params.stage)) {
        return <Navigate to="/error/404" />
    } else {
        const stage = +params.stage!

        if (stage === 1) return <Stage1 />

        if (!auth.isAuthed)
            localStorage.setItem(
                'noAuthRedirFrom',
                `${location.pathname} ${Date.now()}`
            )

        if (
            !auth.stage ||
            typeof auth.stage !== 'number' ||
            auth.stage < stage
        ) {
            return <Navigate to="/error/403" />
        } else return <Stage stage={stage} />
    }
}

export default Stages
