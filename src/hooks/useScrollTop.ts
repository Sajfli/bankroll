import { useEffect } from 'react'

const useScrollTop = () => {
    return useEffect(() => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
        })
    }, [])
}

export default useScrollTop
