const Article = require('../models/article');
const dotenv = require('dotenv');
dotenv.config();
const baseUrl = process.env.BASE_URL;


exports.getArticleById = async (req, res) => {
    const articleById = req.article;
    try {
        // Exécuter les trois requêtes en parallèle
        const [images, colors, category] = await Promise.all([
            Article.getImages(articleById.id_article),
            Article.getColors(articleById.id_article),
            Article.getCategory(articleById.id_article)
        ]);

        // Formater les URLs des images
        articleById.img = images.map(image => `${baseUrl}/asset${image.img}.jpg`);
        // Ajouter les couleurs à l'article
        articleById.colors = colors.map(color => color.color);
        // Ajouter la catégorie à l'article
        articleById.category = category.length > 0 ? category[0].category : null;

        return res.status(200).json({
            message: `Article with id ${req.params.id} was successfully retrieved`,
            status: 200,
            article: articleById
        });
    } catch (err) {
        return res.status(500).json({
            message: `Error retrieving article: ${err.message}`,
            status: 500
        });
    }
};
exports.getArticleHomme = async (req, res) => {
    try {
        const articles = await Article.getArticleHomme(req.query);

        if (!articles || articles.length === 0) {
            return res.status(404).json({
                message: `Articles not found`,
                status: 404
            });
        } else {
            const articlesWithDetails = await Promise.all(articles.map(async article => {
                const [images, colors, category, materials] = await Promise.all([
                    Article.getImages(article.id_article),
                    Article.getColors(article.id_article),
                    Article.getCategory(article.id_article),
                    Article.getMaterial(article.id_article)
                ]);

                article.images = {
                    img_1: images.length > 0 ? `${baseUrl}/asset${images[0].img}.jpg` : null,
                    img_2: images.length > 1 ? `${baseUrl}/asset${images[1].img}.jpg` : null
                };
                article.materials = materials.map(material => material.material);
                article.colors = colors.map(color => color.color);
                article.category = category.length > 0 ? category[0].category : null;
                return article;
            }));

            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || 6;
            const href = baseUrl + "/mode-homme/";

            return res.status(200).json({
                message: `Articles successfully found`,
                status: 200,
                articles: {
                    href,
                    offset,
                    limit,
                    next: `${href}?limit=${limit}&offset=${offset + limit}`,
                    previous: `${href}?limit=${limit}&offset=${Math.max(0, offset - limit)}`,
                    total: articlesWithDetails.length,
                    items: articlesWithDetails
                }
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: `Error retrieving articles: ${err.message}`,
            status: 500
        });
    }
};
exports.getArticleFemme = async (req, res) => {
    try {
        const articles = await Article.getArticleFemme(req.query);

        if (!articles || articles.length === 0) {
            return res.status(404).json({
                message: `Articles not found`,
                status: 404
            });
        } else {
            const articlesWithDetails = await Promise.all(articles.map(async article => {
                const [images, colors, category, materials] = await Promise.all([
                    Article.getImages(article.id_article),
                    Article.getColors(article.id_article),
                    Article.getCategory(article.id_article),
                    Article.getMaterial(article.id_article)
                ]);

                article.images = {
                    img_1: images.length > 0 ? `${baseUrl}/asset${images[0].img}.jpg` : null,
                    img_2: images.length > 1 ? `${baseUrl}/asset${images[1].img}.jpg` : null
                };
                article.materials = materials.map(material => material.material);
                article.colors = colors.map(color => color.color);
                article.category = category.length > 0 ? category[0].category : null;
                return article;
            }));

            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || 6;
            const href = baseUrl + "/mode-femme/";

            return res.status(200).json({
                message: `Articles successfully found`,
                status: 200,
                articles: {
                    href,
                    offset,
                    limit,
                    next: `${href}?limit=${limit}&offset=${offset + limit}`,
                    previous: `${href}?limit=${limit}&offset=${Math.max(0, offset - limit)}`,
                    total: articlesWithDetails.length,
                    items: articlesWithDetails
                }
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: `Error retrieving articles: ${err.message}`,
            status: 500
        });
    }
};