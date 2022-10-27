import RootProvider from '@/Providers/RootProviders'
import App from '@/App'

const Root = () => {
    return (
        <RootProvider>
            <App />
        </RootProvider>
    )
}

export default Root
