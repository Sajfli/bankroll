import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faXmark,
    faPencil,
    faBars,
    faPlus,
    faHome,
    faMoneyBill,
    faUser,
    faRightFromBracket,
    faBook,
    faRotateLeft,
    faCheck,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faXmark,
    faPencil,
    faBars,
    faPlus,
    faHome,
    faMoneyBill,
    faUser,
    faRightFromBracket,
    faBook,
    faRotateLeft,
    faCheck
)

const IconsProvider = ({ children }: { children: React.ReactElement }) =>
    children

export default IconsProvider
