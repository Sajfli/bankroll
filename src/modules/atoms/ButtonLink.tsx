import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import style from './Button.module.scss'

type ButtonLinkProps = {
    plain?: boolean
    to: string
    children: string
}

const ButtonLink = ({ plain, to, children }: ButtonLinkProps) => {
    if (plain)
        return (
            <a className={style.button} href={to}>
                {children}
            </a>
        )

    return (
        <Link className={style.button} to={to}>
            {children}
        </Link>
    )
}

ButtonLink.propTypes = {
    plain: PropTypes.string,
    to: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
}

export default ButtonLink
