import { iconDefinition } from '@fortawesome/free-solid-svg-icons'
import {
    Id,
    ToastOptions,
    ToastPromiseParams,
    UpdateOptions,
} from 'react-toastify'
import { stages } from '@/utils/stages'

export type Subpath = {
    label: string
    location: string
    icon?: iconDefinition
    localImage?: 'facebook'
    image?: string | null
    external?: boolean
}

export interface Path extends Subpath {
    subpaths?: Subpath[]
}

export type User = {
    displayName: string
    externalId?: string
    picture: string
    userRole: 'user' | 'admin'
    stage: number
    _id: string
}

export type Response = {
    ok: boolean
    user?: User
}

export type AuthContext = {
    profileName?: string | null
    profilePicture?: string | null
    stage?: number
    isAuthed: boolean
    userRole?: 'user' | 'admin'
    signIn: (user: User) => Promise<boolean>
    signOut: () => Promise<boolean>
}

export type BankAccount = {
    bankName: string
    bankImg: string
    perks: string[]
    link: string
    accountName: string
    id: string
}

// Modal context
export type ModalContext = {
    show: () => void
    hide: () => void
    isOpen: boolean
    content: NodeChildrenType | null
    setContent: (child: NodeChildrenType) => {
        show: ModalContext['show']
    }
}

// Toast context
export type ToastFunction = (msg: string, options?: ToastOptions) => Id
export type ToastPromiseFunction = (
    resolve: Promise<any>,
    params: ToastPromiseParams
) => any
export type ToastContextType = {
    warn: ToastFunction
    info: ToastFunction
    success: ToastFunction
    error: ToastFunction
    promise: ToastPromiseFunction
    loading: ToastFunction
    update: (id: Id, options: UpdateOptions) => void
}

// stage type
export type Stage = typeof stages[number]

// bank
export type Bank = {
    name: string
    img: string
    id: string
    active: boolean
}
