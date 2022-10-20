import useAuth from '@/hooks/useAuth'
import { useLocation, Navigate } from 'react-router-dom'

type CheckPermTypes = {
    children: React.ReactElement
    requiredStage?: 2 | 3 | 4 | 5 | 6 | 7
    requiredRole?: 'admin'
    returnIfAuth?: boolean
}

const CheckPerm = ({
    children,
    requiredRole,
    requiredStage,
    returnIfAuth,
}: CheckPermTypes) => {
    const auth = useAuth()
    const location = useLocation()

    let ok = true

    if (!auth.isAuthed) {
        if (returnIfAuth)
            localStorage.setItem(
                'noAuthRedirFrom',
                `${location.pathname} ${Date.now()}`
            )
        ok = false
    }

    if (requiredStage && (!auth.stage || auth.stage < requiredStage)) ok = false
    if (requiredRole && (!auth.userRole || auth.userRole !== 'admin'))
        ok = false

    if (!ok) return <Navigate to="/" />

    return children
}

export default CheckPerm
