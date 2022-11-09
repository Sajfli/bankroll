import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../atoms/Button'
import style from './CookiesApprove.module.scss'

import * as manageCookies from '@/utils/manageCookies'

const CookiesApprove = () => {
    const location = useLocation()

    const [blur, setBlur] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        if (location.pathname === '/') setBlur(true)
        else setBlur(false)
    }, [location])

    useEffect(() => {
        const accepted = manageCookies.getCookie('accepted')
        if (accepted !== 'true') setShow(true)
    }, [])

    const handleAccept = () => {
        manageCookies.setCookie('accepted', 'true')
        setShow(false)
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
                        <a href="RODO" target="_blank">
                            <FontAwesomeIcon
                                className={style.icon}
                                icon="shield"
                            />
                            RODO
                        </a>
                        <a href="polityka-prywatnosci" target="_blank">
                            <FontAwesomeIcon
                                className={style.icon}
                                icon="key"
                            />
                            Polityka Prywatności
                        </a>
                        <a href="regulamin" target="_blank">
                            <FontAwesomeIcon
                                className={style.icon}
                                icon="book-open"
                            />
                            Regulamin
                        </a>
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
