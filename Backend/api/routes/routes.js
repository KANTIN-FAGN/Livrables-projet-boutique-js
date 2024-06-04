const express = require('express');
const router = express.Router();
const controllersArticle = require('../controllers/articles');
const controllersUser = require('../controllers/log');

const middleware = {
    validateToken : require('../middlewares/auth'),
    articleExist : require('../middlewares/article-exist'),
};

//Define article's routes
router.get('/mode-homme/', controllersArticle.getArticleHomme);
router.get('/mode-femme/', controllersArticle.getArticleFemme);
router.get('/article/:id', middleware.articleExist ,controllersArticle.getArticleById);
router.get('/colors', controllersArticle.getColors);
router.get('/materials', controllersArticle.getMaterials);
router.get('/categories', controllersArticle.getCategories);
router.get('/create-compte', controllersUser.Register);
router.get('/connexion', controllersUser.Login);


//important pour le app.use dans le serveur
module.exports = router