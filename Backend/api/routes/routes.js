const express = require('express');
const router = express.Router();
const controllersArticle = require('../controllers/articlesController');
const controllersUser = require('../controllers/logController');
const controllersFav = require('../controllers/favController');
const middleware = {
    validateToken: require('../middlewares/auth'),
    articleExist: require('../middlewares/article-exist'),
};


// Routes pour les articles
router.get('/mode-homme/', controllersArticle.getArticleHomme);
router.get('/mode-femme/', controllersArticle.getArticleFemme);
router.get('/article/:id', middleware.articleExist, controllersArticle.getArticleById);
router.get('/colors', controllersArticle.getColors);
router.get('/materials', controllersArticle.getMaterials);
router.get('/categories', controllersArticle.getCategories);
router.get('/search', controllersArticle.searchArticles);
router.get('/articles-by-id', controllersArticle.getArticlesByIds);

// Routes pour les favoris
router.post('/add-to-fav', middleware.validateToken, controllersFav.AddToFav);
router.post('/remove-from-fav', middleware.validateToken, controllersFav.RemoveFromFav);
router.get('/get-fav', middleware.validateToken, controllersFav.getUserFav);

// Routes pour l'utilisateur
router.post('/create-compte', controllersUser.Register);
router.post('/connexion', controllersUser.Login);
router.get('/getUser', middleware.validateToken, controllersUser.getUser);

module.exports = router;
