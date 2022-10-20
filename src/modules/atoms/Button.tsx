import { Children } from '@/types/children'
import classnames from 'classnames'

import style from './Button.module.scss'

type ButtonProps = {
    className?: string
    type?: 'button' | 'submit'
    [x: string]: any
} & Children

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
