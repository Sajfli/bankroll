import { EditorId, InitHandlerType, Modules } from '@/types/editor'

import EditorModules from '@/utils/ArticleModules'

const EditorModule = ({
    id,
    initHandler,
}: {
    id: EditorId
    initHandler: InitHandlerType
}) => {
    return (
        <select
            defaultValue="_"
            onChange={(e) => {
                const target = e.target as HTMLSelectElement

                console.log(target.value)
                initHandler(id).handleModuleSelect(target.value as Modules)
            }}
        >
            <option value="_" disabled>
                wybierz moduł
            </option>
            {EditorModules.map((value) => (
                <option value={value} key={value}>
                    {value}
                </option>
            ))}
        </select>
    )
}

export default EditorModule
