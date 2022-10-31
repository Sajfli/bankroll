import useModal from '@/hooks/useModal'
import Button from '@/modules/atoms/Button'
import ConfirmModal from '@/modules/atoms/ConfirmModal'
import RenderValues from '@/modules/organisms/Admin/Editor/EditorRenderValues'
import {
    Handler,
    EditorId,
    ContentValueType,
    InitHandlerType,
    HandleRemoveModalType,
} from '@/types/editor'
import { ReactSortable } from 'react-sortablejs'

import './EditorInputs.scss'

const Buttons = ({
    side,
    handler,
}: {
    side: 'left' | 'right'
    handler: Handler
}) => {
    const handleAdd = (type: ContentValueType['type']) => {
        handler.handleRlAdd(side, type)
    }

    return (
        <div className="buttons">
            <Button onClick={() => handleAdd('paragraph')}>
                Dodaj paragraf
            </Button>
            <Button onClick={() => handleAdd('list')}>Dodaj liste</Button>
            <Button onClick={() => handleAdd('file')}>Dodaj obraz</Button>
            <Button onClick={() => handleAdd('quote')}>Dodaj cytat</Button>
        </div>
    )
}

const RlContentMapper = ({
    array,
    side,
    originalId,
    handler,
    initHandler,
}: {
    array: ContentValueType[]
    side: 'left' | 'right'
    originalId: string
    handler: Handler
    initHandler: InitHandlerType
}) => {
    const modal = useModal()

    const handleRemoveModal: HandleRemoveModalType = (
        whatToRemove,
        removeFunction
    ) => {
        modal
            .setContent(
                <ConfirmModal
                    question={`Czy na pewno chcesz usunąć ${whatToRemove}`}
                    ConfirmButton={
                        <Button
                            onClick={() => {
                                removeFunction()
                                modal.hide()
                            }}
                        >
                            Tak, usuń
                        </Button>
                    }
                    CancelButton={<Button onClick={modal.hide}>Nie</Button>}
                />
            )
            .show()
    }

    const handleRemove = (id: string) => {
        const i = array.findIndex(({ id: _id }) => id === _id)
        if (i < 0) return
        const _arr = [...array]
        _arr.splice(i, 1)
        handler.handleRlOrderChange(side, _arr)
    }

    return (
        <div className={side}>
            <b>{side === 'left' ? 'Lewo' : 'Prawo'}</b>
            <ReactSortable
                className="list"
                list={array}
                setList={(newState) => {
                    handler.handleRlOrderChange(side, newState)
                }}
                group={{
                    name: `rl${originalId}`,
                    pull: (to, from) => {
                        return to.el.children.length < 3
                    },
                }}
                animation={200}
                delay={3}
                delayOnTouchOnly={true}
                handle={`.rl${originalId}`}
            >
                {array.map(({ id, type, values, value, listType }, i) => (
                    <RenderValues
                        key={id}
                        type={type}
                        values={values}
                        value={value}
                        listType={listType}
                        rl={{ side, i }}
                        id={originalId}
                        rlId={id}
                        handleRemove={handleRemove}
                        handleRemoveModal={handleRemoveModal}
                        leftRight={undefined}
                        moduleName={undefined}
                        initHandler={initHandler}
                        blockType="part"
                        customGrabHandle={`rl${originalId}`}
                    />
                ))}
            </ReactSortable>
            {array.length < 3 && <Buttons side={side} handler={handler} />}
        </div>
    )
}

const EditorRl = ({
    handler,
    initHandler,
    id: originalId,
    leftRight,
}: {
    id: EditorId
    handler: Handler
    initHandler: InitHandlerType
    leftRight: ContentValueType['leftRight']
}) => {
    if (!leftRight) return null

    return (
        <div className="editor_rl">
            <b>Bloczek podwójny</b>
            <div className="group">
                <RlContentMapper
                    side="left"
                    array={leftRight.left}
                    handler={handler}
                    initHandler={initHandler}
                    originalId={originalId}
                />
                <RlContentMapper
                    side="right"
                    array={leftRight.right}
                    handler={handler}
                    initHandler={initHandler}
                    originalId={originalId}
                />
            </div>
        </div>
    )
}
export default EditorRl
