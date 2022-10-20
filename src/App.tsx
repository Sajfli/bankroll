import Router from '@/Routing/Router'
import './App.scss'

import Header from '@/modules/organisms/Header'
import Footer from '@/modules/organisms/Footer'
import Modal from '@/modules/molecules/Modal'

function App() {
    return (
        <div id="App">
            <Modal />
            <Header />
            <div className="content">
                <main>
                    <Router />
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default App
