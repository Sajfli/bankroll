import { ReactElement } from 'react'

// export type Children = { children: ReactElement | string }
export type NodeChildren = {
    children: ReactElement | ReactElement[]
}
export type TextChildren = { children: string | string[] }
export type Children = NodeChildren | TextChildren
