import { useContext, useState, useEffect, createContext } from 'react'
import { NodeChildren } from '@/types/children'
import { Response, User, AuthContext as AuthContextType } from '@/types/utils'
import ky from 'ky'
import propTypes from 'prop-types'

const AuthContext = createContext<AuthContextType>({
    isAuthed: false,
    signIn: (user: User) => new Promise((resolve, reject) => reject(false)),
    signOut: () => new Promise((resolve, reject) => reject(false)),
})

const AuthProvider = ({ children }: NodeChildren) => {
    const [profileName, setProfileName] = useState<string | null>(null)
    const [profilePicture, setProfilePicture] = useState<string | null>(null)
    const [stage, setStage] = useState<number>(1)
    const [isAuthed, setIsAuthed] = useState<boolean>(false)

    const signIn = (user: User): Promise<boolean> =>
        new Promise((resolve, reject) => {
            try {
                const { _id, displayName, picture, stage } = user

                if (!_id || !displayName) reject(false)
                else {
                    setProfileName(displayName)
                    if (picture) setProfilePicture(picture)
                    setIsAuthed(true)
                    setStage(stage || 1)
                    resolve(true)
                }
            } catch (err) {
                reject(false)
            }
        })

    const signOut = (): Promise<boolean> =>
        new Promise(async (resolve, reject) => {
            if (!isAuthed) return resolve(false)

            try {
                const response = await ky.get(
                    '/api/v1/account/facebook/logout?bg=true'
                )

                const content = (await response.json()) as { ok: boolean }

                if (content.ok) {
                    setProfileName(null)
                    setProfilePicture(null)
                    setStage(1)
                    setIsAuthed(false)
                    resolve(true)
                } else throw Error()
            } catch (error) {
                reject(false)
            }
        })

    useEffect(() => {
        ;(async () => {
            try {
                const response = await ky.get('/api/v1/account/facebook/get')
                const responseContent: Response = await response.json()
                if (responseContent.user) {
                    await signIn(responseContent.user)
                } else throw Error()
            } catch (err) {
                setIsAuthed(false)
                setProfileName(null)
                setProfilePicture(null)
            }
        })()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                profileName,
                profilePicture,
                isAuthed,
                stage,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: propTypes.node.isRequired,
}

const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
}

export { AuthProvider }
export default useAuth
