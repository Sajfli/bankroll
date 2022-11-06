import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'

const useAutoRedirect = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true

        if (auth.isAuthed) {
            const redirTo = localStorage.getItem('noAuthRedirFrom')
            if (redirTo) {
                const [location, date] = redirTo.split(' ')

                if (!isNaN(+date)) {
                    if (Date.now() - +date <= 1500) {
                        // difference between redirect and now
                        if (mounted) navigate(location)
                    }
                }

                localStorage.removeItem('noAuthRedirFrom')
            }
        }

        return () => {
            mounted = false
        }
    }, [auth, navigate])
}

export default useAutoRedirect
