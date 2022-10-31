import { useEffect, useState } from 'react'
import ky, { HTTPError } from 'ky'
import propTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

import ParseArticle from '@/modules/organisms/Article'
import { Article } from '@/types/utils'

const Stage = ({ stage }: { stage: number }) => {
    const [stageContent, setStageContent] = useState<Article | null>(null)
    const [error, setError] = useState<number | null>(null)

    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const response = await ky.get(
                    '/api/v1/content/article/stage' + stage
                )
                const data = (await response.json()) as {
                    ok: boolean
                    article: Article
                }

                if (!data || !data.ok || !data.article) throw Error()

                if (mounted) setStageContent(data.article)
            } catch (err) {
                setStageContent(null)

                if ((err! as HTTPError).response) {
                    try {
                        const error = (err as HTTPError).response
                        if (error.status === 404) setError(404)
                        else setError(400)
                    } catch (err) {
                        setError(500)
                    }
                }
            }
        })()
        return () => {
            mounted = false
        }
    }, [stage])

    if (error) {
        if (error === 404) return <Navigate to="/404" />
        else return <Navigate to="/" />
    }

    return (
        <div className="stage">
            <ParseArticle article={stageContent} type="stage" />
            {/* <article>
                <h1 className="stage_header">Etap {stage}</h1>
                <q>Do odważnych świat należy!</q>
                <div className="part">
                    <p>
                        <b>Witam cię serdecznie w etapie drugim!</b>
                    </p>
                    <p>
                        Cieszę się, że tutaj jesteś i zdecydowałaś/eś się na
                        dalszą współpracę 😊 Poznałaś/eś już naszą super ekipę
                        na czacie etapu 2. Mam nadzieję, że również i Ty z nami
                        zostaniesz i w dalszym ciągu będziesz częścią naszego
                        zespołu 🙂 Z reguły jest tak, że albo poddajemy się na
                        samym początku albo centymetr przed metą. Mam nadzieję,
                        że Ty wytrwasz do końca i zaczniesz zarabiać razem z
                        nami spore pieniądze! Dla niektórych najtrudniejsze jest
                        podjęcie decyzji i zdecydowanie się na działanie. To czy
                        znajdziemy się na mecie to już tylko kwestia
                        determinacji i wytrwałości! Pierwsze etapy dadzą Ci
                        możliwość zarobienia nawet 1000-2000zł ! A to ile w tym
                        czasie zarobisz zależy tylko od Ciebie 🙂 Teraz
                        przedstawię Ci produkt finansowy, na którym będziemy
                        pracować i zarabiać.
                    </p>
                    <p>
                        Produkty, na których pracujemy to darmowe konta bankowe.
                        Czytając to być może dziwisz się jak można na tym
                        zarobić, ale tak jest. Banki chcą pozyskać klienta i
                        muszą wydawać miliony na reklamę TV, płacąc też ró żnym
                        znanym osobom. Dlatego większość banków pozwala zarobić
                        na polecaniu swoich produktów za pomocą sieci
                        afiliacyjnych czyli programów partnerskich. Każdy nowy
                        pozyskany klient to zarobek, a skoro bank zarobi to i ty
                        również 😀
                    </p>
                </div>

                <div className="part">
                    <h2 className="stage_header">Konta bankowe?</h2>
                    <p>
                        Wiele ludzi boi się kont bankowych - rozumiem dlaczego -
                        też tak na początku miałem. Bałem się ukrytych opłat,
                        zobowiązań. Okazało się, że niesłusznie, w późniejszej
                        części tego etapu wytłumaczę co i jak. Ale pamiętaj -
                        konta bankowe są dla ludzi, a banki zrobią wszystko,
                        żeby przyciągać klientów, a nie ich odpychać! Pamiętaj
                        też, że ja tak samo jak Ty teraz zaczynałem tu od zera,
                        pełny wątpliwości, a w tym momencie tworzę tę stronę dla
                        osób takich jak Ty, aby pokazać Tobie co i jak, i żebyś
                        mógł/mogła zarabiać bezwychodzenia z domu.
                    </p>
                    <p>
                        Konta bankowe traktujemy jako produkty, dzięki którym
                        możesz zarabiać. Ale żeby tak było, trzeba je najpierw
                        poznać, przetestować na sobie od podstaw, zobaczyć jak
                        działają i w jaki sposób się je zakłada. Trzeba umieć
                        porównać je, poznając ich wady i zalety. I właśnie
                        poznając produkt od A do Z masz o nim pełną wiedzę, bo
                        żeby być w czymś dobrym - trzeba się na tym znać.
                    </p>
                    <p>
                        Postaram Ci się to wytłumaczyć na prostym przykładzie:
                        idziesz do Media Markt i chcesz kupić lodówkę, więc
                        oczekujesz, że osoba, która tam pracuje będzie się znała
                        na lodówkach i doradzi Ci coś na temat produktu który
                        chcesz kupić, lub zaproponuje lepszy (musi mieć wiedzę o
                        lodówkach). I tutaj jest tak samo, żeby coś polecać
                        musisz znać produkt. Moim zadaniem jest nauczyć Ciebie
                        jak skutecznie, dzięki odpowiedniej wiedzy, narzędziom i
                        szkoleniom poruszać się i pracować w programach
                        partnerskich i być w tym dobrym!
                    </p>
                    <p>
                        <b>
                            Dlatego, żeby te konta przetestować - musisz je
                            założyć i są to 4 konta bankowe.
                        </b>
                    </p>
                    <p>
                        Dodatkowo etap 2 ma na celu pokazać nam sposób w jaki
                        możemy zaoszczędzić pieniądze
                    </p>
                </div>
                <div className="part">
                    <h2 className="stage_header">Metoda 6 słoików</h2>
                    <div className="rl">
                        <figure className="image">
                            <a href="/6sloikow.jpeg" target="_blank">
                                <img src="6sloikow.jpeg" alt="" />
                            </a>
                            <figcaption className="smallerText">
                                Grafika przedstawia przykład metody 6 słoików.
                                Źródło grafiki:{' '}
                                <a
                                    href="https://totalmoney.pl"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    totalmoney.pl
                                </a>
                            </figcaption>
                        </figure>
                        <div>
                            <p>
                                System 6 słoików stworzył T. Harv Eker, urodzony
                                w Kanadzie mówca motywacyjny i guru finansowy.
                                Twierdzi, że system słoików jest bardzo
                                skuteczną metodą zarządzania pieniędzmi. Do
                                stosowania tej metody możemy oczywiście użyć
                                tytułowych słoików, ale znacznie łatwiejsze jest
                                skorzystanie całkowicie oddzielnych kont
                                bankowych.
                            </p>
                            <p>
                                Cały system polega na podzieleniu każdego
                                otrzymanego dochodu na 6 części i trzymania się
                                tego podziału. Łatwiej kontrolować mniejsze i
                                ściślej określone sfery wydatków niż całość
                                jednocześnie. Niestety realia dla każdego są
                                inne. Jeśli większość Twoich zarobków
                                pochłaniają same rachunki i jedzenie, to z
                                pewnością będzie Ci trudno dociągnąć do podanych
                                wartości. Nie przejmuj się tym. Te wartości
                                procentowe nie są jedynym słusznym wyznacznikiem
                                i nie powinieneś do nich dążyć za wszelką cenę.
                                To jedynie drogowskaz. Samo rozpoczęcie takiego
                                rozdzielania pieniędzy zbliża Cię do dużo
                                lepszego rozwiązania, którym jest budżet domowy.
                                W mojej opinii metoda 6 słoików nie tyle służy
                                osiągnięciu celu, co bardziej wyrobieniu nawyku
                                i przejęcia namiastki kontroli.
                            </p>
                        </div>
                    </div>
                    <p>
                        Dlaczego akurat konta bankowe? Jest to prosta odpowiedź
                        - prawie każdy z nas posiada przynajmniej jedno konto
                        bankowe, dlatego będzie to dla Ciebie najprostsze
                        zadanie na początek 🙂
                    </p>
                    <p>
                        Jeżeli masz obawy czy możesz mieć tyle kont, czy to jest
                        legalne to odpowiedź brzmi: każdy może mieć kilkanaście
                        kont bankowych i nie jest to w jakikolwiek sposób
                        niezgodne z prawem. Nie musisz mi wierzyć możesz to
                        sobie sprawdzić w internecie.
                    </p>
                    <p>
                        <a
                            href="https://m.me/szymon.jez.773/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Napisz więc proszę do mnie
                        </a>{' '}
                        czy chcesz spróbować i przekonać się na własnej skórze,
                        że DA SIĘ zarabiać w internecie.{' '}
                        <b>
                            Jeśli masz jakieś pytania lub wątpliwości to pisz
                            śmiało.
                        </b>
                    </p>
                </div>

                <div className="part">
                    <h2 className="stage_header">
                        Zakładanie darmowych kont 🏦
                    </h2>

                    <p>
                        <b>
                            Załóż 4 konta banowe i zgarnij 200-1000zł już na tym
                            etapie!
                        </b>
                    </p>
                    <p>
                        <b>Zanim zaczniesz cokolwiek robić</b> i dojdziesz do
                        tego momentu, napisz koniecznie do mnie{' '}
                        <a
                            href="https://m.me/szymon.jez.773/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            na messengerze
                        </a>
                        , że zamierzasz zakładać konta, ponieważ niektóre osoby
                        robią to w pośpiechu, nie doczytując do końca 2 etapu i
                        przez to wnioski nie wpisują się poprawnie w panelu 😕
                    </p>
                </div>

                <div className="part">
                    <h2 className="stage_header">
                        Lista banków (Październik 2022)
                    </h2>

                    <Banks />
                </div>
            </article> */}
        </div>
    )
}

Stage.propTypes = {
    stage: propTypes.number,
}

export default Stage
