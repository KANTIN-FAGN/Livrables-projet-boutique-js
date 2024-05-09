const Article = require('../models/article');
const dotenv = require('dotenv');
dotenv.config();

exports.getArticle = async (req, res) => {
    const link = process.env.BASE_URL;
    const articleID = req.params.id;
    try {
        const article = await Article.getArticlebyID(articleID); 
        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }
        
        const images = await Article.getImagesForArticle(articleID);
        const formattedImages = images.map(image => `${link}${image.URL}.jpg`);
        article.images = formattedImages;

        const sizes = await Article.getSizesForArticle(articleID);
        const sizesWithQuantities = {};
        sizes.forEach(size => {
            sizesWithQuantities[size.size] = size.quantity;
        });
        article.sizes = sizesWithQuantities;

        const colors = await Article.getColorsForArticle(articleID);
        article.colors = colors;

        const categories = await Article.getCategorysForArticle(articleID);
        article.categorys = categories;

        return res.status(200).json({
            message: "Article found successfully",
            article
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
exports.getArticleHomme = async (req, res) => {
    try {
        const sex = true; // true pour homme
        const articles = await Article.getArticlesBySex(sex);

        if (!articles || articles.length === 0) {
            return res.status(404).json({
                message: "No articles found for men"
            });
        }

        const link = process.env.BASE_URL;

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];

            const articleID = article.id;

            // Récupération des images de l'article
            const images = await Article.getImagesForArticle(articleID);
            const formattedImages = images.map(image => `${link}${image.URL}.jpg`);

            // Récupération uniquement des deux premières images
            const firstTwoImages = formattedImages.slice(0, 2);

            article.images = firstTwoImages;

            // Récupération des tailles de l'article
            const sizes = await Article.getSizesForArticle(articleID);
            const sizesWithQuantities = {};
            sizes.forEach(size => {
                sizesWithQuantities[size.size] = size.quantity;
            });
            article.sizes = sizesWithQuantities;

            // Récupération des couleurs
            article.colors = await Article.getColorsForArticle(articleID);

            // Récupération des catégaries
            article.categorys = await Article.getCategorysForArticle(articleID);
        }

        return res.status(200).json({
            message: "Articles found successfully",
            articles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
exports.getArticleFemme = async (req, res) => {
    try {
        const sex = false; // false pour femme
        const articles = await Article.getArticlesBySex(sex);

        if (!articles || articles.length === 0) {
            return res.status(404).json({
                message: "No articles found for men"
            });
        }

        const link = process.env.BASE_URL;

        // Récupération des images et des tailles pour chaque article
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];

            const articleID = article.id;

            // Récupération des images de l'article
            const images = await Article.getImagesForArticle(articleID);
            const formattedImages = images.map(image => `${link}${image.URL}.jpg`);

            // Récupération uniquement des deux premières images
            const firstTwoImages = formattedImages.slice(0, 2);

            article.images = firstTwoImages;

            // Récupération des tailles de l'article
            const sizes = await Article.getSizesForArticle(articleID);
            const sizesWithQuantities = {};
            sizes.forEach(size => {
                sizesWithQuantities[size.size] = size.quantity;
            });
            article.sizes = sizesWithQuantities;

            article.colors = await Article.getColorsForArticle(articleID);
            article.categorys = await Article.getCategorysForArticle(articleID);
        }

        return res.status(200).json({
            message: "Articles found successfully",
            articles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}