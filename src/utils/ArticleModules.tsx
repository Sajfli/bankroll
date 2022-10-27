import Banks from '@/modules/organisms/Banks'

const EditorModules = ['BankAccounts'] as const
const ArticleModulesList: {
    [moduleName in typeof EditorModules[number]]: () => JSX.Element
} = {
    BankAccounts: Banks,
}

export default EditorModules
export { ArticleModulesList }
