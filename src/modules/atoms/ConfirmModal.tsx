import { useEffect } from 'react'
import Button from './Button'
import style from './Modals.module.scss'

const ConfirmModal = ({
    question,
    comment,
    confirm,
    cancel,
}: {
    question: string
    comment?: string
    confirm: {
        label?: string
        action: () => void
    }
    cancel: {
        label?: string
        action: () => void
    }
}) => {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            e.preventDefault()

            if (e.key === 'Escape') {
                cancel.action()
            } else if (e.key === 'Enter') {
                confirm.action()
            }
        }

        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [cancel, confirm])

    return (
        <div className={style.confirmModal}>
            <h1>{question}</h1>
            {comment && <p>{comment}</p>}

            <div className={style.buttons}>
                <Button onClick={cancel.action}>{cancel.label || 'Nie'}</Button>
                <Button onClick={confirm.action}>
                    {confirm.label || 'Tak'}
                </Button>
            </div>
        </div>
    )
}

export default ConfirmModal
