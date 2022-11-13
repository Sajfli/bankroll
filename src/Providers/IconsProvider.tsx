import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faXmark,
    faPencil,
    faBars,
    faPlus,
    faMinus,
    faHome,
    faMoneyBill,
    faUser,
    faRightFromBracket,
    faBook,
    faRotateLeft,
    faCheck,
    faRefresh,
    faSort,
    faSortUp,
    faSortDown,
    faCircleQuestion,
    faShield,
    faKey,
    faBookOpen,
    faLock,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faXmark,
    faPencil,
    faBars,
    faPlus,
    faMinus,
    faHome,
    faMoneyBill,
    faUser,
    faRightFromBracket,
    faBook,
    faRotateLeft,
    faCheck,
    faRefresh,
    faSort,
    faSortUp,
    faSortDown,
    faCircleQuestion,
    faShield,
    faKey,
    faBookOpen,
    faLock
)

const IconsProvider = ({ children }: { children: React.ReactElement }) =>
    children

export default IconsProvider
