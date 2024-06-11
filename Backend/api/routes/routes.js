const express = require('express');
const router = express.Router();
const controllersArticle = require('../controllers/articlesController');
const controllersUser = require('../controllers/logController');
const controllersFav = require('../controllers/favController');
const middleware = {
    validateToken: require('../middlewares/auth'),
    articleExist: require('../middlewares/article-exist'),
};


router.get('/mode-homme/', controllersArticle.getArticleHomme);
router.get('/mode-femme/', controllersArticle.getArticleFemme);
router.get('/articles_aleatoire/', controllersArticle.get4ArticlesAleatoire);
router.get('/article/:id', middleware.articleExist, controllersArticle.getArticleById);
router.get('/colors', controllersArticle.getColors);
router.get('/materials', controllersArticle.getMaterials);
router.get('/categories', controllersArticle.getCategories);
router.get('/search', controllersArticle.searchArticles);
router.get('/4Articles', controllersArticle.get4ArticlesAleatoire);

router.post('/add-to-fav', middleware.validateToken, controllersFav.AddToFav);
router.post('/remove-from-fav', middleware.validateToken, controllersFav.RemoveFromFav);
router.get('/get-fav', middleware.validateToken, controllersFav.getUserFav);

router.post('/create-compte', controllersUser.Register);
router.post('/connexion', controllersUser.Login);
router.get('/getUser', middleware.validateToken, controllersUser.getUser);


module.exports = router;
