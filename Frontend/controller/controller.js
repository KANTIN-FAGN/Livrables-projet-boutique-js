const url = "http://localhost:4000/";
const axios = require("axios");

exports.Index = (req, res) => {
    res.render('../views/pages/index');
}

exports.ArticlesHomme = async (req, res) => {
    try {
        const [url1, url2, url3, url4] = await Promise.all([
            axios.get(`${url}mode-homme/`),
            axios.get(`${url}colors/`),
            axios.get(`${url}materials/`),
            axios.get(`${url}categories/`)
        ]);

        const articles = url1.data.articles.items;
        const colors = url2.data.colors;
        const materials = url3.data.materials;
        const categories = url4.data.categories;

        console.log(articles);

        res.render('../views/pages/articles', {
            lst_article: articles,
            lst_color: colors,
            lst_materials: materials,
            lst_categorys: categories
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.ArticlesFemme = async (req, res) => {
    try {
        const [url1, url2, url3, url4] = await Promise.all([
            axios.get(`${url}mode-femme/`),
            axios.get(`${url}colors/`),
            axios.get(`${url}materials/`),
            axios.get(`${url}categories/`)
        ]);

        const articles = url1.data.articles.items;
        const colors = url2.data.colors;
        const materials = url3.data.materials;
        const categories = url4.data.categories;

        res.render('../views/pages/articles', {
            lst_article: articles,
            lst_color: colors,
            lst_materials: materials,
            lst_categorys: categories
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getArticleById = (req, res) => {
    const articleId = req.params.id;
    getArticle(articleId)
        .then((article) => {
            res.render("../views/pages/single-article", {
                article: article.article,
                articlesWithDifferentColors: article.articlesWithDifferentColors 
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Erreur lors de la récupération de l'article");
        });
};

async function getArticle(id) {
    const response = await axios.get(`${url}article/${id}`);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error("Erreur lors de la récupération de l'article");
    }
}