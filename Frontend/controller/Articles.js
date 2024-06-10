const url = "http://localhost:4000/";
const axios = require("axios");
const controllerLog = require('./log');

class Articles {
    static async Index(req, res) {
        try {
            const dataUser = await controllerLog.getUser(req, res);
            res.render('../views/pages/index', { dataUser });
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }
    static async getArticle(id) {
        const response = await axios.get(`${url}article/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Erreur lors de la récupération de l'article");
        }
    }
    static async ArticlesHomme(req, res) {
        try {

            const [url1, url2, url3, url4] = await Promise.all([
                axios.get(`${url}mode-homme/`),
                axios.get(`${url}colors/`),
                axios.get(`${url}materials/`),
                axios.get(`${url}categories/`),
            ]);

            const dataUser = await controllerLog.getUser(req, res);

            const articles = url1.data.articles.items;
            const colors = url2.data.colors;
            const materials = url3.data.materials;
            const categories = url4.data.categories;

            res.render('../views/pages/articles', {
                lst_article: articles,
                lst_color: colors,
                lst_materials: materials,
                lst_categorys: categories,
                dataUser,
                err: null
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    };
    static async ArticlesFemme(req, res) {
        try {
            const [url1, url2, url3, url4] = await Promise.all([
                axios.get(`${url}mode-femme/`),
                axios.get(`${url}colors/`),
                axios.get(`${url}materials/`),
                axios.get(`${url}categories/`)
            ]);

            const dataUser = await controllerLog.getUser(req, res);

            const articles = url1.data.articles.items;
            const colors = url2.data.colors;
            const materials = url3.data.materials;
            const categories = url4.data.categories;

            res.render('../views/pages/articles', {
                lst_article: articles,
                lst_color: colors,
                lst_materials: materials,
                lst_categorys: categories,
                dataUser,
                err: null
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    };
    static async getArticleById(req, res) {
        try {
            const articleId = req.params.id;
            const article = await Articles.getArticle(articleId);
            const dataUser = await controllerLog.getUser(req, res);

            res.render("../views/pages/single-article", {
                article: article.article,
                articlesWithDifferentColors: article.articlesWithDifferentColors,
                dataUser
            });
        } catch (err) {
            console.error("Error retrieving article:", err);
            res.status(500).send("Erreur lors de la récupération de l'article");
        }
    }
    static async searchArticle(req, res) {
        const { term } = req.body;
        try {
            const [url1, url2, url3, url4] = await Promise.all([
                axios.get(`${url}search?term=${term}`),
                axios.get(`${url}colors/`),
                axios.get(`${url}materials/`),
                axios.get(`${url}categories/`)
            ]);
    
            const dataUser = await controllerLog.getUser(req, res);
    
            const articles = url1.data.articles.items;
            const colors = url2.data.colors;
            const materials = url3.data.materials;
            const categories = url4.data.categories;
    
            res.render('../views/pages/articles', {
                lst_article: articles,
                lst_color: colors,
                lst_materials: materials,
                lst_categorys: categories,
                dataUser,
                err: null // Assurez-vous de définir err comme null lorsqu'aucune erreur n'est survenue
            });
        } catch (err) {
            res.status(404).render('../views/pages/articles', {
                message: `Désolé, aucun résultat ne correspond à votre recherche <span class="Bold-err">"${term}"</span>`,
                status: 404,
                err: err // Transmettez l'erreur à votre modèle pour qu'elle puisse être affichée
            });
        }
    }
}

module.exports = Articles;
