import { Navigate, createBrowserRouter } from 'react-router-dom'
import Home from '@/pages/Home'
import Stages from '@/pages/Stages'
import Error from '@/pages/Error'
import Profile from '@/pages/Profile'
import Panel from '@/pages/Admin/Panel'
import PanelArticles from '@/pages/Admin/Articles'

import CheckPerm from '@/utils/CheckPerm'
import Stats from '@/modules/molecules/Admin/Stats'
import NewArticle from '@/pages/Admin/NewArticle'

import Root from './Root'
import EditArticle from '@/pages/Admin/EditArticle'
import PanelBanks from '@/pages/Admin/PanelBanks'
import EditBank from '@/pages/Admin/EditBank'
import BankAccountEditor from '@/modules/organisms/Admin/Editor/BankAccountEditor'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'etap/:stage',
                element: <Stages />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'panel',
                element: (
                    <CheckPerm requiredRole="admin" returnIfAuth>
                        <Panel />
                    </CheckPerm>
                ),
                children: [
                    {
                        index: true,
                        element: <Stats />,
                    },
                    {
                        path: 'articles',
                        element: <PanelArticles />,
                    },
                    {
                        path: 'articles/new',
                        element: <NewArticle />,
                    },
                    {
                        path: 'articles/:article',
                        element: <EditArticle />,
                    },
                    {
                        path: 'banks',
                        element: <PanelBanks />,
                        children: [
                            {
                                path: 'bank/:bank',
                                element: <EditBank />,
                            },
                            {
                                path: 'account/:account',
                                element: <BankAccountEditor />,
                            },
                        ],
                    },
                ],
            },
            {
                path: '404',
                element: <Navigate replace to="/error/404" />,
            },
            {
                path: '/error/:err',
                element: <Error />,
            },
            {
                path: '/api/*',
                element: <></>,
            },
            {
                path: '*',
                element: <Navigate replace to="/error/404" />,
            },
        ],
    },
])

export default router
