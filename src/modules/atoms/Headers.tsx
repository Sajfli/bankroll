import './Headers.scss'

import { TextChildren } from '@/types/children'

const H1 = ({ children }: TextChildren) => {
    return <h1 className="headers">{children}</h1>
}

export { H1 }
