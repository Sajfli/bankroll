import ArticleEditor from '@/modules/organisms/Admin/ArticleEditor'

const NewArticle = () => {
    return (
        <div className="defaultFormatting">
            <h1 className="header">Dodaj nowy artykuł</h1>

            <ArticleEditor />
        </div>
    )
}

export default NewArticle
