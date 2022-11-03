import { AuthProvider } from '@/hooks/useAuth'
import { ModalProvider } from '@/hooks/useModal'
import PropTypes from 'prop-types'

import { NodeChildren } from '@/types/children'
import { ToastProvider } from '@/hooks/useToast'
import IconsProvider from './IconsProvider'

const RootProvider = ({ children }: NodeChildren) => {
    return (
        <AuthProvider>
            <IconsProvider>
                <ToastProvider>
                    <ModalProvider>{children}</ModalProvider>
                </ToastProvider>
            </IconsProvider>
        </AuthProvider>
    )
}

RootProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default RootProvider
