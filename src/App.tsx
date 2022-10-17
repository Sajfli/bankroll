import Router from '@/Routing/Router'
import './App.scss'

import Header from '@/modules/organisms/Header'
import Footer from '@/modules/organisms/Footer'

function App() {
    return (
        <div id="App">
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
