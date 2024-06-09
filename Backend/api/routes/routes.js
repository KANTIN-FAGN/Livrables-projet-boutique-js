const express = require('express');
const router = express.Router();
const controllersArticle = require('../controllers/articles');
const controllersUser = require('../controllers/log');
const CartFunc = require('../controllers/cart');
const middleware = {
    validateToken: require('../middlewares/auth'),
    articleExist: require('../middlewares/article-exist'),
};

// Define article routes
router.get('/mode-homme/', controllersArticle.getArticleHomme);
router.get('/mode-femme/', controllersArticle.getArticleFemme);
router.get('/articles_aleatoire/', controllersArticle.get4ArticlesAleatoire);
router.get('/article/:id', middleware.articleExist, controllersArticle.getArticleById);
router.get('/colors', controllersArticle.getColors);
router.get('/materials', controllersArticle.getMaterials);
router.get('/categories', controllersArticle.getCategories);
router.get('/search', controllersArticle.searchArticles);
router.get('/4Articles', controllersArticle.get4ArticlesAleatoire);

router.post('/create-compte', controllersUser.Register);
router.post('/connexion', middleware.validateToken, controllersUser.Login);

router.post('/cart/add', CartFunc.addItemToCart);
router.get('/cart', CartFunc.getUserCart);
router.put('/cart/update-size', CartFunc.updateItemSize);
router.put('/cart/update-quantity', CartFunc.updateItemQuantity);
router.delete('/cart/remove', CartFunc.removeItemFromCart);


// Important for the app.use in the server
module.exports = router;
