import Banks from '@/modules/organisms/BankAccounts'

const EditorModules = ['BankAccounts'] as const
const ArticleModulesList: {
    [moduleName in typeof EditorModules[number]]: (...props: any) => JSX.Element
} = {
    BankAccounts: Banks,
}

export default EditorModules
export { ArticleModulesList }
