import { ReactElement } from 'react'

export type NodeChildrenType = ReactElement | ReactElement[]
export type NodeChildren = {
    children: NodeChildrenType
}
export type TextChildren = { children: string | string[] }
export type Children = NodeChildren | TextChildren
