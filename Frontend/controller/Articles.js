const url = "http://localhost:4000/";
const axios = require("axios");
const controllerLog = require('./log'); // Import du contrôleur de gestion des utilisateurs
const controllerFav = require('./fav'); // Import du contrôleur de gestion des favoris

class Articles {
    // Méthode statique pour récupérer un article par son ID
    static async getArticle(id) {
        const response = await axios.get(`${url}article/${id}`);
        if (response.status === 200) {
            return response.data; // Retourne les données de l'article si la requête est réussie
        } else {
            throw new Error("Erreur lors de la récupération de l'article");
        }
    }

    // Méthode statique pour afficher les articles pour hommes
    static async ArticlesHomme(req, res) {
        try {
            const token = req.cookies.Token; // Récupération du token d'authentification depuis les cookies
            const sortOrder = req.query.sortOrder || 'asc'; // Par défaut tri ascendant si non spécifié
            const category = req.query.category; // Récupération de la catégorie sélectionnée
            const color = req.query.color; // Récupération de la couleur sélectionnée
            const material = req.query.material; // Récupération du matériau sélectionné

            // Construction de l'URL de l'API en incluant les paramètres de la requête
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

            // Effectuer plusieurs requêtes simultanées avec Promise.all pour optimiser les performances
            const [url1, url2, url3, url4] = await Promise.all([
                axios.get(urlApi), // Requête pour récupérer les articles selon les critères
                axios.get(`${url}colors/`), // Requête pour récupérer les couleurs disponibles
                axios.get(`${url}materials/`), // Requête pour récupérer les matériaux disponibles
                axios.get(`${url}categories/`) // Requête pour récupérer les catégories disponibles
            ]);

            // Récupération des données utilisateur et des favoris de l'utilisateur actuel
            const dataUser = await controllerLog.getUser(req, res);
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;

            // Extraction des articles, couleurs, matériaux et catégories des réponses des requêtes
            const articles = url1.data.articles.items;
            const colors = url2.data.colors;
            const materials = url3.data.materials;
            const categories = url4.data.categories;

            // Rendu de la vue avec les données récupérées
            res.render('../views/pages/articles', {
                lst_article: articles,
                lst_color: colors,
                lst_materials: materials,
                lst_categorys: categories,
                dataUser,
                dataFav: dataFav && dataFav.articles ? dataFav.articles : [], // Vérification et gestion des favoris
                err: null // Pas d'erreur à signaler initialement
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error"); // En cas d'erreur, retourner une erreur 500
        }
    };

    // Méthode statique pour afficher les articles pour femmes
    static async ArticlesFemme(req, res) {
        try {
            const token = req.cookies.Token; // Récupération du token d'authentification depuis les cookies
            const sortOrder = req.query.sortOrder || 'asc'; // Par défaut tri ascendant si non spécifié

            // Effectuer plusieurs requêtes simultanées avec Promise.all pour optimiser les performances
            const [url1, url2, url3, url4] = await Promise.all([
                axios.get(`${url}mode-femme?sortOrder=${sortOrder}`), // Requête pour récupérer les articles selon les critères
                axios.get(`${url}colors/`), // Requête pour récupérer les couleurs disponibles
                axios.get(`${url}materials/`), // Requête pour récupérer les matériaux disponibles
                axios.get(`${url}categories/`) // Requête pour récupérer les catégories disponibles
            ]);

            // Récupération des données utilisateur et des favoris de l'utilisateur actuel
            const dataUser = await controllerLog.getUser(req, res);
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;

            // Extraction des articles, couleurs, matériaux et catégories des réponses des requêtes
            const articles = url1.data.articles.items;
            const colors = url2.data.colors;
            const materials = url3.data.materials;
            const categories = url4.data.categories;

            // Rendu de la vue avec les données récupérées
            res.render('../views/pages/articles', {
                lst_article: articles,
                lst_color: colors,
                lst_materials: materials,
                lst_categorys: categories,
                dataUser,
                dataFav: dataFav && dataFav.articles ? dataFav.articles : [], // Vérification et gestion des favoris
                err: null // Pas d'erreur à signaler initialement
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error"); // En cas d'erreur, retourner une erreur 500
        }
    };

    // Méthode statique pour récupérer un article par son ID et afficher ses détails
    static async getArticleById(req, res) {
        try {
            const token = req.cookies.Token; // Récupération du token d'authentification depuis les cookies
            const articleId = req.params.id; // Récupération de l'ID de l'article depuis les paramètres de l'URL
            const article = await Articles.getArticle(articleId); // Appel de la méthode getArticle pour récupérer l'article

            // Récupération des données utilisateur et des favoris de l'utilisateur actuel
            const dataUser = await controllerLog.getUser(req, res);
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;

            // Vérification si l'article est déjà dans les favoris de l'utilisateur
            const like = await controllerFav.getFavID(token, articleId);

            // Rendu de la vue avec les données récupérées
            res.render("../views/pages/single-article", {
                article: article.article,
                articlesWithDifferentColors: article.articlesWithDifferentColors,
                dataUser,
                dataFav: dataFav && dataFav.articles ? dataFav.articles : [], // Vérification et gestion des favoris
                like: like // Indicateur si l'utilisateur a déjà ajouté l'article aux favoris
            });

        } catch (err) {
            console.error("Error retrieving article:", err);
            res.status(500).send("Erreur lors de la récupération de l'article"); // En cas d'erreur, retourner une erreur 500
        }
    }

    // Méthode statique pour effectuer une recherche d'article par terme
    static async searchArticle(req, res) {
        const { term } = req.body; // Récupération du terme de recherche depuis le corps de la requête
        try {
            const token = req.cookies.Token; // Récupération du token d'authentification depuis les cookies

            // Effectuer plusieurs requêtes simultanées avec Promise.all pour optimiser les performances
            const [url1, url2, url3, url4] = await Promise.all([
                axios.get(`${url}search?term=${term}`), // Requête pour rechercher les articles selon le terme spécifié
                axios.get(`${url}colors/`), // Requête pour récupérer les couleurs disponibles
                axios.get(`${url}materials/`), // Requête pour récupérer les matériaux disponibles
                axios.get(`${url}categories/`) // Requête pour récupérer les catégories disponibles
            ]);

            // Récupération des données utilisateur et des favoris de l'utilisateur actuel
            const dataUser = await controllerLog.getUser(req, res);
            const dataFav = await controllerFav.Fav.getFav(token);

            // Extraction des articles, couleurs, matériaux et catégories des réponses des requêtes
            const articles = url1.data.articles.items;
            const colors = url2.data.colors;
            const materials = url3.data.materials;
            const categories = url4.data.categories;

            // Rendu de la vue avec les données récupérées
            res.render('../views/pages/articles', {
                lst_article: articles,
                lst_color: colors,
                lst_materials: materials,
                lst_categorys: categories,
                dataUser,
                dataFav: dataFav.articles, // Utilisation directe de dataFav.articles car dataFav est déjà vérifié dans le contrôleur de favoris
                err: null // Pas d'erreur à signaler initialement
            });

        } catch (err) {
            res.status(404).render('../views/pages/articles', {
                message: `Désolé, aucun résultat ne correspond à votre recherche <span class="Bold-err">"${term}"</span>`,
                status: 404,
                err: err // Transmission de l'erreur pour un éventuel traitement côté vue
            });
        }
    }
}

module.exports = Articles;

