import propTypes from 'prop-types'
import Frame from '../atoms/Frame'
import { Link } from 'react-router-dom'
import './ErrorMessage.scss'

const ErrorMessage = ({ children }: { children: string }) => {
    return (
        <Frame className="errorMessage">
            <h1>Wystąpił błąd:</h1>
            <h2>{children}</h2>
            <Link to="/">Wróć na stronę główną</Link>
        </Frame>
    )
}

ErrorMessage.propTypes = {
    children: propTypes.string.isRequired,
}

export default ErrorMessage
