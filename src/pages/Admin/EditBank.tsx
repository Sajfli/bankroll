import useToast from '@/hooks/useToast'
import BankEditor from '@/modules/organisms/Admin/Editor/BankEditor'
import { Bank } from '@/types/utils'
import { handleKyErrorToastWithoutLoading } from '@/utils/handleKyError'
import ky from 'ky'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditBank = () => {
    const { bank } = useParams()
    const toast = useToast()

    const [name, setName] = useState<string>('')
    const [img, setImg] = useState<string>('')
    const [id, setId] = useState<string>('')
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        if (!bank) return

        if (bank.toLocaleLowerCase() === 'new') {
            setId('new')
            setName('')
            setImg('')
            setActive(true)
        } else {
            ;(async () => {
                try {
                    const res = (await ky
                        .get(`/api/v1/content/banks/${bank}`)
                        .json()) as {
                        ok: boolean
                        content: Bank & { _id?: string }
                    }
                    if (!res.ok || !res.content) throw Error()

                    res.content.id = res.content._id!
                    delete res.content._id

                    const content = res.content

                    setName(content.name)
                    setImg(content.img || '')
                    setId(content.id)
                    setActive(content.active)
                } catch (err) {
                    handleKyErrorToastWithoutLoading(err, toast)
                }
            })()
        }
        // eslint-disable-next-line
    }, [bank])

    return (
        <BankEditor
            defaultName={name}
            defaultImg={img}
            defaultId={id}
            defaultActive={active}
        />
    )
}

export default EditBank
