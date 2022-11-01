import BanksList from '@/modules/molecules/Admin/BanksList'
import BankAccounts from '@/modules/organisms/BankAccounts'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Bank } from '@/types/utils'

const PanelBanks = () => {
    const [banks, setBanks] = useState<Bank[] | null>(null)

    return (
        <div>
            <h2>Banki</h2>
            <BanksList setBanks={setBanks} banks={banks} />

            <Outlet context={{ setBanks, banks }} />

            <h2>Konta bankowe</h2>
            <BankAccounts />
        </div>
    )
}

export default PanelBanks
