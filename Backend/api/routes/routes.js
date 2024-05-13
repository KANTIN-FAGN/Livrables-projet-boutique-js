const express = require('express');
const router = express.Router();
const controllers = require('../controllers/articles');

const middleware = {
    auth : require('../middlewares/auth'),
};

//Define article's routes
router.get('/mode-homme/', controllers.getArticleHomme);
router.get('/mode-femme/', controllers.getArticleFemme);
router.get('/article/:id', controllers.getArticle);

//important pour le app.use dans le serveur
module.exports = router;