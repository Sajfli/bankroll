import useToast from '@/hooks/useToast'
import Button from '@/modules/atoms/Button'
import Checkbox from '@/modules/atoms/Checkbox'
import TextInput from '@/modules/atoms/TextInput'
import FileInput from '@/modules/molecules/FileInput'
import { Bank } from '@/types/utils'
import { handleKyErrorToastWithoutLoading } from '@/utils/handleKyError'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ky from 'ky'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

import style from './BankEditor.module.scss'

type BankEditorProps = {
    defaultName: string
    defaultId: string
    defaultImg: string
    defaultActive: boolean
}

type OutletContextType = {
    setBanks: (banks: Bank[]) => void
}

const BankEditor = ({
    defaultName,
    defaultId,
    defaultImg,
    defaultActive,
}: BankEditorProps) => {
    const [name, setName] = useState<string>('')
    const [img, setImg] = useState<string>('')
    const [id, setId] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const [active, setActive] = useState<boolean>(false)

    const { setBanks }: OutletContextType = useOutletContext()

    const toast = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        setName(defaultName)
        setImg(defaultImg)
        setId(defaultId)
        setActive(defaultActive)
    }, [defaultName, defaultId, defaultImg, defaultActive])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (!name) throw Error('invalid_data')

            const body = new FormData()

            body.append('name', name)
            body.append('id', id)
            body.append('active', `${active}`)
            if (file) body.append('file', file)
            body.append('img', img)

            const response = (await ky
                .put('/api/v1/content/banks', {
                    body,
                })
                .json()) as {
                ok: boolean
                content?: (Bank & { _id?: string })[]
            }

            if (!response.ok) throw Error()

            if (response.content && Array.isArray(response.content))
                setBanks(
                    response.content.map((bank) => {
                        bank.id = bank._id!
                        delete bank._id
                        return bank
                    })
                )

            toast.success(`${name} został zapisany`)

            navigate('/panel/banks')
        } catch (err: any) {
            handleKyErrorToastWithoutLoading(err, toast)
        }
    }

    return (
        <div className={style.form}>
            <div className={style.topBar}>
                <Link to="/panel/banks">
                    <FontAwesomeIcon icon="xmark" className="hover__red" />
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextInput
                        setValue={setName}
                        defaultValue={name}
                        value={name}
                        label="Nazwa banku"
                    />
                </div>
                <div>
                    <FileInput
                        handleFileChange={setFile}
                        handleFileCaptionChange={() => {}}
                        defaultValue={img}
                    />
                </div>
                <div>
                    <Checkbox
                        checked={active}
                        onChange={({
                            target,
                        }: React.ChangeEvent<HTMLInputElement>) => {
                            setActive(target.checked)
                        }}
                    >
                        Aktywny
                    </Checkbox>
                </div>
                <div>
                    <Button type="submit">Zapisz</Button>
                </div>
            </form>
        </div>
    )
}

export default BankEditor
