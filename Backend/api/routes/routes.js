const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const controllers = require('../controllers/articles');

//Define article's routes
router.get('/article/:id', controllers.getArticle);
router.get('/mode-homme/', controllers.getArticleHomme);
router.get('/mode-femme/', controllers.getArticleFemme);

//important pour le app.use dans le serveur
module.exports = router;