const express = require('express');
const router = express.Router();
const controllers = require('../controllers/articles');

//Define article's routes
router.get('/article/:id', controllers.getArticle);
router.get('/articles-homme/', controllers.getArticleHomme);
router.get('/articles-femme/', controllers.getArticleFemme);

//important pour le app.use dans le serveur
module.exports = router;