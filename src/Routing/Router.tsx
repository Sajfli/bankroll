import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Stages from '@/pages/Stages'
import Error from '@/pages/Error'
import Profile from '@/pages/Profile'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/etap/:stage" element={<Stages />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/404" element={<Navigate replace to="/error/404" />} />
            <Route path="/error/:err" element={<Error />} />
            <Route path="/api/*" element={<></>} />
            <Route path="*" element={<Navigate replace to="/error/404" />} />
        </Routes>
    )
}

export default Router
