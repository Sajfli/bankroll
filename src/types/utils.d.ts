import { iconDefinition } from '@fortawesome/free-solid-svg-icons'

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
    stage: Number
    _id: string
}

export type Response = {
    ok: boolean
    user?: User
}

export type AuthContext = {
    profileName?: string | null
    profilePicture?: string | null
    stage?: Number
    isAuthed: boolean
    signIn: (user: User) => Promise<boolean>
}
