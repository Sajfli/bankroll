import style from './Navigation.module.scss'
import { Link } from 'react-router-dom'
import { Key, ReactElement } from 'react'
import { Path } from '@/types/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

import fb_logo from '@/_res/img/f_logo_RGB-Blue_58.png'

const images = {
    facebook: fb_logo,
}

const Lnk = ({
    location,
    type,
    children,
    handler,
}: {
    location: string
    type: Path['type']
    children: ReactElement
    handler: Path['handler']
}) => {
    if (type === 'external')
        return (
            <a href={location} className={style.link}>
                {children}
            </a>
        )
    else if (type === 'handler')
        return (
            <span className={style.link} onClick={handler}>
                {children}
            </span>
        )
    else
        return (
            <Link to={location} className={style.link}>
                {children}
            </Link>
        )
}

const NavEntryContent = ({
    label,
    icon,
    localImage,
    image,
    mobile,
}: Path & { mobile?: boolean }) => {
    return (
        <>
            {icon && <FontAwesomeIcon className={style.icon} icon={icon} />}
            {localImage && (
                <img src={images[localImage]} alt="" className={style.img} />
            )}
            {image && <img src={image} alt="" className={style.img} />}
            {!mobile && label}
        </>
    )
}

const NavEntry = ({
    label,
    location,
    icon,
    localImage,
    type,
    image,
    subpaths,
    mobile,
    handler,
}: Path & { mobile?: boolean }) => {
    if (!type) type = 'internal'

    return (
        <li
            key={label as Key}
            onClick={(e) => {
                if (!mobile || !subpaths || subpaths.length < 1) return
                const target = e.currentTarget as HTMLLIElement

                if (!target.classList.contains(style.open))
                    target.classList.add(style.open)
                else target.classList.remove(style.open)
            }}
            title={label}
        >
            <Lnk type={type} location={location} handler={handler}>
                <NavEntryContent
                    label={label}
                    location={location}
                    icon={icon}
                    localImage={localImage}
                    image={image}
                    mobile={mobile}
                />
            </Lnk>
            {subpaths && (
                <ul className={style.subpaths}>{subpaths.map(NavEntry)}</ul>
            )}
        </li>
    )
}

const Navigation = ({ paths, mobile }: { paths: Path[]; mobile: boolean }) => {
    return (
        <nav className={classnames(style.nav, mobile && style.mobile)}>
            <ul>{paths.map((props) => NavEntry({ ...props, mobile }))}</ul>
        </nav>
    )
}

export default Navigation
