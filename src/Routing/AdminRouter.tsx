import CheckPerm from '@/utils/CheckPerm'
import { Routes, Route } from 'react-router-dom'

import Panel from '@/pages/Admin/Panel'
import Articles from '@/pages/Admin/Articles'

const AdminRouter = () => (
    <Routes>
        <Route
            path="/"
            element={
                <CheckPerm returnIfAuth={true} requiredRole="admin">
                    <Panel />
                </CheckPerm>
            }
        />
        <Route
            path="/panel/articles"
            element={
                <CheckPerm returnIfAuth={true} requiredRole="admin">
                    <Articles />
                </CheckPerm>
            }
        />
    </Routes>
)

export default AdminRouter
