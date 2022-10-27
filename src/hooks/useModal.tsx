import { useContext, useState, createContext } from 'react'
import { NodeChildrenType, NodeChildren } from '@/types/children'
import propTypes from 'prop-types'
import { ModalContext as ModalContextType } from '@/types/utils'

const ModalContext = createContext<ModalContextType>({
    show: () => {},
    hide: () => {},
    setContent: (child: NodeChildrenType) => ({
        show: () => {},
    }),
    isOpen: false,
    content: null,
})

const ModalProvider = ({ children }: NodeChildren) => {
    const [isOpen, setModalState] = useState<boolean>(false)
    const [content, _setContent] = useState<null | NodeChildrenType>(null)

    const show = () => setModalState(true)
    const hide = () => {
        _setContent(null)
        setModalState(false)
    }

    const setContent = (children: NodeChildrenType) => {
        _setContent(children)
        return { show }
    }

    return (
        <ModalContext.Provider
            value={{
                show,
                hide,
                isOpen,
                content,
                setContent,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

ModalProvider.propTypes = {
    children: propTypes.node.isRequired,
}

const useModal = () => {
    const modal = useContext(ModalContext)

    return modal
}

export { ModalProvider }
export default useModal
