import useToast from '@/hooks/useToast'
import UsersList from '@/modules/molecules/Admin/UsersList'
import { A_User } from '@/types/panel'
import { handleKyErrorToastWithoutLoading } from '@/utils/handleKyError'
import parseUser from '@/utils/parseUser'
import ky from 'ky'
import { useEffect, useState } from 'react'

export type SortState = {
    method: 'name' | 'stage' | 'createdAt' | 'updatedAt'
    direction: 'asc' | 'desc'
}

export type Sort = (by: SortState['method']) => () => void

const ManageUsers = () => {
    const [users, setUsers] = useState<A_User<true>[] | null>(null)
    const [sorted, setSorted] = useState<SortState | null>(null)
    const [refresh, setRefresh] = useState<number>(0)
    const toast = useToast()

    const sort: Sort = (by) => {
        return () => {
            if (!users || users.length < 1) return

            // let direction = sorted?.direction || 'desc'
            // if(sorted?.method === by) {
            //     direction = direction === 'desc' ? 'asc' : 'desc'

            // } else direction = 'desc'

            let direction: SortState['direction']
            if (!sorted || sorted.method !== by) direction = 'desc'
            else {
                if (sorted.direction === 'desc') direction = 'asc'
                else {
                    setUsers(
                        users.sort(
                            (a, b) => a.standardSortIndex - b.standardSortIndex
                        )
                    )
                    setSorted(null)
                    return
                }
            }

            switch (by) {
                case 'name':
                    setUsers(
                        users.sort((a, b) => {
                            if (direction === 'asc')
                                return a.displayName.localeCompare(
                                    b.displayName
                                )
                            return b.displayName.localeCompare(a.displayName)
                        })
                    )
                    break
                case 'stage':
                    setUsers(
                        users.sort((a, b) => {
                            if (direction === 'asc') return a.stage - b.stage
                            return b.stage - a.stage
                        })
                    )
                    break
                case 'createdAt':
                case 'updatedAt':
                    setUsers(
                        users.sort((a, b) => {
                            if (direction === 'asc')
                                return (
                                    Date.parse(a[by].toISOString()) -
                                    Date.parse(b[by].toISOString())
                                )
                            return (
                                Date.parse(b[by].toISOString()) -
                                Date.parse(a[by].toISOString())
                            )
                        })
                    )
                    break
                default:
                    return
            }

            setSorted({
                method: by,
                direction,
            })
        }
    }

    useEffect(() => {
        let mounted = true

        ;(async () => {
            try {
                const response = (await ky
                    .get('/api/v1/account/users')
                    .json()) as { ok: boolean; content?: A_User<false>[] }

                if (!response || !response.ok || !response.content)
                    throw Error()

                let i = 0

                if (mounted)
                    setUsers(
                        response.content.map((user) => parseUser(user, i++))
                    )
            } catch (err) {
                handleKyErrorToastWithoutLoading(err, toast)
            }
        })()

        return () => {
            mounted = false
        }

        // eslint-disable-next-line
    }, [refresh])

    const handleUserUpdate = (user: A_User<false>) => {
        if (!users) return
        try {
            const _users = [...users]
            const index = _users.findIndex(({ id: _id }) => _id === user.id)
            if (index < 0) return

            _users[index] = parseUser(user, _users[index].standardSortIndex)

            setUsers(_users)
        } catch (err) {
            handleKyErrorToastWithoutLoading(err, toast)
        }
    }

    const handleRefresh = () => setRefresh(refresh + 1)

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Użytkownicy</h1>
            <UsersList
                users={users}
                sort={sort}
                refresh={handleRefresh}
                sortState={sorted}
                updateUser={handleUserUpdate}
            />
        </div>
    )
}

export default ManageUsers
