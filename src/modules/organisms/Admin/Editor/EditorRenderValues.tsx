import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import style from './Editor.module.scss'

import * as Editor from '@/types/editor'
import EditorList from '@/modules/molecules/Admin/Editor/EditorList'
import EditorParagraph from '@/modules/molecules/Admin/Editor/EditorParagraph'
import EditorQuote from '@/modules/molecules/Admin/Editor/EditorQuote'
import EditorAuthor from '@/modules/molecules/Admin/Editor/EditorAuthor'
import EditorModule from '@/modules/molecules/Admin/Editor/EditorModule'
import EditorImage from '@/modules/molecules/Admin/Editor/EditorImage'
import EditorRl from '@/modules/molecules/Admin/Editor/EditorRl'
import { ContentTypes } from '@/types/article'

const typeToRemoveMessage = (type: Editor.ContentValueType['type']) => {
    switch (type) {
        case 'list':
            return 'tę listę'
        case 'paragraph':
            return 'ten paragraf'
        case 'quote':
            return 'ten cytat'
        default:
            return 'ten element'
    }
}

const RenderValuesWrapper = ({
    children,
    type,
    id,
    handleRemoveModal,
    handleRemove,
    blockType,
    customGrabHandle,
    rlId,
}: Editor.RenderValuesWrapperType) => (
    <div className={style.value}>
        <div
            className={classNames(
                style.inputs,
                blockType === 'part' && style.part
            )}
        >
            {children}
        </div>
        {blockType === 'part' && (
            <div className={style.icons}>
                <FontAwesomeIcon
                    icon={faXmark}
                    className={style.removeIcon}
                    onClick={() => {
                        handleRemoveModal(typeToRemoveMessage(type), () => {
                            handleRemove(rlId || id)
                        })
                    }}
                />
                <FontAwesomeIcon
                    icon={faBars}
                    className={classNames({
                        [`${style.draggable}`]: !customGrabHandle,
                        [`${style.draggable__nohandle}`]: !!customGrabHandle,
                        [`${customGrabHandle}`]: !!customGrabHandle,
                    })}
                />
            </div>
        )}
    </div>
)

type ContentTypeSelectorProps = {
    handler: Editor.Handler
    initHandler: Editor.InitHandlerType
    values: Editor.ContentValueType['values']
    listType: Editor.ContentValueType['listType']
    type: Editor.ContentValueType['type']
    leftRight: Editor.ContentValueType['leftRight']
    id: Editor.EditorId
    value: Editor.ContentValueType['value']
    moduleName: Editor.ContentValueType['moduleName']
    alreadyUploaded: Editor.ContentValueType['alreadyUploaded']
}
const ContentTypeSelector = ({
    handler,
    initHandler,
    values,
    listType,
    type,
    leftRight,
    id,
    value,
    moduleName,
    alreadyUploaded,
}: ContentTypeSelectorProps) => {
    switch (type) {
        case 'paragraph':
            return <EditorParagraph handler={handler} value={value as string} />
        case 'list':
            return (
                <EditorList
                    handler={handler}
                    values={values}
                    listType={listType}
                />
            )
        case 'quote':
            return <EditorQuote handler={handler} value={value as string} />
        case 'author':
            return <EditorAuthor handler={handler} value={value as string} />
        case 'module':
            return <EditorModule handler={handler} moduleName={moduleName} />
        case 'image':
        case 'file':
            return (
                <EditorImage
                    handler={handler}
                    alreadyUploaded={alreadyUploaded}
                    defaultValue={value}
                    caption={values}
                />
            )
        case 'rl':
            return (
                <EditorRl
                    id={id}
                    handler={handler}
                    initHandler={initHandler}
                    leftRight={leftRight}
                />
            )
        default:
            return null
    }
}

const RenderValues = ({
    type,
    values,
    id,
    listType,
    handleRemoveModal,
    handleRemove,
    initHandler,
    blockType,
    leftRight,
    rl,
    customGrabHandle,
    rlId,
    value,
    moduleName,
    alreadyUploaded,
}: Editor.ContentValueType & {
    handleRemoveModal: Editor.HandleRemoveModalType
    handleRemove: (id: string) => void
    initHandler: Editor.InitHandlerType
    blockType: ContentTypes
    rl?: { side: 'left' | 'right'; i: number }
    customGrabHandle?: string
    rlId?: Editor.EditorId
}) => {
    return (
        <RenderValuesWrapper
            type={type}
            id={id}
            handleRemove={handleRemove}
            handleRemoveModal={handleRemoveModal}
            blockType={blockType}
            customGrabHandle={customGrabHandle}
            rlId={rlId}
        >
            <div className={style.inputs}>
                <ContentTypeSelector
                    type={type}
                    handler={initHandler(id, rl)}
                    initHandler={initHandler}
                    values={values}
                    value={value}
                    listType={listType}
                    leftRight={leftRight}
                    id={id}
                    moduleName={moduleName}
                    alreadyUploaded={alreadyUploaded}
                />
            </div>
        </RenderValuesWrapper>
    )
}

export { ContentTypeSelector }
export default RenderValues
