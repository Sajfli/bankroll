import { Handler, Modules, ContentValueType } from '@/types/editor'

import EditorModules from '@/utils/ArticleModules'

const EditorModule = ({
    handler,
    moduleName,
}: {
    handler: Handler
    moduleName: ContentValueType['moduleName']
}) => {
    return (
        <select
            defaultValue={moduleName || '_'}
            onChange={(e) => {
                const target = e.target as HTMLSelectElement

                console.log(target.value)
                handler.handleModuleSelect(target.value as Modules)
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
