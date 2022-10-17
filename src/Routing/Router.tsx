import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Stages from '@/pages/Stages'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/etap/:stage" element={<Stages />} />

            <Route path="/404" element={<div>404</div>} />
            <Route path="/api/*" element={<></>} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    )
}

export default Router
