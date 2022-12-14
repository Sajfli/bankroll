import { AuthProvider } from '@/hooks/useAuth'
import { ModalProvider } from '@/hooks/useModal'
import PropTypes from 'prop-types'

import { ToastProvider } from '@/hooks/useToast'
import IconsProvider from './IconsProvider'
import { CookiesApproveProvider } from '@/hooks/useCookiesApprove'

const RootProvider = ({ children }: { children: React.ReactElement }) => {
    return (
        <AuthProvider>
            <IconsProvider>
                <ToastProvider>
                    <CookiesApproveProvider>
                        <ModalProvider>{children}</ModalProvider>
                    </CookiesApproveProvider>
                </ToastProvider>
            </IconsProvider>
        </AuthProvider>
    )
}

RootProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default RootProvider
