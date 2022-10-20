import style from './Header.module.scss'

import { H1 } from '../atoms/Headers'
import Navigation from '../molecules/Navigation'

import { Path } from '@/types/utils'

import {
    faHome,
    faMoneyBill,
    faRightFromBracket,
    faUser,
    faBook,
} from '@fortawesome/free-solid-svg-icons'
import useAuth from '@/hooks/useAuth'

const Header = () => {
    const auth = useAuth()

    const paths: Path[] = [
        { label: 'Strona Główna', location: '/', icon: faHome },
        !auth.isAuthed
            ? { label: 'Etap 1', location: '/etap/1', icon: faMoneyBill }
            : {
                  label: 'Etapy',
                  location: '/etap/1',
                  icon: faMoneyBill,
                  subpaths: [...Array(auth.stage || 1).keys()].map((n) => ({
                      label: `Etap ${++n}`,
                      location: `/etap/${n}`,
                  })),
              },
        !auth.isAuthed
            ? {
                  label: 'Zaloguj się',
                  location: '/api/v1/account/facebook',
                  localImage: 'facebook',
                  external: true,
              }
            : {
                  label: auth.profileName!.split(' ')[0],
                  image: auth.profilePicture,
                  location: '/profile',
                  subpaths: [
                      {
                          label: 'Profil',
                          location: '/profile',
                          icon: faUser,
                      },
                      {
                          label: 'Wyloguj się',
                          location: '/api/v1/account/facebook/logout',
                          icon: faRightFromBracket,
                          external: true,
                      },
                  ],
              },
    ]

    if (auth.isAuthed && auth.userRole === 'admin')
        paths.push({
            location: '/panel',
            label: 'Panel',
            icon: faBook,
        })

    return (
        <>
            <header>
                <div className={style.header}>
                    <H1>Extra Bankroll</H1>
                </div>
            </header>
            <Navigation paths={paths}></Navigation>
        </>
    )
}

export default Header
