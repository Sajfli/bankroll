import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import style from './Editor.module.scss'

import * as Editor from '@/types/editor'
import EditorList from '@/modules/molecules/Admin/Editor/EditorList'
import EditorParagraph from '@/modules/molecules/Admin/Editor/EditorParagraph'

const RenderValuesWrapper = ({
    children,
    type,
    id,
    handleRemoveModal,
    handleRemove,
}: Editor.RenderValuesWrapperType) => (
    <div className={style.value}>
        <div className={style.inputs}>{children}</div>
        <div className={style.icons}>
            <FontAwesomeIcon
                icon={faXmark}
                className={style.removeIcon}
                onClick={() => {
                    handleRemoveModal(
                        type === 'list' ? 'tę listę' : 'ten paragraf',
                        () => {
                            handleRemove(id)
                        }
                    )
                }}
            />
            <FontAwesomeIcon icon={faBars} className={style.draggable} />
        </div>
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
}: Editor.ContentValueType & {
    handleRemoveModal: Editor.HandleRemoveModalType
    handleRemove: (id: string) => void
    initHandler: Editor.InitHandlerType
}) => {
    return (
        <RenderValuesWrapper
            type={type}
            id={id}
            handleRemove={handleRemove}
            handleRemoveModal={handleRemoveModal}
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
