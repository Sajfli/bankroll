import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/hooks/useAuth'
import { ModalProvider } from '@/hooks/useModal'
import PropTypes from 'prop-types'

import { NodeChildren } from '@/types/children'

const RootProvider = ({ children }: NodeChildren) => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ModalProvider>{children}</ModalProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

RootProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default RootProvider
