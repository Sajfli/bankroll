import useAuth from '@/hooks/useAuth'
import classnames from 'classnames'
import { Navigate } from 'react-router-dom'
import ky from 'ky'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'

import Button from '@/modules/atoms/Button'

import style from './Profile.module.scss'

const Profile = () => {
    const auth = useAuth()

    const modal = useModal()

    const handleProfileRemovalModal = () => {
        modal.setContent(
            <ConfirmModal
                question="Czy na pewno chcesz usunąć konto?"
                comment="W każdym momencie możesz zarejestrować się na nowo"
                confirm={{
                    label: 'Usuń konto',
                    action: handleProfileRemove,
                }}
                cancel={{
                    label: 'Anuluj',
                    action: modal.hide,
                }}
            />
        )
        modal.show()
    }

    const handleProfileRemove = async () => {
        try {
            const response = await ky.delete('/api/v1/account/facebook')

            const content = (await response.json()) as { ok: boolean }
            if (content.ok) {
                await auth.signOut()
                modal.hide()
            } else throw Error()
        } catch (err) {
            console.error(err)
        }
    }

    if (!auth.isAuthed) return <Navigate to="/" />

    return (
        <div className={classnames('content', style.profile)}>
            <div className={style.profileHeader}>
                <img src={auth.profilePicture as string} alt="Avatar" />
                <h1>{auth.profileName}</h1>
            </div>
            <div className={style.stats}>
                <h2>Statystyki</h2>
                <p>
                    <b>Etap:</b> {auth.stage}
                </p>
            </div>
            <div className={style.actions}>
                <h2>Akcje</h2>
                <Button type="button" onClick={handleProfileRemovalModal}>
                    Usuń konto
                </Button>
            </div>
        </div>
    )
}

export default Profile
