import classnames from 'classnames'
import style from './Modal.module.scss'
import useModal from '@/hooks/useModal'

const Modal = () => {
    const modal = useModal()

    return (
        <div
            className={classnames(style.eclipse, modal.isOpen && style.open)}
            id="eclipse"
            tabIndex={-1}
            onClick={(e) => {
                const target = e.target as HTMLDivElement
                if (target.id === 'eclipse') modal.hide()
            }}
        >
            <div className={classnames(style.modal)}>
                <div className={style.bar}></div>
                <div className={style.content}>{modal.content}</div>
            </div>
        </div>
    )
}

export default Modal
