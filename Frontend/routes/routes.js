const express = require('express');
const router = express.Router();
const controllerArticle = require('../controller/Articles');
const controllerLog = require('../controller/log');

router.get('/Roid', controllerArticle.Index);
router.get('/Roid/mode-homme', controllerArticle.ArticlesHomme);
router.get('/Roid/mode-femme', controllerArticle.ArticlesFemme);
router.get('/Roid/article/:id', controllerArticle.getArticleById);
router.get('/Roid/inscription', controllerLog.PageInscription);
router.post('/Roid/treatment/inscription', controllerLog.Register);
router.post('/Roid/treatment/connexion', controllerLog.Login);
router.post('/Roid/treatment/search-homme', controllerLog.Login);

router.post('/Roid/treatment/addToCart');
router.post('/Roid/treatment/removeFromCart');
router.get('/Roid/panier');

module.exports = router;
