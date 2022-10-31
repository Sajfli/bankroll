import classNames from 'classnames'
import style from './TextArea.module.scss'

type TextAreaProps = {
    className?: string
    defaultValue?: string
    [x: string]: any
} & React.TextareaHTMLAttributes<any>

const TextArea = ({ className, defaultValue, ...rest }: TextAreaProps) => {
    return (
        <textarea
            {...rest}
            defaultValue={defaultValue || ''}
            className={classNames(style.textarea, className && className)}
        ></textarea>
    )
}

export default TextArea
