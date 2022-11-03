import BanksList from '@/modules/molecules/Admin/BanksList'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Bank } from '@/types/utils'
import EditBankAccount from './EditBankAccount'

type CurrentOutlet = {
    type?: 'banksEdit' | 'bankAccountsEdit'
    id?: string
}

const PanelBanks = () => {
    const [banks, setBanks] = useState<Bank[] | null>(null)
    const [currentOutlet, setCurrentOutlet] = useState<CurrentOutlet>({})
    const [selectedBank, setSelectedBank] = useState<string | null>(null)

    const location = useLocation()

    useEffect(() => {
        const locationSplitted = location.pathname.split('/')

        if (typeof locationSplitted.at(-1) !== 'string') return

        if (locationSplitted.at(-2) === 'bank')
            setCurrentOutlet({
                type: 'banksEdit',
            })
        else if (locationSplitted.at(-2) === 'account')
            setCurrentOutlet({
                type: 'bankAccountsEdit',
                id: locationSplitted.at(-1),
            })
        else setCurrentOutlet({})
    }, [location])

    return (
        <div>
            <h2>Banki</h2>
            <BanksList
                setBanks={setBanks}
                banks={banks}
                setSelectedBank={setSelectedBank}
                selectedBank={selectedBank}
            />

            {currentOutlet.type === 'banksEdit' && (
                <Outlet context={{ setBanks, banks }} />
            )}

            <h2>Konta bankowe</h2>
            <EditBankAccount
                banks={banks}
                currentOutlet={currentOutlet}
                selectedBank={selectedBank}
            />
        </div>
    )
}

export default PanelBanks
