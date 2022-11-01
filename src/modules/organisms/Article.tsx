import { Interweave } from 'interweave'
import { ReactElement } from 'react'

import { ArticleModulesList } from '@/utils/ArticleModules'
import LoaderScreen from '../molecules/LoaderScreen'

import { ArticleContent, Article, ArticleContentValue } from '@/types/article'
import './Article.scss'

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

const LeftRightMapper = ({ content }: { content: ArticleContentValue[] }) => (
    <div>
        {content.map(({ type, listType, value, values, _id }) => (
            <ArticlePartElement
                key={_id}
                _id={_id}
                type={type}
                listType={listType}
                value={value}
                values={values}
            />
        ))}
    </div>
)

const ArticlePartElement = ({
    type,
    listType,
    value,
    values,
    leftRight,
}: ArticleContentValue) => {
    switch (type) {
        case 'paragraph':
            return (
                <p>
                    <Interweave content={value as string} />
                </p>
            )
        case 'list':
            return (
                <ListWrapper type={listType}>
                    {values &&
                        values.map(({ _id, value }) => (
                            <li key={_id}>
                                <Interweave content={value} />
                            </li>
                        ))}
                </ListWrapper>
            )
        case 'quote':
            return (
                <q>
                    <Interweave content={value as string} />
                </q>
            )
        case 'file':
            return (
                <figure className="image">
                    <img src={value} alt="" />
                </figure>
            )
        case 'rl':
            if (!leftRight) return null
            return (
                <div className="rl">
                    <LeftRightMapper content={leftRight.left} />
                    <LeftRightMapper content={leftRight.right} />
                </div>
            )
        default:
            return <b>type</b>
    }
}

const ArticlePart = ({
    header,
    value,
}: {
    header?: ArticleContent['header']
    value: ArticleContentValue[]
}) => {
    return (
        <div className="part">
            {header && <h2>{header}</h2>}
            {value &&
                value.map(
                    ({ type, listType, value, values, _id, leftRight }) => (
                        <ArticlePartElement
                            key={_id}
                            _id={_id}
                            type={type}
                            listType={listType}
                            value={value}
                            values={values}
                            leftRight={leftRight}
                        />
                    )
                )}
        </div>
    )
}

const Blockquote = ({ value }: { value: ArticleContentValue[] }) => {
    const quote = value.findIndex(({ type }) => type === 'quote'),
        author = value.findIndex(({ type }) => type === 'author')

    if (quote < 0 || author < 0) return null

    return (
        <figure className="quote">
            <blockquote>
                <q>{value[quote].value as string}</q>
            </blockquote>
            <figcaption>{value[author].value as string}</figcaption>
        </figure>
    )
}

const Module = ({ value }: { value: ArticleContentValue[] }) => {
    if (
        !value[0] ||
        !value[0].moduleName ||
        !Object.keys(ArticleModulesList).includes(value[0].moduleName)
    )
        return null

    const ModuleComponent = ArticleModulesList[value[0].moduleName]
    if (!ModuleComponent) return null

    return (
        <div className="module">
            <ModuleComponent />
        </div>
    )
}

const ParseType = ({
    type,
    header,
    value,
}: {
    type: ArticleContent['type']
    header: ArticleContent['header']
    value: ArticleContent['value']
}) => {
    if (type === 'part') return <ArticlePart header={header} value={value} />
    if (type === 'blockquote') return <Blockquote value={value} />
    if (type === 'module') return <Module value={value} />
    return null
}

type ParseArticleProps = {
    article: Article | null
    type?: 'stage'
}
const ParseArticle = ({ article, type }: ParseArticleProps) => {
    if (!article) return <LoaderScreen />

    const { title, content } = article

    return (
        <div className={type || 'stage'}>
            <article>
                <h1>{title || 'Brak tytułu'}</h1>
                {content &&
                    content.map(({ type, header, value, _id }) => (
                        <ParseType
                            type={type}
                            header={header}
                            value={value}
                            key={_id}
                        />
                    ))}
            </article>
        </div>
    )
}

export default ParseArticle
