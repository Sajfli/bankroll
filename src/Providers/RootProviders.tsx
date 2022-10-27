import { AuthProvider } from '@/hooks/useAuth'
import { ModalProvider } from '@/hooks/useModal'
import PropTypes from 'prop-types'

import { NodeChildren } from '@/types/children'
import { ToastProvider } from '@/hooks/useToat'

const RootProvider = ({ children }: NodeChildren) => {
    return (
        <AuthProvider>
            <ToastProvider>
                <ModalProvider>{children}</ModalProvider>
            </ToastProvider>
        </AuthProvider>
    )
}

RootProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default RootProvider
