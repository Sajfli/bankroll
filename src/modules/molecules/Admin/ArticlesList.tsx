import { A_ArticleList } from '@/types/admin'
import LoaderScreen from '../LoaderScreen'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'

import style from './ArticlesList.module.scss'
import { Link } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'
import Button from '@/modules/atoms/Button'

const ArticlesList = ({ articles }: { articles: A_ArticleList[] | null }) => {
    const modal = useModal()

    const handleRemoveModal = () => {
        modal.setContent(
            <ConfirmModal
                question="Czy na pewno chcesz usunąć x?"
                ConfirmButton={<Button>Tak</Button>}
                CancelButton={<Button onClick={modal.hide}>Nie</Button>}
            />
        )
        modal.show()
    }

    if (!articles) return <LoaderScreen />

    return (
        <div className={style.articles}>
            <ul>
                {articles.map(({ name, requiredStage }) => (
                    <li key={name}>
                        <div className={style.data}>
                            <div>
                                <b>Nazwa:</b> {name}
                            </div>
                            <div>
                                <b>Wymagany etap:</b> {requiredStage}
                            </div>
                        </div>
                        <div className={style.icons}>
                            <div>
                                <Link to="#">
                                    <FontAwesomeIcon icon={faPencil} />
                                </Link>
                            </div>
                            <div
                                className={style.action}
                                onClick={handleRemoveModal}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ArticlesList
