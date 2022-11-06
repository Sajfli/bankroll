import { useParams } from 'react-router-dom'

import messages from '@/utils/errorsScreen.json'
import ErrorMessage from '@/modules/molecules/ErrorMessage'
import useAutoRedirect from '@/hooks/useAutoRedirect'

const Errors = ['404', '403', '500'] as const
type tErrors = typeof Errors[number]
const isValidError = (x: any): x is tErrors => Errors.includes(x)

const Error = () => {
    useAutoRedirect()

    const params = useParams()

    const errCode = (
        params.err && isValidError(params.err) ? params.err : 500
    ) as tErrors

    const message = messages[errCode]

    return <ErrorMessage>{message}</ErrorMessage>
}

export default Error
