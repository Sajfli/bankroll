import { useRef, useEffect } from 'react'

function usePrev<T>(value: T) {
    const ref = useRef<T>()

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}

export default usePrev
