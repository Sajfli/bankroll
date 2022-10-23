import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Stages from '@/pages/Stages'
import Error from '@/pages/Error'
import Profile from '@/pages/Profile'
import Panel from '@/pages/Admin/Panel'
import PanelArticles from '@/pages/Admin/Articles'

import CheckPerm from '@/utils/CheckPerm'
import Stats from '@/modules/molecules/Admin/Stats'
import NewArticle from '@/pages/Admin/NewArticle'

const Router = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="etap/:stage" element={<Stages />} />
            <Route
                path="profile"
                element={
                    <CheckPerm returnIfAuth>
                        <Profile />
                    </CheckPerm>
                }
            />

            <Route
                path="panel"
                element={
                    <CheckPerm requiredRole="admin" returnIfAuth>
                        <Panel />
                    </CheckPerm>
                }
            >
                <Route index element={<Stats />} />
                <Route path="articles" element={<PanelArticles />} />
                <Route path="articles/new" element={<NewArticle />} />
            </Route>

            <Route path="/404" element={<Navigate replace to="/error/404" />} />
            <Route path="/error/:err" element={<Error />} />
            <Route path="/api/*" element={<></>} />
            <Route path="*" element={<Navigate replace to="/error/404" />} />
        </Routes>
    )
}

export default Router
