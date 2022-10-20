import { NodeChildrenType } from '@/types/children'
import Button from './Button'
import style from './Modals.module.scss'

const ConfirmModal = ({
    question,
    comment,
    ConfirmButton,
    CancelButton,
}: {
    question: string
    comment?: string
    ConfirmButton: NodeChildrenType
    CancelButton: NodeChildrenType
}) => {
    return (
        <div className={style.confirmModal}>
            <h1>{question}</h1>
            {comment && <p>{comment}</p>}

            <div className={style.buttons}>
                {CancelButton}
                {ConfirmButton}
            </div>
        </div>
    )
}

export default ConfirmModal
