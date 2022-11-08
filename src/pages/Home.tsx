import useAutoRedirect from '@/hooks/useAutoRedirect'
import { ArticleNoParse } from '@/modules/organisms/Article'
import { Link } from 'react-router-dom'

const Home = () => {
    useAutoRedirect()

    return (
        <ArticleNoParse type="stage">
            <h1>Witaj na mojej stronie</h1>
            <p>
                Ta strona powstała po to, żebyś nauczył się zarabiać bez
                wychodzenia z domu. Wszelkie informację znajdziesz w etapach,
                zaczynając od <Link to="/etap/1">etapu pierwszego</Link>!
            </p>
            <div className="part">
                <p>Możesz również dowiedzieć się więcej poprzez</p>
                <p>
                    <Link to="/faq">Najczęściej zadawane pytania</Link>
                </p>
            </div>
            <div className="part">
                <h2>W dużym skrócie</h2>
                <p>
                    Praca, którą Ci tutaj pokażę polega na współpracy z
                    programami partnerskimi. Jest to w pełni legalne. Jedyne
                    warunki jakie musisz spełnić to:
                </p>
                <ul>
                    <li>Mieć ukończone 18 lat</li>
                    <li>Posiadać Polskie obywatelstwo</li>
                    <li>Mieszkać w polsce</li>
                    <li>Mieć chęci do nauczenia się czegoś nowego</li>
                </ul>
            </div>
            <div className="part">
                <h2>Po co jest ta strona i jak z niej korzystać?</h2>
                <p>
                    Wszystkiego dowiesz się <Link to="/faq#14">tutaj</Link>
                </p>
            </div>
        </ArticleNoParse>
    )
}

export default Home
