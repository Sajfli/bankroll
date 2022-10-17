import style from './Navigation.module.scss'
import { Link } from 'react-router-dom'
import { Key, ReactElement, useEffect, useState } from 'react'
import { Path } from '@/types/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

import fb_logo from '@/_res/img/f_logo_RGB-Blue_58.png'

const images = {
    facebook: fb_logo,
}

const Lnk = ({
    location,
    external,
    children,
}: {
    location: string
    external: boolean
    children: ReactElement
}) => {
    if (external)
        return (
            <a href={location} className={style.link}>
                {children}
            </a>
        )
    else
        return (
            <Link to={location} className={style.link}>
                {children}
            </Link>
        )
}

const NavEntryContent = ({ label, icon, localImage, image }: Path) => {
    return (
        <>
            {icon && <FontAwesomeIcon className={style.icon} icon={icon} />}
            {localImage && (
                <img src={images[localImage]} alt="" className={style.img} />
            )}
            {image && <img src={image} alt="" className={style.img} />}
            {label}
        </>
    )
}

const NavEntry = ({
    label,
    location,
    icon,
    localImage,
    external,
    image,
    subpaths,
    mobile,
}: Path & { mobile?: boolean }) => {
    if (!external) external = false

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
        >
            <Lnk external={external} location={location}>
                <NavEntryContent
                    label={label}
                    location={location}
                    icon={icon}
                    localImage={localImage}
                    image={image}
                />
            </Lnk>
            {subpaths && (
                <ul className={style.subpaths}>{subpaths.map(NavEntry)}</ul>
            )}
        </li>
    )
}

const Navigation = ({ paths }: { paths: Path[] }) => {
    const [mobile, setMobile] = useState<boolean>(false)

    useEffect(() => {
        let isMounted = true

        const onResize = (e?: any) => {
            if (!isMounted) return
            if (window.innerWidth <= 650) setMobile(true)
            else setMobile(false)
        }

        window.addEventListener('resize', onResize)

        onResize()

        return () => {
            isMounted = false
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <nav className={classnames(style.nav, mobile && style.mobile)}>
            <ul>{paths.map((props) => NavEntry({ ...props, mobile }))}</ul>
        </nav>
    )
}

export default Navigation
