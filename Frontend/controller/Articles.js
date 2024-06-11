const url = "http://localhost:4000/";
const axios = require("axios");
const controllerLog = require('./log');
const controllerFav = require('./fav');

class Articles {
    static async Index(req, res) {
        try {
            const token = req.cookies.Token;
            const dataUser = await controllerLog.getUser(req, res);
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;

            res.render('../views/pages/index', {
                dataUser,
                dataFav: dataFav && dataFav.articles ? dataFav.articles : []
            });

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
            const token = req.cookies.Token;
            const sortOrder = req.query.sortOrder || 'asc'; // Par défaut tri ascendant si non spécifié
            const category = req.query.category; // Récupérer la catégorie sélectionnée
            const color = req.query.color; // Récupérer la couleur sélectionnée
            const material = req.query.material; // Récupérer le matériau sélectionné
    
            // Construire l'URL de l'API en incluant les paramètres de la requête
            let urlApi = `${url}mode-homme?sortOrder=${sortOrder}`;
            if (category) {
                urlApi += `&category=${category}`;
            }
            if (color) {
                urlApi += `&color=${color}`;
            }
            if (material) {
                urlApi += `&material=${material}`;
            }
    
            // Effectuer la requête avec les paramètres de la requête
            const [url1, url2, url3, url4] = await Promise.all([
                axios.get(urlApi),
                axios.get(`${url}colors/`),
                axios.get(`${url}materials/`),
                axios.get(`${url}categories/`),
            ]);
    
            const dataUser = await controllerLog.getUser(req, res);
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;
    
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
                dataFav: dataFav && dataFav.articles ? dataFav.articles : [],
                err: null
            });
    
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    };
    
    static async ArticlesFemme(req, res) {
        try {
            const token = req.cookies.Token;
            const sortOrder = req.query.sortOrder || 'asc'; // Par défaut tri ascendant si non spécifié
    
            const [url1, url2, url3, url4] = await Promise.all([
                axios.get(`${url}mode-femme?sortOrder=${sortOrder}`),
                axios.get(`${url}colors/`),
                axios.get(`${url}materials/`),
                axios.get(`${url}categories/`)
            ]);
    
            const dataUser = await controllerLog.getUser(req, res);
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;
    
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
                dataFav: dataFav && dataFav.articles ? dataFav.articles : [],
                err: null
            });
    
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    };
    static async getArticleById(req, res) {
        try {
            const token = req.cookies.Token;
            const articleId = req.params.id;
            const article = await Articles.getArticle(articleId);
            const dataUser = await controllerLog.getUser(req, res);
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;
    
            const like = await controllerFav.getFavID(token, articleId);
    
            res.render("../views/pages/single-article", {
                article: article.article,
                articlesWithDifferentColors: article.articlesWithDifferentColors,
                dataUser,
                dataFav: dataFav && dataFav.articles ? dataFav.articles : [],
                like: like
            });
        } catch (err) {
            console.error("Error retrieving article:", err);
            res.status(500).send("Erreur lors de la récupération de l'article");
        }
    }
    static async searchArticle(req, res) {
        const { term } = req.body;
        try {
            const token = req.cookies.Token;
            const [url1, url2, url3, url4] = await Promise.all([
                axios.get(`${url}search?term=${term}`),
                axios.get(`${url}colors/`),
                axios.get(`${url}materials/`),
                axios.get(`${url}categories/`)
            ]);

            const dataUser = await controllerLog.getUser(req, res);
            const dataFav = await controllerFav.Fav.getFav(token);

            console.log(dataFav);

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
                dataFav: dataFav.articles,
                err: null
            });
        } catch (err) {
            res.status(404).render('../views/pages/articles', {
                message: `Désolé, aucun résultat ne correspond à votre recherche <span class="Bold-err">"${term}"</span>`,
                status: 404,
                err: err
            });
        }
    }
}

module.exports = Articles;
