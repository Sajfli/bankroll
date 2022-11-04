import { A_User } from '@/types/panel'

const parseUser = (user: A_User<false>, index: number) => ({
    ...user,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
    standardSortIndex: index,
})

export default parseUser
