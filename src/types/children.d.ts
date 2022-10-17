import { ReactElement } from 'react'

export type NodeChildren = {
    children: ReactElement | ReactElement[]
}
export type TextChildren = { children: string | string[] }
export type Children = NodeChildren | TextChildren
