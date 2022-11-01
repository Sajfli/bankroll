import errors_json from './errors.json'

const errors = errors_json as { [key: string]: string }

const handleError = (err?: string | number) => {
    const error = err ? `${err}` : null
    if (error && errors[error]) return errors[error]
    else if (error && error.length <= 30) return `${error}`
    return errors.unknown
}

export default handleError
