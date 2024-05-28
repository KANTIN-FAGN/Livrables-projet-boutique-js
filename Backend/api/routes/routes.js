const express = require('express');
const router = express.Router();
const controllers = require('../controllers/articles');

const middleware = {
    validateToken : require('../middlewares/auth'),
    articleExist : require('../middlewares/article-exist'),
};

//Define article's routes
router.get('/mode-homme/', controllers.getArticleHomme);
router.get('/mode-femme/', controllers.getArticleFemme);
router.get('/article/:id', middleware.articleExist ,controllers.getArticleById);
router.get('/colors', controllers.getColors);
router.get('/materials', controllers.getMaterials);
router.get('/categories', controllers.getCategories);

//important pour le app.use dans le serveur
module.exports = router