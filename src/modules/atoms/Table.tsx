import { Children } from '@/types/children'
import style from './Table.module.scss'

const Table = ({ children }: Children) => {
    return <table className={style.table}>{children}</table>
}

export default Table
