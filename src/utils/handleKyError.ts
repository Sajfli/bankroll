import { standardUpdateOptions } from '@/hooks/useToat'
import { ToastContextType } from '@/types/utils'
import { Id } from 'react-toastify/dist/types'
import handleError from './handleError'

const handleKyError = (err: any, cb: (status: number, msg?: string) => void) =>
    new Promise(async (resolve, reject) => {
        try {
            if (err.response?.status) {
                const msg = (await err.response.json()).msg
                cb(err.response.status, msg)
                resolve(true)
            } else throw Error()
        } catch (error) {
            if (err.response.status) {
                cb(err.response.status)
                resolve(true)
            } else reject(false)
        }
    })

const handleKyErrorToast = (err: any, toast: ToastContextType, toastId: Id) => {
    handleKyError(err, (status, msg) => {
        toast.update(toastId, {
            ...standardUpdateOptions,
            type: 'error',
            render: handleError(
                msg && typeof msg !== 'undefined' ? msg : status
            ),
        })
    }).catch(() => {
        toast.update(toastId, {
            ...standardUpdateOptions,
            type: 'error',
            render: handleError(),
        })
    })
}

export { handleKyErrorToast, handleKyError as default }
