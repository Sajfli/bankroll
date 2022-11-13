import { A_ArticleType } from '@/types/panel'
import LoaderScreen from '../LoaderScreen'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './ArticlesList.module.scss'
import { Link } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import ConfirmModal from '@/modules/atoms/ConfirmModal'
import useToast, { standardUpdateOptions } from '@/hooks/useToast'
import {
    handleKyErrorToast,
    handleKyErrorToastWithoutLoading,
} from '@/utils/handleKyError'
import ky from 'ky'
import Checkbox from '@/modules/atoms/Checkbox'

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

    const handleActive = async (active: boolean, name: string) => {
        try {
            const articleIndex = articles.findIndex(
                ({ name: _name }) => name === _name
            )
            if (articleIndex < 0) {
                toast.error('Nie znaleziono indexu')
                return
            }

            const resp = (await ky
                .patch(`/api/v1/content/article/${name}/setActive`, {
                    json: { active },
                })
                .json()) as { ok: boolean }
            if (!resp || !resp.ok) throw Error()
            else {
                toast.success(
                    `${
                        active ? 'Aktywowano' : 'Zdezaktywowano'
                    } artykuł ${name}`
                )

                const _articles = [...articles]
                _articles[articleIndex].active = active
                setArticles(_articles)
            }
        } catch (err) {
            handleKyErrorToastWithoutLoading(err, toast)
        }
    }

    if (!articles) return <LoaderScreen />

    return (
        <div className={style.articles}>
            <ul>
                {articles.map(({ name, requiredStage, active }) => (
                    <li key={name}>
                        <div className={style.data}>
                            <div>
                                <b>Nazwa:</b> {name}
                            </div>
                            <div>
                                <b>Wymagany etap:</b> {requiredStage}
                            </div>
                        </div>
                        <div>
                            <Checkbox
                                onChange={({ target: { checked } }) => {
                                    handleActive(checked, name)
                                }}
                                checked={active}
                            >
                                Aktywny
                            </Checkbox>
                        </div>
                        <div className={style.icons}>
                            <div>
                                <Link to={`/panel/articles/${name}`}>
                                    <FontAwesomeIcon icon="pencil" />
                                </Link>
                            </div>
                            <div
                                className={style.action}
                                onClick={() => handleRemoveModal(name)}
                            >
                                <FontAwesomeIcon icon="xmark" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ArticlesList
