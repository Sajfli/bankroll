import TextArea from '@/modules/atoms/TextArea'
import TextInput from '@/modules/atoms/TextInput'
import { Bank, BankAccount } from '@/types/utils'
import genKey, { genId } from '@/utils/genKey'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

import * as sassVariables from '@/utils/variables.module.scss'

import style from './BankAccountEditor.module.scss'
import { ReactSortable } from 'react-sortablejs'
import Button from '@/modules/atoms/Button'
import { handleKyErrorToast } from '@/utils/handleKyError'
import useToast, { standardUpdateOptions } from '@/hooks/useToast'
import ky from 'ky'

type BankAccountEditorProps = BankAccount & {
    banks: Bank[] | null
    optionsStyle: { [key: string]: string }
    setV: (v: number) => void
    v: number
}

type Perk = { value: string; id: string }

const parsePerks = (perks: string[]) => {
    return perks ? perks.map((value, i) => ({ value, id: genId(`${i}`) })) : []
}

const BankAccountEditor = () => {
    const {
        bankImg,
        bankName,
        accountName,
        perks,
        link,
        banks,
        id,
        optionsStyle,
        v,
        setV,
    }: BankAccountEditorProps = useOutletContext()

    const toast = useToast()
    const navigate = useNavigate()
    const ref = useRef<HTMLDivElement>(null)

    const [bankValue, setBankValue] = useState<string>(
            banks?.find(({ name }) => name === bankName)?.name || '_'
        ),
        [bankImgValue, setBankImgValue] = useState<string>(bankImg || ''),
        [accountNameValue, setAccountNameValue] = useState<string>(
            accountName || ''
        ),
        [perksValue, setPerksValue] = useState<Perk[]>(parsePerks(perks)),
        [linkValue, setLinkValue] = useState<string>(link || '')

    useEffect(() => {
        setLinkValue(link)
    }, [link])

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [ref])

    const handleBankChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLSelectElement>) => {
        const bankIndex = banks?.findIndex(({ name }) => name === value)
        if (typeof bankIndex === 'undefined' || bankIndex < 0) return

        setBankImgValue(banks![bankIndex].img)
        setBankValue(value)
    }

    const handlePerksChange = (id: string) => {
        return ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            const index = perksValue?.findIndex(({ id: _id }) => id === _id)
            if (typeof index === 'undefined' || index < 0) return

            const _perks = [...perksValue]

            _perks[index].value = value
            setPerksValue(_perks)
        }
    }

    const handleSubmit = async () => {
        const toastId = toast.loading('Trwa zapisywanie danych')
        try {
            if (
                !bankValue ||
                !accountNameValue ||
                perksValue?.length < 1 ||
                !linkValue ||
                !id
            )
                throw Error('invalid_data')

            const body = {
                bank: bankValue,
                name: accountNameValue,
                link: linkValue,
                perks: perksValue.map(({ value }) => value),
                id,
            }

            const response = (await ky
                .put('/api/v1/content/bankAccounts', {
                    json: body,
                })
                .json()) as { ok: boolean }

            if (!response || !response.ok) throw Error()

            if (setV && typeof v !== 'undefined') setV(v + 1)

            toast.update(toastId, {
                ...standardUpdateOptions,
                type: 'success',
                render: 'Konto bankowe zostało zapisane prawidłowo',
            })
            navigate('/panel/banks')
        } catch (err: any) {
            handleKyErrorToast(err, toast, toastId)
        }
    }

    return (
        <>
            <td>
                <div
                    ref={ref}
                    className={style.scrollHandler}
                    style={{
                        top: -+sassVariables.topOffset.substring(
                            0,
                            sassVariables.topOffset.length - 2
                        ),
                    }}
                ></div>
                <img src={bankImgValue} alt="" />
            </td>
            <td>
                <div className={style.top}>
                    {banks && (
                        <select value={bankValue} onChange={handleBankChange}>
                            <option value="_" disabled>
                                wybierz...
                            </option>
                            {banks.map(({ name, id, active }) => {
                                if (!active) return null
                                return (
                                    <option key={id} value={name}>
                                        {name}
                                    </option>
                                )
                            })}
                        </select>
                    )}
                    <TextInput
                        label="Nazwa konta"
                        defaultValue={accountName}
                        value={accountNameValue}
                        handleInput={setAccountNameValue}
                    />
                    {/* {bankName} - {accountName} */}
                </div>
                {perksValue && (
                    <ReactSortable
                        tag="ul"
                        className={style.perks}
                        list={perksValue}
                        setList={setPerksValue}
                        handle=".draggable_perk"
                        group="bankAccount"
                        animation={200}
                        delay={2}
                        delayOnTouchOnly={true}
                        forceFallback={true}
                    >
                        {perksValue?.map(({ value, id }) => (
                            <li key={id}>
                                <TextArea
                                    key={id}
                                    value={value}
                                    onChange={handlePerksChange(id)}
                                />
                                <div className={style.listOptions}>
                                    <FontAwesomeIcon
                                        icon="bars"
                                        className="hover__blue draggable__noevent draggable_perk"
                                    />
                                    <FontAwesomeIcon
                                        icon="xmark"
                                        className="hover__red"
                                        onClick={() => {
                                            setPerksValue(
                                                perksValue.filter(
                                                    ({ id: _id }) => id !== _id
                                                )
                                            )
                                        }}
                                    />
                                </div>
                            </li>
                        ))}
                    </ReactSortable>
                )}
                <Button
                    onClick={() => {
                        setPerksValue([
                            ...perksValue,
                            { id: genKey(perksValue), value: '' },
                        ])
                    }}
                >
                    <>
                        <FontAwesomeIcon icon="plus" />
                        Dodaj perk
                    </>
                </Button>
                <div>
                    <TextInput
                        label="Link"
                        value={linkValue}
                        handleInput={setLinkValue}
                    />
                </div>
            </td>
            <td className={optionsStyle?.options}>
                <div className={optionsStyle?.icons}>
                    <Link to={`/panel/banks/account/${id}`}>
                        <FontAwesomeIcon
                            icon="pencil"
                            className="hover__accent"
                        />
                    </Link>
                    <Link to="/panel/banks">
                        <FontAwesomeIcon
                            icon="rotate-left"
                            className="hover__orange"
                        />
                    </Link>
                    <FontAwesomeIcon
                        onClick={handleSubmit}
                        icon="check"
                        className="hover__green"
                    />
                </div>
            </td>
        </>
    )
}

export default BankAccountEditor
