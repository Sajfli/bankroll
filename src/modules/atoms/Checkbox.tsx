import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './Checkbox.module.scss'

type CheckboxProps = {
    children: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    [key: string]: any
}

const Checkbox = ({ children, onChange, ...rest }: CheckboxProps) => {
    return (
        <div className={style.checkbox}>
            <label>
                <input onChange={onChange} {...rest} type="checkbox" />
                <div className={style.checkboxInput}>
                    <div className={style.icon}>
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                </div>
                <span className={style.label}>{children}</span>
            </label>
        </div>
    )
}

export default Checkbox
