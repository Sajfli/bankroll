import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

const Home = () => {
    const auth = useAuth()
    const [redir, setRedir] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true

        console.log(
            auth.isAuthed ? 'authed' : 'not authed',
            localStorage.getItem('noAuthRedirFrom')
        )

        if (auth.isAuthed) {
            const redirTo = localStorage.getItem('noAuthRedirFrom')
            if (redirTo) {
                const [location, date] = redirTo.split(' ')

                if (!isNaN(+date)) {
                    if (Date.now() - +date <= 1500) {
                        // difference between redirect and now
                        if (mounted) setRedir(location)
                    }
                }

                localStorage.removeItem('noAuthRedirFrom')
            }
        }

        return () => {
            mounted = false
        }
    }, [auth])

    if (redir) {
        return <Navigate to={redir} />
    }

    return <div>Home</div>
}

export default Home
