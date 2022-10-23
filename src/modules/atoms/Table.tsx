import classnames from 'classnames'

import { Children } from '@/types/children'
import style from './Table.module.scss'

const Table = ({
    children,
    bankAccounts,
}: Children & { bankAccounts?: boolean }) => {
    return (
        <table
            className={classnames(
                style.table,
                bankAccounts && style.bankAccounts
            )}
        >
            {children}
        </table>
    )
}

export default Table
