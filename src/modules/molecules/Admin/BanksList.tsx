import React, { useEffect, useState } from 'react'
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
import Button from '@/modules/atoms/Button'
import { Link, useNavigate } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'
import classNames from 'classnames'
import { ReactSortable } from 'react-sortablejs'
import usePrev from '@/hooks/usePrev'

const BanksList = ({
    setBanks,
    banks,
    setSelectedBank,
    selectedBank,
}: {
    banks: Bank[] | null
    setBanks: (banks: Bank[]) => void
    setSelectedBank: (name: string | null) => void
    selectedBank: string | null
}) => {
    const toast = useToast()
    const modal = useModal()
    const navigate = useNavigate()

    const [hover, setHover] = useState<string | null>(null)
    const prevBanks = usePrev<Bank[] | null>(banks)

    useEffect(() => {
        let mounted = true

        ;(async () => {
            try {
                const response = (await ky
                    .get('/api/v1/content/banks')
                    .json()) as {
                    ok: boolean
                    content: (Bank & { _id?: string })[]
                }

                if (!response || !response.ok) throw Error()

                if (mounted && Array.isArray(response.content))
                    setBanks(
                        response.content.map((bank) => {
                            bank.id = bank._id!
                            delete bank._id
                            return bank
                        })
                    )
            } catch (err) {
                handleKyErrorToastWithoutLoading(err, toast)
            }
        })()

        return () => {
            mounted = false
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (banks && prevBanks) {
            const banksIds = banks.map(({ id }) => id)
            const prevIds = prevBanks.map(({ id }) => id)
            if (banksIds.length !== prevIds.length) return
            let flag = false
            for (let i = 0; i < banksIds.length; i++) {
                if (banksIds[i] !== prevIds[i]) {
                    flag = true
                    break
                }
            }
            if (!flag) return
            ;(async () => {
                try {
                    const res = (await ky
                        .put('/api/v1/content/banksOrder', {
                            json: banksIds,
                        })
                        .json()) as { ok: boolean }

                    if (!res || !res.ok) throw Error()
                } catch (err) {
                    handleKyErrorToastWithoutLoading(err, toast)
                }
            })()
        }
        // eslint-disable-next-line
    }, [banks, prevBanks])

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

            if (banks) setBanks(banks.filter(({ id: _id }) => id !== _id))
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

    const handleMouseEnter = (id: string) => setHover(id)
    const handleMouseLeave = () => setHover(null)
    const handleMouseMove = (e: React.MouseEvent, id: string) => {
        const target = e.target as HTMLElement
        if (
            target.parentElement?.classList?.contains(style.edit) ||
            target.classList?.contains(style.edit) ||
            ['path', 'a', 'svg'].includes(target.tagName)
        )
            setHover(null)
        else setHover(id)
    }

    if (!banks) return <LoaderScreen />

    return (
        <div className={style.banksList}>
            <ReactSortable
                tag="ul"
                list={banks}
                setList={setBanks}
                animation={200}
                delay={2}
                delayOnTouchOnly={true}
                forceFallback={true}
                group="banks"
            >
                {banks.map(({ id, name, img }) => (
                    <li
                        key={id}
                        onClick={(e) => {
                            if (
                                !(
                                    e.target as HTMLLIElement
                                ).classList?.contains(style.clickable)
                            ) {
                                if (name === selectedBank) setSelectedBank(null)
                                else setSelectedBank(name)
                            }
                        }}
                        onMouseEnter={() => handleMouseEnter(id)}
                        onMouseMove={(e) => handleMouseMove(e, id)}
                        onMouseLeave={handleMouseLeave}
                        className={classNames(
                            hover === id && style.hover,
                            selectedBank === name && style.selected
                        )}
                    >
                        <div className={style.name}>{name}</div>
                        <div className={style.img}>
                            <img src={img} alt="" />
                        </div>
                        <div className={style.edit}>
                            <Link
                                to={`/panel/banks/bank/${id}`}
                                className={classNames(
                                    style.clickable,
                                    'hover__accent'
                                )}
                            >
                                <FontAwesomeIcon
                                    className={style.icon}
                                    icon="pencil"
                                />
                                Edytuj
                            </Link>
                            <div
                                className={classNames(
                                    style.clickable,
                                    'hover__red'
                                )}
                                onClick={() => handleRemoveModal(id, name)}
                            >
                                <FontAwesomeIcon
                                    className={style.icon}
                                    icon="xmark"
                                />
                                Usuń
                            </div>
                        </div>
                    </li>
                ))}
            </ReactSortable>
            <div className={style.newButton}>
                <Link to="/panel/banks/bank/new">
                    <Button>Nowy Bank</Button>
                </Link>
            </div>
        </div>
    )
}

export default BanksList
