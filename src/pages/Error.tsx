import { useParams } from 'react-router-dom'

import messages from '@/utils/errors.json'
import ErrorMessage from '@/modules/molecules/ErrorMessage'

const Errors = ['404', '500'] as const
type tErrors = typeof Errors[number]
const isValidError = (x: any): x is tErrors => Errors.includes(x)

const Error = () => {
    const params = useParams()

    const errCode = (
        params.err && isValidError(params.err) ? params.err : 500
    ) as tErrors

    const message = messages[errCode]

    return <ErrorMessage>{message}</ErrorMessage>
}

export default Error