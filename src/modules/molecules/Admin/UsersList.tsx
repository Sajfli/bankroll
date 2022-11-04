import { A_User } from '@/types/panel'
import LoaderScreen from '../LoaderScreen'
import style from './UsersList.module.scss'
import { Sort, SortState } from '@/pages/Admin/ManageUsers'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Button from '@/modules/atoms/Button'
import { useEffect, useState } from 'react'
import { handleKyErrorToastWithoutLoading } from '@/utils/handleKyError'
import useToast from '@/hooks/useToast'
import ky from 'ky'

type UsersListProps = {
    users: A_User<true>[] | null
    sort: Sort
    refresh: () => void
    sortState: SortState | null
    updateUser: (user: A_User<false>) => void
}

type HandleEdit = (
    id: string,
    data: {
        stage?: A_User<true>['stage']
    }
) => void

const SortIcon = ({
    method,
    state,
}: {
    method: SortState['method']
    state: SortState | null
}) => {
    let icon: IconProp
    if (!state || method !== state.method) icon = 'sort'
    else {
        if (state.direction === 'asc') icon = 'sort-up'
        else icon = 'sort-down'
    }

    return <FontAwesomeIcon icon={icon} />
}

const UsersList = ({
    users,
    sort,
    refresh,
    sortState,
    updateUser,
}: UsersListProps) => {
    const [clicked, setClicked] = useState<string | null>(null)
    const toast = useToast()

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!clicked) return

            const target = e.target as HTMLElement

            const tags = ['TR', 'TD']
            const badTags = ['TBODY', 'TABLE']

            if (tags.includes(target.tagName)) return
            if (badTags.includes(target.tagName)) return setClicked(null)

            let temp = target.parentElement
            for (let i = 0; i < 8; i++) {
                if (
                    !temp ||
                    temp.id === 'root' ||
                    temp.id === 'App' ||
                    temp.tagName === 'main'
                )
                    break

                if (tags.includes(temp.tagName)) {
                    return
                }
                temp = temp.parentElement
            }
            setClicked(null)
        }

        window.addEventListener('click', handler)

        return () => {
            window.removeEventListener('click', handler)
        }
    }, [clicked])

    const handleEdit: HandleEdit = async (id, data) => {
        try {
            const { stage } = data

            const body: {
                stage?: number
            } = {}

            if (!stage) throw Error('invalid_data')
            else body.stage = stage

            const response = (await ky
                .put(`/api/v1/account/users/${id}`, {
                    json: body,
                })
                .json()) as { ok: boolean; content: A_User<false> }

            if (!response.ok || !response.content) throw Error()

            updateUser(response.content)
        } catch (err: any) {
            handleKyErrorToastWithoutLoading(err, toast)
        }
    }

    if (!users) return <LoaderScreen />

    return (
        <table className={style.table}>
            <thead
                onClick={(e) => {
                    e.stopPropagation()
                    if (clicked) setClicked(null)
                }}
            >
                <tr>
                    <td>Zdjęcie profilowe</td>
                    <td onClick={sort('name')}>
                        <div>
                            Imię i nazwisko{' '}
                            <SortIcon method="name" state={sortState} />
                        </div>
                    </td>
                    <td onClick={sort('stage')}>
                        <div>
                            Etap <SortIcon method="stage" state={sortState} />
                        </div>
                    </td>
                    <td onClick={sort('createdAt')}>
                        <div>
                            Data utworzenia{' '}
                            <SortIcon method="createdAt" state={sortState} />
                        </div>
                    </td>
                    <td onClick={sort('updatedAt')}>
                        <div>
                            Data aktualizacji{' '}
                            <SortIcon method="updatedAt" state={sortState} />
                        </div>
                    </td>
                    <td onClick={() => refresh()} title="Odśwież">
                        <FontAwesomeIcon icon="refresh" />
                    </td>
                </tr>
            </thead>
            <tbody>
                {users.map(
                    ({
                        id,
                        displayName,
                        picture,
                        stage,
                        userRole,
                        createdAt,
                        updatedAt,
                    }) => (
                        <tr
                            key={id}
                            className={classNames({
                                [style.admin]: userRole === 'admin',
                                [style.clicked]: clicked === id,
                            })}
                            onClick={() => setClicked(id)}
                        >
                            <td>
                                <img src={picture} alt="" />
                            </td>
                            <td className={style.name}>{displayName}</td>
                            <td className={style.stage}>
                                <div>
                                    <div>{stage}</div>
                                    <div className={style.buttons}>
                                        {stage > 1 && (
                                            <Button
                                                onClick={() => {
                                                    handleEdit(id, {
                                                        stage: stage - 1,
                                                    })
                                                }}
                                            >
                                                <FontAwesomeIcon icon="minus" />
                                            </Button>
                                        )}
                                        {stage < 7 && (
                                            <Button
                                                onClick={() => {
                                                    handleEdit(id, {
                                                        stage: stage + 1,
                                                    })
                                                }}
                                            >
                                                <FontAwesomeIcon icon="plus" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td>{createdAt.toLocaleString('pl-PL')}</td>
                            <td>{updatedAt.toLocaleString('pl-PL')}</td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}

export default UsersList
