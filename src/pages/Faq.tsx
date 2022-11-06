import { ArticleNoParse } from '@/modules/organisms/Article'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './Faq.scss'
import { topOffset } from '@/utils/variables.module.scss'

const Faq = () => {
    const location = useLocation()
    const list = useRef<HTMLOListElement>(null)

    useEffect(() => {
        var timeout: any = null
        if (location.hash.length > 0 && list.current) {
            const hash = +location.hash.substring(1, location.hash.length)
            const lis = list.current.children

            if (
                isNaN(hash) ||
                !Number.isInteger(hash) ||
                hash < 3 ||
                hash > lis.length ||
                !lis[hash - 1]
            )
                return

            timeout = setTimeout(() => {
                const liY = Math.round(lis[hash - 1].getBoundingClientRect().y)
                const offset = +topOffset.substring(0, topOffset.length - 2)
                window.scrollBy({
                    top: liY - (offset || 0),
                    left: 0,
                    behavior: 'smooth',
                })
            }, 100)
        }

        return () => {
            if (timeout) clearTimeout(timeout)
        }
    }, [location, list])

    return (
        <ArticleNoParse type="stage">
            <h1>Najczęściej zadawane pytania</h1>
            <div className="part">
                <ol className="faqList" ref={list}>
                    <li>
                        <p>Czy trzeba być pełnoletnim?</p>
                        <p>
                            Tak, pełnoletność jest obowiązkowa, tak samo jak
                            posiadanie dowodu osobistego.
                        </p>
                    </li>
                    <li>
                        <p>Czy szkolenie jest płatne?</p>
                        <p>
                            Nie, nie ponosisz żadnych kosztów. Całe szkolenie i
                            wszystkie materiały są bezpłatne.
                        </p>
                    </li>
                    <li>
                        <p>Czy jest jakaś umowa?</p>
                        <p>
                            Tak, mamy umowę cywilnoprawną. Nie jest ona
                            zobowiązująca i możesz z niej w każdym momencie
                            zrezygnować. Taki rodzaj umowy nie zapewnia nam
                            składek emerytalnych, rentowych ani zdrowotnych.
                            Jest ona tylko podstawą do wypłaty wynagrodzenia.
                            Umowę zawierasz drogą elektroniczną podczas
                            rejestracji, akceptując regulamin programu
                            partnerskiego.
                        </p>
                    </li>
                    <li>
                        <p>
                            Czy muszę podpisywać umowę przed wypłatą pierwszego
                            wynagrodzenia?
                        </p>
                        <p>
                            Zgodnie z zapisem §3 pkt 2 oraz pkt 6
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.comperialead.pl/regulamin"
                            >
                                {' '}
                                regulaminu{' '}
                            </a>
                            Programu Partnerskiego ComperiaLead:
                        </p>
                        <p>
                            <q>
                                Zawarcie Umowy następuje po wypełnieniu
                                Formularza Rejestracji przez Usługobiorcę oraz
                                oświadczeniu o akceptacji Regulaminu poprzez
                                zaznaczenie stosownego pola checkbox
                            </q>
                        </p>
                        <p>
                            <q>
                                Umowa zostaje zawarta z chwilą aktywacji Konta
                                przez Usługodawcę. Usługobiorca, o aktywacji
                                Konta, zostaje poinformowany na podany w
                                Formularzu Rejestracji adres poczty
                                elektronicznej
                            </q>
                        </p>
                        <p>
                            W związku z powyższym,{' '}
                            <b>
                                nie ma konieczności podpisywania umowy w wersji
                                papierowej
                            </b>
                            .
                        </p>
                    </li>
                    <li>
                        <p>Czy program jest legalny?</p>
                        <p>
                            Tak, właścicielem serwisu, do którego się
                            rejestrujemy, jest program partnerski Comperialead,
                            który należy do spółki Comperia.pl S.A. z siedzibą w
                            Warszawie.
                        </p>
                    </li>
                    <li>
                        <p>
                            Kiedy i w jaki sposób otrzymam zarobione pieniądze?
                        </p>
                        <p>
                            Wypłaty wynagrodzeń odbywają się w cyklu
                            miesięcznym, na podstawie rachunków/faktur
                            wygenerowanych, bądź wgranych do systemu i
                            przesłanych do Comperialead każdorazowo na
                            odpowiedni adres mailowy. Bez obaw! Pomagam każdej
                            osobie wypłacić swoje wynagrodzenie 🙂
                        </p>
                    </li>
                    <li>
                        <p>Ile mogę zarobić w Waszym Programie Partnerskim?</p>
                        <p>
                            W ComperiaLead nie ma żadnych limitów! Wydawcy
                            zarabiają miesięcznie od kilku-kilkunastu złotych aż
                            po liczby 6 cyfrowe! Wszystko zależy od twojego
                            zaangażowania 😉
                        </p>
                    </li>
                    <li>
                        <p>Czy trzeba rozliczać się z Urzędem Skarbowym?</p>
                        <p>
                            Tak, dlatego, bo jest to praca legalna. Rozliczamy
                            się z każdego wpływu na konto raz w miesiącu. Formę
                            rozliczania możemy sobie wybrać samemu. Może to być
                            na zasadach ogólnych i wtedy oddajemy 17% podatku od
                            zarobionych pieniędzy bądź ryczałtem 8,5%.
                            Najczęściej wybieramy formę ryczałt, ale o tym mowa
                            dokładnie w 7 etapie, kiedy już zarabiasz większe
                            pieniądze.
                        </p>
                        <p>
                            <b>
                                Nie zostajesz z tym sam/a, wszystko Ci
                                dokładniej powiem jak będzie trzeba się
                                rozliczać!
                            </b>
                        </p>
                    </li>
                    <li>
                        <p>
                            Pracuje na pełen etat, czy tą pracę mogę traktować
                            jako dodatkową?
                        </p>
                        <p>
                            Jeśli pracujesz na etat, jak najbardziej możesz
                            sobie tutaj dorabiać
                        </p>
                        <p>Mogą tutaj pracować osoby:</p>
                        <ul>
                            <li>Pracujące na etacie</li>
                            <li>
                                Będące na urlopie macierzyńskim bądź
                                wychowawczym
                            </li>
                            <li>Osoby ubezpieczone w KRUS</li>
                            <li>
                                osoby zarejestrowane w urzędzie pracy, lecz nie
                                pobierające zasiłku (tzw. kuroniówki)
                            </li>
                        </ul>
                        <p>Lecz, nie mogą pracować tutaj osoby, które: </p>
                        <ul>
                            <li>Są na L4</li>
                            <li>
                                Pobierają zasiłki typu: na niepełnosprawnego
                                członka rodziny, renty rodzinne, czy renty
                                chorobowe - w tej sytuacji powinny się
                                dowiedzieć u źródła czy mogą sobie dorobić, bo
                                jest możliwość dorobienia do pewnej kwoty…
                            </li>
                            <li>Są zadłużone</li>
                        </ul>
                    </li>
                    <li>
                        <p>Czy mogę zrezygnować w dowolnym momencie?</p>
                        <p>
                            Tak, nie ma tutaj okresu wypowiedzenia, jak w
                            przypadku umowy o pracę, ani nie jesteś z niczym
                            zobowiązany. Jeśli zdecydujesz, że chcesz
                            zrezygnować, możesz to zrobić w każdej chwili,
                            usuwając swoje konto z panelu.
                        </p>
                    </li>
                    <li>
                        <p>Kiedy dostaję wypłatę?</p>
                        <p>Wynagrodzenie jest przelewane raz w miesiącu</p>
                    </li>
                    <li>
                        <p>Jaką mam pewność, że otrzymam pieniądze?</p>
                        <p>
                            Program partnerski, z którym współpracujemy istnieje
                            od 2008r - jest to firma zarejestrowana i w 100%
                            wypłacalna, na podstawie zawartej umowy.
                        </p>
                    </li>
                    <li>
                        <p>Czy trzeba brać pożyczki/kredyty?</p>
                        <p>
                            Są projekty, które skupiają się na tych produktach i
                            z nich korzystają, jednak u nas tego nie ma.
                            <b> Nigdy </b>
                            nikt nie powie, że trzeba wziąć kredyt, czy
                            pożyczkę. W naszym projekcie jest to{' '}
                            <b>NIEDOPUSZCZALNE i ZABRONIONE</b>!
                        </p>
                    </li>
                    <li>
                        <p>Po co jest ta strona i jak z niej korzystać?</p>
                        <p>
                            Stronę tą stworzyłem w celu ułatwienia całego
                            procesu sobie jak i Tobie. Dzięki niej mogę do
                            każdego indywidualnie przypisywać dostęp do
                            kolejnych etapów. Aby z niej korzystać wystarczy, że
                            zalogujesz się przez facebooka korzystając z
                            przycisku w nawigacji, na górze strony.
                        </p>
                    </li>
                    <li>
                        <p>Czemu mam logować się przez facebooka?</p>
                        <p>
                            Ponieważ i tak kontaktujemy się przez facebooka, a
                            logowanie tutaj przy użyciu tamtego konta bardzo
                            ułatwia proces połączenia tego z kim rozmawiam przez
                            messengera, a kogo mam kliknąc tutaj.
                        </p>
                    </li>
                    <li>
                        <p>Czy bezpiecznie jest logować się przez facebooka?</p>
                        <p>
                            Nie chcę wchodzić za bardzo w sprawy techniczne,
                            więc powiem w skrócie - korzystam z narzędzi
                            stworzonych przez facebooka, które powstały właśnie
                            w tym celu - uwierzetylnianiu użytkownika przez
                            facebookowe konta.
                        </p>
                    </li>
                    <li>
                        <p>
                            Skoro loguje się tu przez facebooka to jakie dane są
                            przechowywane przez tę stronę?
                        </p>
                        <p>Danymi, którę przechowuej są:</p>
                        <ul>
                            <li>Imię i nazwisko</li>
                            <li>Link do zdjęcia profilowego</li>
                            <li>
                                Id tworzone przez facebooka, tylko w celu
                                połączenia konta FB i lokalnego
                            </li>
                        </ul>
                        <p>
                            Tylko tyle, więcej informacji nie potrzebuję,
                            wszystkie Twoje informacje są wykorzystywane tylko w
                            celu dawania ci dostępu do kolejnych etapów. Nie
                            podaje ich dalej, ani nie wykorzuje ich w żadnym
                            innym celu. Dodatkowo, są to informacje, które może
                            zobaczyć każdy po prostu wyszukując cię na
                            facebooku, bądź messengerze. Możesz je także w
                            każdym momencie usunąć korzystając z przycisku
                            znajdującego się na Twoim profilu. W razie
                            jakichkolwiek wątpliwości możesz się ze mną
                            kontaktować przez messengera.
                        </p>
                    </li>
                </ol>
                <p>
                    Jeżeli dalej nie znalazłeś/aś odpowiedzi na swoje pytanie
                    sprwadź w{' '}
                    <a
                        href="https://blog.comperialead.pl/category/faq/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        FAQ comperialead
                    </a>
                    .
                </p>
            </div>
        </ArticleNoParse>
    )
}

export default Faq
