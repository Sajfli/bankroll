import Table from '../atoms/Table'
import { BankAccount } from '@/types/utils'
import { useEffect, useState } from 'react'
import ky from 'ky'
import LoaderScreen from '../molecules/LoaderScreen'

const Banks = () => {
    const [content, setContent] = useState<null | BankAccount[]>()

    useEffect(() => {
        let mounted = true
        ;(async () => {
            try {
                const response = await ky.get('/api/v1/content/bankAccounts')

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
    }, [])

    if (content) {
        return (
            <Table bankAccounts={true}>
                <tbody>
                    {content.map(
                        ({
                            bankName,
                            bankImg,
                            accountName,
                            link,
                            perks,
                            accountId,
                        }) => (
                            <tr key={accountId}>
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
                </tbody>
            </Table>
        )
    }

    return <LoaderScreen />
}

export default Banks
