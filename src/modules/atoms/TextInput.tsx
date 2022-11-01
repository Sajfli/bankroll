import { useState, useEffect } from 'react'
import classnames from 'classnames'
import style from './TextInput.module.scss'

type TextInputProps = {
    label: string
    containerClassName?: string
    handleInput?: (value: string) => void
    defaultValue?: string
    value?: string
    setValue?: (value: string) => void
    [x: string]: any
}

const TextInput = ({
    label,
    containerClassName,
    handleInput,
    defaultValue,
    value: _value,
    setValue: _setValue,
    ...rest
}: TextInputProps) => {
    const [focused, setFocused] = useState<boolean>(false)
    const [value, setValue] = useState<string>(defaultValue || '')

    const handleFocusChange = (change: boolean) => {
        const val = _value || value

        if (change) setFocused(true)
        if (!change && val === '') setFocused(false)
    }

    useEffect(() => {
        if (defaultValue) handleFocusChange(true)

        // eslint-disable-next-line
    }, [defaultValue])

    useEffect(() => {
        if (!!handleInput) handleInput(value)
    }, [value, handleInput])

    const val = _value || value
    const setVal = _setValue || setValue

    return (
        <div className={classnames(style.textInput, containerClassName)}>
            <div className={classnames(style.label, focused && style.focused)}>
                <div>{label}</div>
            </div>
            <input
                value={val}
                onInput={(e) => {
                    const target = e.target as HTMLInputElement
                    setVal(target.value)
                }}
                type="text"
                onFocus={() => handleFocusChange(true)}
                onBlur={() => handleFocusChange(false)}
                {...rest}
            />
        </div>
    )
}

export default TextInput
