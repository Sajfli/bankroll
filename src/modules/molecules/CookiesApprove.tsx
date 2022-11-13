import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../atoms/Button'
import style from './CookiesApprove.module.scss'

import * as manageCookies from '@/utils/manageCookies'
import useCookiesApprove from '@/hooks/useCookiesApprove'

const CookiesApprove = () => {
    const { show, setShow, blur, setBlur, acceptCallback, setAcceptCallback } =
        useCookiesApprove()

    const location = useLocation()

    useEffect(() => {
        const accepted = manageCookies.getCookie('accepted')
        if (accepted !== 'true') {
            if (
                [
                    '/regulamin',
                    '/polityka-prywatnosci',
                    '/RODO',
                    '/faq',
                ].includes(location.pathname)
            )
                return setShow(false)

            if (location.pathname === '/') setBlur(true)
            else setBlur(false)

            setShow(true)
        } else setShow(false)
    }, [location, setBlur, setShow])

    const handleAccept = () => {
        manageCookies.setCookie('accepted', 'true')
        setShow(false)
        if (acceptCallback && typeof acceptCallback === 'function') {
            acceptCallback()
            setAcceptCallback(undefined)
        }
    }

    return (
        <div
            className={classNames(
                style.eclipse,
                blur && style.blur,
                show && style.show
            )}
        >
            <div className={style.cookies}>
                <div className={style.content}>
                    <div>
                        <h2>Ten serwis wykorzystuje pliki cookies</h2>
                        <p>
                            Serwis wykorzystuje pliki cookies m.in. w celu
                            porpawienia jej dostępności, personalizacji, obsługi
                            kont użytkowników czy aby zbierać dane, dotyczące
                            ruchu na stronie. Każdy może sam decydować o tym czy
                            dopuszcza pliki cookies, ustawiając odpowiednio
                            swoją przeglądarkę.
                        </p>
                        <p>
                            Więcej informacji znajdziesz w Polityce Prywatności
                            i Regulaminie.
                        </p>
                    </div>
                    <div>
                        <h2>Twoja prywatność jest dla nas ważna</h2>
                        <p>
                            Właściciel serwisu gromadzi i przetwarza dane o
                            użytkownikach (w tym dane osobowe) w celu realizacji
                            usług za pośrednictwem serwisu. Dane są przetwarzane
                            zgodnie z prawem i zachowaniem zasad bezpieczeństwa.
                            Przetwarzanie części danych może być powierzone
                            innym partnerom.
                        </p>
                    </div>
                    <div className={style.icons}>
                        <Link to="RODO">
                            <FontAwesomeIcon
                                className={style.icon}
                                icon="shield"
                            />
                            RODO
                        </Link>
                        <Link to="polityka-prywatnosci">
                            <FontAwesomeIcon
                                className={style.icon}
                                icon="key"
                            />
                            Polityka Prywatności
                        </Link>
                        <Link to="regulamin">
                            <FontAwesomeIcon
                                className={style.icon}
                                icon="book-open"
                            />
                            Regulamin
                        </Link>
                    </div>
                </div>
                <div className={style.approve}>
                    <Button onClick={handleAccept}>Akceptuję</Button>
                    <p>
                        Poprzez kliknięcie przycisku "Akceptuję", akceptujesz
                        regulamin, politykę prywatności i zgadzasz się na
                        używanie plików cookies.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CookiesApprove
