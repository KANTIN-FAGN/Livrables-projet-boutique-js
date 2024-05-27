const url = "http://localhost:4000/";

exports.Index = (req, res) => {
    res.render('../views/pages/index')
}

exports.ArticlesHomme = (req, res) => {
    getArticlesHomme()
        .then((articles) => {
            res.render("../views/pages/articles", {
                lst: articles.articles.items
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.ArticlesFemme = (req, res) => {
    getArticlesFemme()
        .then((articles) => {
            res.render("../views/pages/articles", {
                lst: articles.articles.items
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

async function getArticlesHomme() {
    const data = await fetch(`${url}mode-homme/`);
    return data.json();
}
async function getArticlesFemme() {
    const data = await fetch(`${url}mode-femme/`);
    return data.json();
}