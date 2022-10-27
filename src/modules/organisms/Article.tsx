import { Interweave } from 'interweave'
import LoaderScreen from '../molecules/LoaderScreen'

import { ContentType, ContentValueType, Modules } from '@/types/editor'
import { ArticleModulesList } from '@/utils/ArticleModules'

import './Article.scss'
import { ReactElement } from 'react'

const ListWrapper = ({
    type,
    children,
}: {
    type?: 'ol' | 'ul'
    children?: ReactElement[]
}) => {
    if (type === 'ol') return <ol>{children && children}</ol>
    else return <ul>{children}</ul>
}

const ArticlePartElement = ({
    type,
    listType,
    value,
    values,
}: ContentValueType) => {
    if (type === 'paragraph')
        return (
            <p>
                <Interweave content={value} />
            </p>
        )
    if (type === 'list')
        return (
            <ListWrapper type={listType}>
                {values &&
                    values.map(({ id, value }) => (
                        <li key={id}>
                            <Interweave content={value} />
                        </li>
                    ))}
            </ListWrapper>
        )
    if (type === 'quote')
        return (
            <q>
                <Interweave content={value} />
            </q>
        )
    return null
}

const ArticlePart = ({
    header,
    value,
}: {
    header?: ContentType['header']
    value: ContentValueType[]
}) => {
    return (
        <div className="part">
            {header && <h2>{header}</h2>}
            {value &&
                value.map(({ type, listType, value, values, id }) => (
                    <ArticlePartElement
                        key={id}
                        id={id}
                        type={type}
                        listType={listType}
                        value={value}
                        values={values}
                    />
                ))}
        </div>
    )
}

const Blockquote = ({ value }: { value: ContentValueType[] }) => {
    const quote = value.findIndex(({ type }) => type === 'quote'),
        author = value.findIndex(({ type }) => type === 'author')

    if (quote < 0 || author < 0) return null

    return (
        <figure className="quote">
            <blockquote>
                <q>{value[quote].value}</q>
            </blockquote>
            <figcaption>{value[author].value}</figcaption>
        </figure>
    )
}

const Module = ({ value }: { value: ContentValueType[] }) => {
    if (
        !value[0] ||
        !value[0].moduleName ||
        !Object.keys(ArticleModulesList).includes(value[0].moduleName)
    )
        return null

    const ModuleComponent = ArticleModulesList[value[0].moduleName]
    if (!ModuleComponent) return null

    return <ModuleComponent />
}

const ParseType = ({
    type,
    header,
    value,
}: {
    type: ContentType['type']
    header: ContentType['header']
    value: ContentType['value']
}) => {
    if (type === 'part') return <ArticlePart header={header} value={value} />
    if (type === 'blockquote') return <Blockquote value={value} />
    if (type === 'module') return <Module value={value} />
    return null
}

const ParseArticle = ({ data }: { data?: ContentType[] | null }) => {
    if (!data) return <LoaderScreen />

    return (
        <div className="stage">
            <h1>Title!</h1>
            {data.map(({ type, header, value, id }) => (
                <ParseType type={type} header={header} value={value} key={id} />
            ))}
        </div>
    )
}

export default ParseArticle
