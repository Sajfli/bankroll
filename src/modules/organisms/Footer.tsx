import { Link } from 'react-router-dom'
import style from './Footer.module.scss'

const Footer = () => {
    return (
        <footer>
            <div className={style.footer}>
                <div>
                    <p>szymonjez.pl &copy; Szymon Jeż, 2022</p>
                </div>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Strona główna</Link>
                        </li>
                        <li>
                            <Link to="/faq">Najczęściej zadawane pytania</Link>
                        </li>
                        <li>
                            <Link to="/regulamin">Regulamin</Link>
                        </li>
                        <li>
                            <Link to="/polityka-prywatnosci">
                                Polityka prywatności
                            </Link>
                        </li>
                        <li>
                            <Link to="/RODO">Obowiązek informacyjny RODO</Link>
                        </li>
                        <li>
                            <Link to="/etap/1">Etap 1</Link>
                        </li>
                        <li>
                            <a
                                href="https://m.me/szymon.jez.773/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Kontakt ze mną
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
