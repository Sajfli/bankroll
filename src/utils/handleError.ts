import errors_json from './errors.json'

const errors = errors_json as { [key: string]: string }

const handleError = (err?: string | number) => {
    console.log(err)
    if (err && errors[err]) {
        return errors[err]
    }
    return errors.unknown
}

export default handleError
