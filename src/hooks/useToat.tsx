import { useContext, createContext } from 'react'
import { NodeChildren } from '@/types/children'
import propTypes from 'prop-types'
import { toast, ToastContainer, UpdateOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContextType } from '@/types/utils'

const ToastContext = createContext<ToastContextType>({
    warn: toast.warn,
    info: toast.info,
    success: toast.success,
    error: toast.error,
    promise: toast.promise,
    loading: toast.loading,
    update: toast.update,
})

const ToastProvider = ({ children }: NodeChildren) => {
    return (
        <ToastContext.Provider
            value={{
                warn: toast.warn,
                info: toast.info,
                success: toast.success,
                error: toast.error,
                promise: toast.promise,
                loading: toast.loading,
                update: toast.update,
            }}
        >
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {children}
        </ToastContext.Provider>
    )
}

ToastProvider.propTypes = {
    children: propTypes.node.isRequired,
}

const useToast = () => {
    const toast = useContext(ToastContext)
    return toast
}

const standardUpdateOptions: UpdateOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'dark',
    isLoading: false,
}

export { ToastProvider, standardUpdateOptions }
export default useToast
