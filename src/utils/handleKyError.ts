const handleKyError = (err: any, cb: (status: number, msg?: string) => void) =>
    new Promise(async (resolve) => {
        try {
            if (err && err.response && err.response.status) {
                const msg = (await err.response.json()).msg
                cb(err.response.status, msg)
                resolve(true)
            }
        } catch (err) {
            resolve(false)
        }
    })

export default handleKyError
