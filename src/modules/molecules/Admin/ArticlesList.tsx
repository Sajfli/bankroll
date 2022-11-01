import { A_ArticleType } from '@/types/panel'
import LoaderScreen from '../LoaderScreen'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'

import style from './ArticlesList.module.scss'
import { Link } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'
import useToast, { standardUpdateOptions } from '@/hooks/useToast'
import { handleKyErrorToast } from '@/utils/handleKyError'
import ky from 'ky'

const ArticlesList = ({
    articles,
    setArticles,
}: {
    articles: A_ArticleType[]
    setArticles: (articles: A_ArticleType[]) => void
}) => {
    const modal = useModal()
    const toast = useToast()

    const handleRemove = async (name: string) => {
        const toastId = toast.loading('Trwa usuwanie...')
        try {
            const response = (await ky
                .delete(`/api/v1/content/article/${name}`)
                .json()) as any
            if (response.ok) {
                toast.update(toastId, {
                    ...standardUpdateOptions,
                    type: 'success',
                    render: `${name} usunięty!`,
                })
                setArticles(
                    articles.filter(({ name: _name }) => name !== _name)
                )
            } else throw Error()
        } catch (err) {
            handleKyErrorToast(err, toast, toastId)
        }

        modal.hide()
    }

    const handleRemoveModal = (name: string) => {
        modal.setContent(
            <ConfirmModal
                question={`Czy na pewno chcesz usunąć ${name}?`}
                confirm={{
                    action: () => {
                        handleRemove(name)
                    },
                }}
                cancel={{
                    action: modal.hide,
                }}
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
                                <Link to={`/panel/articles/${name}`}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </Link>
                            </div>
                            <div
                                className={style.action}
                                onClick={() => handleRemoveModal(name)}
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
