import style from './Header.module.scss'

import { H1 } from '../atoms/Headers'
import Navigation from '../molecules/Navigation'

import { AuthContext, Path } from '@/types/utils'

import useAuth from '@/hooks/useAuth'
import { getCookie } from '@/utils/manageCookies'
import useCookiesApprove from '@/hooks/useCookiesApprove'
import { useEffect, useState } from 'react'

const Header = () => {
    const auth = useAuth()
    const cookieApprove = useCookiesApprove()

    const [mobile, setMobile] = useState<boolean>(false)

    useEffect(() => {
        let isMounted = true

        const onResize = () => {
            if (!isMounted) return
            if (window.innerWidth <= 650) setMobile(true)
            else setMobile(false)
        }

        window.addEventListener('resize', onResize)

        onResize()

        return () => {
            isMounted = false
            window.removeEventListener('resize', onResize)
        }
    }, [])

    const handleLogin = () => {
        const login = () => {
            window.location.pathname = '/api/v1/account/facebook'
        }

        const accepted = getCookie('accepted')
        if (accepted !== 'true') {
            cookieApprove.setAcceptCallback(() => login)
            cookieApprove.setShow(true)
        } else {
            login()
        }
    }

    const generateAuthPaths = (auth: AuthContext, mobile: boolean): Path[] => {
        if (auth.isAuthed) {
            const profileLabel = auth.profileName?.split(' ')[0]

            const profileEntry: Path = {
                label: profileLabel || 'Profil',
                image: auth.profilePicture,
                location: '/profile',
            }

            if (!mobile)
                return [
                    {
                        ...profileEntry,
                        subpaths: [
                            {
                                label: 'Profil',
                                location: '/profile',
                                icon: 'user',
                            },
                            {
                                label: 'Wyloguj się',
                                location: '/api/v1/account/facebook/logout',
                                icon: 'right-from-bracket',
                                type: 'external',
                            },
                        ],
                    },
                ]
            else {
                return [
                    profileEntry,
                    {
                        label: 'Wyloguj się',
                        location: '/api/v1/account/facebook/logout',
                        icon: 'right-from-bracket',
                        type: 'external',
                    },
                ]
            }
        } else {
            return [
                {
                    label: 'Zaloguj się',
                    location: '/api/v1/account/facebook',
                    localImage: 'facebook',
                    type: 'handler',
                    handler: handleLogin,
                },
            ]
        }
    }

    const paths: Path[] = [
        { label: 'Strona Główna', location: '/', icon: 'home' },
        !auth.isAuthed
            ? { label: 'Etap 1', location: '/etap/1', icon: 'money-bill' }
            : {
                  label: 'Etapy',
                  location: '/etapy',
                  icon: 'money-bill',
                  subpaths: [...Array(auth.stage || 1).keys()].map((n) => ({
                      label: `Etap ${++n}`,
                      location: `/etap/${n}`,
                  })),
              },
        { label: 'FAQ', location: '/faq', icon: 'circle-question' },
        ...generateAuthPaths(auth, mobile),
    ]

    if (auth.isAuthed && auth.userRole === 'admin')
        paths.push({
            location: '/panel',
            label: 'Panel',
            icon: 'book',
        })

    return (
        <>
            <header>
                <div className={style.header}>
                    <H1>Extra Bankroll</H1>
                </div>
            </header>
            <Navigation mobile={mobile} paths={paths}></Navigation>
        </>
    )
}

export default Header
