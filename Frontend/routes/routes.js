const express = require('express');
const router = express.Router();
const controllerArticle = require('../controller/Articles');
const controllerLog = require('../controller/log');
const controllerPage = require('../controller/page');
const controllerFav = require('../controller/fav')

router.get('/Roid', controllerPage.Index);
router.get('/Roid/mode-homme', controllerArticle.ArticlesHomme);
router.get('/Roid/mode-femme', controllerArticle.ArticlesFemme);
router.get('/Roid/article/:id', controllerArticle.getArticleById);
router.get('/Roid/inscription', controllerLog.PageInscription);

// route treatment log
router.post('/Roid/treatment/inscription', controllerLog.Register);
router.post('/Roid/treatment/connexion', controllerLog.Login);
router.get('/Roid/treatment/disconnect', controllerLog.disconnect);

// route treatment search
router.post('/Roid/treatment/search', controllerArticle.searchArticle);

// route treatment fav
router.post('/Roid/treatment/add-to-fav', controllerFav.Fav.AddToFav);
router.post('/Roid/treatment/remove-from-fav', controllerFav.Fav.AddToFav);

// route checkout
router.get('/Roid/checkout', controllerPage.Checkout);
router.post('/Roid/treatment/paid', controllerPage.Paiement);

// route pour recupere le localStorage 
router.get('/getLocalStorage', controllerPage.getLocalStorage);

router.post('/Roid/treatment/addToCart');
router.post('/Roid/treatment/removeFromCart');

router.use(controllerPage.pageNotFound);

module.exports = router;
