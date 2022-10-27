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
                            handleRemove(id)
                        })
                    }}
                />
                <FontAwesomeIcon icon={faBars} className={style.draggable} />
            </div>
        )}
    </div>
)

type ContentTypeSelectorProps = {
    initHandler: Editor.InitHandlerType
    id: Editor.ContentValueType['id']
    values: Editor.ContentValueType['values']
    listType: Editor.ContentValueType['listType']
    type: Editor.ContentValueType['type']
}
const ContentTypeSelector = ({
    initHandler,
    id,
    values,
    listType,
    type,
}: ContentTypeSelectorProps) => {
    switch (type) {
        case 'paragraph':
            return <EditorParagraph initHandler={initHandler} id={id} />
        case 'list':
            return (
                <EditorList
                    initHandler={initHandler}
                    id={id}
                    values={values}
                    listType={listType}
                />
            )
        case 'quote':
            return <EditorQuote initHandler={initHandler} id={id} />
        case 'author':
            return <EditorAuthor initHandler={initHandler} id={id} />
        case 'module':
            return <EditorModule initHandler={initHandler} id={id} />
        case 'image':
            return <EditorImage initHandler={initHandler} id={id} />
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
}: Editor.ContentValueType & {
    handleRemoveModal: Editor.HandleRemoveModalType
    handleRemove: (id: string) => void
    initHandler: Editor.InitHandlerType
    blockType: Editor.ContentTypes
}) => {
    return (
        <RenderValuesWrapper
            type={type}
            id={id}
            handleRemove={handleRemove}
            handleRemoveModal={handleRemoveModal}
            blockType={blockType}
        >
            <div className={style.inputs}>
                <ContentTypeSelector
                    type={type}
                    id={id}
                    initHandler={initHandler}
                    values={values}
                    listType={listType}
                />
            </div>
        </RenderValuesWrapper>
    )
}

export default RenderValues
