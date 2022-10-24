import { NodeChildrenType } from '@/types/children'
import classnames from 'classnames'

import style from './Button.module.scss'

type ButtonProps = {
    className?: string
    type?: 'button' | 'submit'
    children: NodeChildrenType | NodeChildrenType[] | string
    [x: string]: any
}

const Button = ({ children, type, className, ...rest }: ButtonProps) => {
    return (
        <button
            {...rest}
            type={type || 'button'}
            className={classnames(style.button, className)}
        >
            {children}
        </button>
    )
}

export default Button
