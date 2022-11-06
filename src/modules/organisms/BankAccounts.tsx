import Table from '../atoms/Table'
import { BankAccount } from '@/types/utils'
import React, { useEffect, useState } from 'react'
import ky from 'ky'
import LoaderScreen from '../molecules/LoaderScreen'

export type SetContent = React.Dispatch<
    React.SetStateAction<BankAccount[] | null | undefined>
>

type BankAccountsProps = {
    customRender?: (props: BankAccount) => React.ReactElement
    TableFooter?: React.ReactElement | null
    Wrapper?: ({
        children,
        list,
        setList,
    }: {
        children: React.ReactElement[]
        list: BankAccount[]
        setList: (list: BankAccount[]) => void
    }) => React.ReactElement
    rerender?: any
    selectedBank?: string | null
    all?: boolean
}

const DefaultWrapper: BankAccountsProps['Wrapper'] = ({ children }) => (
    <tbody>{children}</tbody>
)

const BankAccounts = ({
    customRender,
    TableFooter,
    Wrapper = DefaultWrapper,
    rerender,
    selectedBank,
    all,
}: BankAccountsProps) => {
    const [bankAccounts, setBankAccounts] = useState<null | BankAccount[]>()
    const [content, setContent] = useState<null | BankAccount[]>()

    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const response = await ky.get(
                    `/api/v1/content/bankAccounts${all ? '?all=true' : ''}`
                )

                if (response && response.status === 200) {
                    const json = (await response.json()) as BankAccount[]
                    if (json) {
                        if (mounted) setContent(json)
                    } else throw Error()
                } else throw Error()
            } catch (err) {
                console.error(err)
            }
        })()
        return () => {
            mounted = false
        }
    }, [rerender, all])

    useEffect(() => {
        if (!selectedBank) setBankAccounts(content || null)
        else {
            const _accounts = content?.filter(
                ({ bankName }) => bankName === selectedBank
            )
            if (_accounts) setBankAccounts(_accounts)
            else setBankAccounts(content || null)
        }
    }, [content, selectedBank])

    if (!bankAccounts) return <LoaderScreen />
    return (
        <Table bankAccounts={true}>
            <>
                <Wrapper list={bankAccounts} setList={setBankAccounts}>
                    {customRender
                        ? bankAccounts.map(customRender)
                        : bankAccounts.map(
                              ({
                                  bankName,
                                  bankImg,
                                  accountName,
                                  link,
                                  perks,
                                  id,
                              }) => (
                                  <tr key={id}>
                                      <td>
                                          <img src={bankImg} alt={bankName} />
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
                                              <a
                                                  href={link}
                                                  target="_blank"
                                                  rel="noreferrer"
                                              >
                                                  Załóż konto
                                              </a>
                                          </p>
                                      </td>
                                  </tr>
                              )
                          )}
                </Wrapper>
                {TableFooter && <tfoot>{TableFooter}</tfoot>}
            </>
        </Table>
    )
}

export default BankAccounts
