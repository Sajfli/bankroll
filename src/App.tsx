import { Outlet } from 'react-router-dom'
import './App.scss'

import Header from '@/modules/organisms/Header'
import Footer from '@/modules/organisms/Footer'
import Modal from '@/modules/molecules/Modal'
import CookiesApprove from './modules/molecules/CookiesApprove'

function App() {
    return (
        <div id="App">
            <Modal />
            <CookiesApprove />
            <Header />
            <div className="content">
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default App
