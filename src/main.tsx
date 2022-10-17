import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import RootProvider from '@/Providers/RootProviders'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RootProvider>
            <App />
        </RootProvider>
    </React.StrictMode>
)
