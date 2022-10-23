import style from './Panel.module.scss'
import classnames from 'classnames'

import { Link, Outlet } from 'react-router-dom'

import {
    faNewspaper,
    faBuildingColumns,
    faUsers,
    faChartSimple,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Panel = () => {
    return (
        <div className={classnames(style.panel, 'defaultFormatting')}>
            <h1 className="header">Panel</h1>
            <div className={style.opts}>
                <div>
                    <Link to="/panel/articles">
                        <FontAwesomeIcon icon={faNewspaper} />{' '}
                        <span>Artykuły</span>
                    </Link>
                </div>
                <div>
                    <Link to="/panel/banks">
                        <FontAwesomeIcon icon={faBuildingColumns} />{' '}
                        <span>Banki i konta</span>
                    </Link>
                </div>
                <div>
                    <Link to="/panel/users">
                        <FontAwesomeIcon icon={faUsers} />{' '}
                        <span>Użytkownicy</span>
                    </Link>
                </div>
                <div>
                    <Link to="/panel">
                        <FontAwesomeIcon icon={faChartSimple} />{' '}
                        <span>Statystyki</span>
                    </Link>
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default Panel
