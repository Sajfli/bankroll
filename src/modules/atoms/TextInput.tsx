import { useState, useEffect } from 'react'
import classnames from 'classnames'
import style from './TextInput.module.scss'

type TextInputProps = {
    label: string
    containerClassName?: string
    handleInput?: (value: string) => void
    defaultValue?: string
    [x: string]: any
}

const TextInput = ({
    label,
    containerClassName,
    handleInput,
    defaultValue,
    ...rest
}: TextInputProps) => {
    const [focused, setFocused] = useState<boolean>(false)
    const [value, setValue] = useState<string>(defaultValue || '')

    const handleFocusChange = (change: boolean) => {
        if (change) setFocused(true)
        if (!change && value === '') setFocused(false)
    }

    useEffect(() => {
        if (defaultValue) handleFocusChange(true)
    }, [defaultValue])

    useEffect(() => {
        if (!!handleInput) handleInput(value)
    }, [value])

    return (
        <div className={classnames(style.textInput, containerClassName)}>
            <div className={classnames(style.label, focused && style.focused)}>
                <div>{label}</div>
            </div>
            <input
                value={value}
                onInput={(e) => {
                    const target = e.target as HTMLInputElement
                    setValue(target.value)
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
