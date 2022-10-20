import { iconDefinition } from '@fortawesome/free-solid-svg-icons'
import { NodeChildren } from './children'

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
    signIn: (user: User) => Promise<boolean>
    signOut: () => Promise<boolean>
}

export type BankAccount = {
    bankName: string
    bankImg: string
    perks: string[]
    link: string
    accountName: string
    accountId: string
}

// Modal context
export type ModalContext = {
    show: () => void
    hide: () => void
    isOpen: boolean
    content: NodeChildrenType | null
    setContent: (child: NodeChildrenType) => void
}
