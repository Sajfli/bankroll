import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import BankAccounts from '@/modules/organisms/BankAccounts'
import style from './EditBankAccount.module.scss'
import { Link, Outlet } from 'react-router-dom'
import classNames from 'classnames'
import {
    Bank,
    BankAccount,
    ModalContext,
    ToastContextType,
} from '@/types/utils'
import Button from '@/modules/atoms/Button'
import useToast, { standardUpdateOptions } from '@/hooks/useToast'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'
import { handleKyErrorToast } from '@/utils/handleKyError'
import ky from 'ky'

type EditBankAccountProps = {
    currentOutlet: {
        type?: 'banksEdit' | 'bankAccountsEdit'
        id?: string
    }
    banks: Bank[] | null
}

type AccountRowProps = BankAccount &
    EditBankAccountProps & {
        v: number
        setV: (v: number) => void
        handleRemoveModal?: (id: string, name: string) => void
    }

const AccountRow = ({
    currentOutlet,
    id,
    bankName,
    bankImg,
    accountName,
    link,
    perks,
    banks,
    v,
    setV,
    handleRemoveModal,
}: AccountRowProps) => (
    <tr
        className={classNames(style.row, {
            [style.notEditing]:
                currentOutlet.type === 'bankAccountsEdit' &&
                currentOutlet.id !== id,
        })}
    >
        {currentOutlet.type === 'bankAccountsEdit' &&
        currentOutlet.id === id ? (
            <Outlet
                context={{
                    bankName,
                    bankImg,
                    accountName,
                    link,
                    perks,
                    id,
                    banks,
                    optionsStyle: style,
                    v,
                    setV,
                }}
            />
        ) : (
            <>
                <td>
                    <img src={bankImg} alt="" />
                </td>
                <td>
                    <h3>
                        {bankName} - {accountName}
                    </h3>
                    <ul>
                        {perks.map((val, i) => (
                            <li key={i}>{val}</li>
                        ))}
                    </ul>
                    <p>
                        <a href={link} target="_blank" rel="noreferrer">
                            Załóż konto
                        </a>
                    </p>
                </td>
            </>
        )}

        {(currentOutlet.type !== 'bankAccountsEdit' ||
            currentOutlet.id !== id) && (
            <td className={style.options}>
                <div className={style.icons}>
                    <FontAwesomeIcon
                        icon="xmark"
                        className="hover__red"
                        onClick={() => {
                            if (handleRemoveModal)
                                handleRemoveModal(id, accountName)
                        }}
                    />
                    <Link to={`/panel/banks/account/${id}`}>
                        <FontAwesomeIcon
                            icon="pencil"
                            className="hover__accent"
                        />
                    </Link>
                    {currentOutlet.type === 'bankAccountsEdit' &&
                        currentOutlet.id === id && (
                            <>
                                <Link to="/panel/banks">
                                    <FontAwesomeIcon
                                        icon="rotate-left"
                                        className="hover__orange"
                                    />
                                </Link>
                                <FontAwesomeIcon
                                    icon="check"
                                    className="hover__green"
                                />
                            </>
                        )}
                </div>
            </td>
        )}
    </tr>
)

const EditBankAccount = ({
    currentOutlet,
    banks,
    selectedBank,
}: EditBankAccountProps & {
    selectedBank: string | null
}) => {
    const [v, setV] = useState<number>(0)

    const toast = useToast()
    const modal = useModal()

    const handleRemove = async (id: string) => {
        const toastId = toast.loading('Trwa usuwanie...')

        try {
            const response = (await ky
                .delete(`/api/v1/content/bankAccounts/${id}`)
                .json()) as { ok: boolean }

            if (!response?.ok) throw Error()

            toast.update(toastId, {
                ...standardUpdateOptions,
                type: 'success',
                render: 'Usunięto!',
            })

            setV(v + 1)
        } catch (err) {
            handleKyErrorToast(err, toast, toastId)
        }
    }

    const handleRemoveModal = (id: string, name: string) => {
        if (id.toLowerCase() === 'new') return

        modal.setContent(
            <ConfirmModal
                question={`Czy na pewno chcesz usunąć ${name}?`}
                confirm={{
                    action: () => {
                        handleRemove(id)
                        modal.hide()
                    },
                    label: 'Tak, usuń',
                }}
                cancel={{
                    action: modal.hide,
                    label: 'Nie',
                }}
            />
        )

        modal.show()
    }

    return (
        <div>
            <BankAccounts
                rerender={v}
                selectedBank={selectedBank}
                all={true}
                customRender={({
                    bankName,
                    bankImg,
                    accountName,
                    link,
                    perks,
                    id,
                }) => (
                    <AccountRow
                        bankName={bankName}
                        bankImg={bankImg}
                        accountName={accountName}
                        link={link}
                        perks={perks}
                        id={id}
                        currentOutlet={currentOutlet}
                        banks={banks}
                        key={id}
                        v={v}
                        setV={setV}
                        handleRemoveModal={handleRemoveModal}
                    />
                )}
                TableFooter={
                    currentOutlet.type === 'bankAccountsEdit' &&
                    currentOutlet.id === 'new' ? (
                        <AccountRow
                            bankName={'_'}
                            bankImg={''}
                            accountName={''}
                            link={''}
                            perks={[]}
                            id={'new'}
                            currentOutlet={currentOutlet}
                            banks={banks}
                            v={v}
                            setV={setV}
                        />
                    ) : null
                }
            />
            <div className={style.newButton}>
                <Link to="/panel/banks/account/new">
                    <Button>Dodaj nowe konto</Button>
                </Link>
            </div>
        </div>
    )
}

export default EditBankAccount
