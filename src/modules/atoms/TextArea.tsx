import classNames from 'classnames'
import style from './TextArea.module.scss'

type TextAreaProps = {
    className?: string
    [x: string]: any
} & React.TextareaHTMLAttributes<any>

const TextArea = ({ className, ...rest }: TextAreaProps) => {
    return (
        <textarea
            {...rest}
            className={classNames(style.textarea, className && className)}
        ></textarea>
    )
}

export default TextArea
