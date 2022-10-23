import { useState, useEffect } from 'react'

import Table from '@/modules/atoms/Table'
import LoaderScreen from '../LoaderScreen'
import ky from 'ky'

type CountsType = {
    articlesCount: number
    usersCount: number
    banksCount: number
    bankAccountsCount: number
}

const Stats = () => {
    const [counts, setCounts] = useState<CountsType | null>(null)

    useEffect(() => {
        let mounted = true

        ;(async () => {
            try {
                const response = await ky.get('/api/v1/admin/stats')

                const responseJson = (await response.json()) as {
                    ok: boolean
                    data: CountsType
                }

                if (responseJson.ok) {
                    const data = responseJson.data
                    if (mounted) setCounts(data)
                    console.log(data)
                } else throw Error()
            } catch (err) {
                setCounts(null)
            }
        })()

        return () => {
            mounted = false
        }
    }, [])

    return (
        <div>
            <h2 className="header">Statystyki</h2>

            {counts ? (
                <Table>
                    <tbody>
                        <tr>
                            <td>Ilość użytkowników</td>
                            <td>{counts.usersCount}</td>
                        </tr>
                        <tr>
                            <td>Ilość artykułów</td>
                            <td>{counts.articlesCount}</td>
                        </tr>
                        <tr>
                            <td>Ilość banków</td>
                            <td>{counts.banksCount}</td>
                        </tr>
                        <tr>
                            <td>Ilość kont bankowych</td>
                            <td>{counts.bankAccountsCount}</td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <LoaderScreen />
            )}
        </div>
    )
}

export default Stats
