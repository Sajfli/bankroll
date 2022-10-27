import { genId } from '@/utils/genKey'
import { useEffect, useState } from 'react'
import style from './FileInput.module.scss'

const FileInput = ({
    handleFileChange,
}: {
    handleFileChange?: (file: File) => void
}) => {
    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const [id, setId] = useState<string | null>(null)

    useEffect(() => {
        if (!id) setId(genId('file'))
    }, [id])

    useEffect(() => {
        if (!file) return
        if (handleFileChange) handleFileChange(file)

        const objectURL = URL.createObjectURL(file)
        setPreview(objectURL)

        return () => URL.revokeObjectURL(objectURL)
        // eslint-disable-next-line
    }, [file])

    if (!id) return null

    return (
        <div className={style.fileInput}>
            <label htmlFor={id} className={style.label}>
                <div>{fileName ? fileName : 'Wybierz plik'}</div>
            </label>

            <input
                type="file"
                onChange={({ target }: { target: HTMLInputElement }) => {
                    if (!target.files || target.files.length < 1) return
                    setFile(target.files[0])
                    if (target.value && typeof target.value === 'string')
                        setFileName(target.value.split('\\').at(-1)!)
                }}
                className={style.input}
                id={id}
            />

            <div className={style.preview}>
                {preview && <img src={preview} alt="" />}
            </div>
        </div>
    )
}

export default FileInput
