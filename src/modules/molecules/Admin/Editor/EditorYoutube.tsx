import Button from '@/modules/atoms/Button'
import TextInput from '@/modules/atoms/TextInput'
import { PropsForEditorSimple } from './EditorSimple'

import style from './EditorInputs.scss'
import useToast from '@/hooks/useToast'
import { useEffect, useState } from 'react'
import IFrame from '@/modules/atoms/IFrame'

const EditorYoutube = ({ handler, value }: PropsForEditorSimple) => {
    const toast = useToast()

    const [preview, setPreview] = useState<string>(value || '')
    const [allowPreview, setAllowPreview] = useState<boolean>(false)

    //Xo8QvY0jOOE

    useEffect(() => {
        setAllowPreview(false)
    }, [preview])

    const handleCheck = () => {
        if (preview && preview.length > 5) {
            setAllowPreview(true)
        }
    }

    return (
        <div>
            <b>Youtube</b>
            <div>
                <div className="editor_yt">
                    <div>
                        <TextInput
                            defaultValue={value}
                            label="Embed code"
                            handleInput={(value) => {
                                setPreview(value)
                                handler.handleParagraphChange(value)
                            }}
                        />
                    </div>
                    <div>
                        <Button onClick={handleCheck}>Sprawdź</Button>
                    </div>
                    {allowPreview && (
                        <div>
                            <IFrame src={preview} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditorYoutube
