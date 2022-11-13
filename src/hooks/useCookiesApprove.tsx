import { useState, createContext, useContext } from 'react'

type AcceptCallback = () => void

type CookiesApproveContextType = {
    blur: boolean
    setBlur: (blur: boolean) => void
    show: boolean
    setShow: (show: boolean) => void
    acceptCallback?: AcceptCallback
    setAcceptCallback: (callback: AcceptCallback | undefined) => void
}

const CookiesApproveContext = createContext<CookiesApproveContextType>({
    blur: false,
    setBlur: () => {},
    show: false,
    setShow: () => {},
    setAcceptCallback: () => {},
})

const CookiesApproveProvider = ({
    children,
}: {
    children: React.ReactElement
}) => {
    const [blur, setBlur] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const [acceptCallback, setAcceptCallback] = useState<
        AcceptCallback | undefined
    >(undefined)

    return (
        <CookiesApproveContext.Provider
            value={{
                blur: blur,
                setBlur: setBlur,
                show: show,
                setShow: setShow,
                acceptCallback,
                setAcceptCallback,
            }}
        >
            {children}
        </CookiesApproveContext.Provider>
    )
}

const useCookieApprove = () => {
    const cookieApprove = useContext(CookiesApproveContext)

    return cookieApprove
}

export { useCookieApprove as default, CookiesApproveProvider }
