import { useEffect } from 'react'
import { Bank } from '@/types/utils'
import useToast, { standardUpdateOptions } from '@/hooks/useToast'
import ky from 'ky'
import {
    handleKyErrorToast,
    handleKyErrorToastWithoutLoading,
} from '@/utils/handleKyError'
import LoaderScreen from '../LoaderScreen'

import style from './BanksList.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'
import Button from '@/modules/atoms/Button'
import { Link, useNavigate } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'

const BanksList = ({
    setBanks,
    banks,
}: {
    banks: Bank[] | null
    setBanks: (banks: Bank[]) => void
}) => {
    const toast = useToast()
    const modal = useModal()
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true

        ;(async () => {
            try {
                const response = (await ky
                    .get('/api/v1/content/banks')
                    .json()) as { ok: boolean; content: Bank[] }

                if (!response || !response.ok) throw Error()

                if (mounted && Array.isArray(response.content))
                    setBanks(response.content)
            } catch (err) {
                handleKyErrorToastWithoutLoading(err, toast)
            }
        })()

        return () => {
            mounted = false
        }
        // eslint-disable-next-line
    }, [])

    const handleRemove = async (id: string) => {
        const toastId = toast.loading('Trwa usuwanie...')

        try {
            const response = (await ky
                .delete(`/api/v1/content/banks/${id}`)
                .json()) as { ok: boolean }

            if (!response.ok) throw Error()

            toast.update(toastId, {
                ...standardUpdateOptions,
                type: 'success',
                render: 'Usuwanie powiodło się!',
            })

            if (banks) setBanks(banks.filter(({ _id }) => id !== _id))
            navigate('/panel/banks')
        } catch (err) {
            handleKyErrorToast(err, toast, toastId)
        }

        modal.hide()
    }

    const handleRemoveModal = (id: string, name: string) => {
        modal.setContent(
            <ConfirmModal
                question={`Czy na pewno chcesz usunąć ${name}?`}
                confirm={{
                    action: () => handleRemove(id),
                    label: 'Tak, usuń',
                }}
                cancel={{
                    action: modal.hide,
                }}
            />
        )

        modal.show()
    }

    if (!banks) return <LoaderScreen />

    return (
        <div className={style.banksList}>
            <ul>
                {banks.map(({ _id, name, img }) => (
                    <li key={_id}>
                        <div className={style.name}>{name}</div>
                        <div className={style.img}>
                            <img src={img} alt="" />
                        </div>
                        <div className={style.edit}>
                            <Link
                                to={`/panel/banks/${_id}`}
                                className={style.clickable}
                            >
                                <FontAwesomeIcon
                                    className={style.icon}
                                    icon={faPencil}
                                />
                                Edytuj
                            </Link>
                            <div
                                className={style.clickable}
                                onClick={() => handleRemoveModal(_id, name)}
                            >
                                <FontAwesomeIcon
                                    className={style.icon}
                                    icon={faXmark}
                                />
                                Usuń
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={style.newButton}>
                <Link to="/panel/banks/new">
                    <Button>Nowy Bank</Button>
                </Link>
            </div>
        </div>
    )
}

export default BanksList
