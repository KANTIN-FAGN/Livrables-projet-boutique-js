const Article = require('../models/article');
const dotenv = require('dotenv');
dotenv.config();
const baseUrl = process.env.BASE_URL;


exports.getArticleById = async (req, res) => {
    const articleById = req.article;
    try {
        // Exécuter les quatre requêtes en parallèle
        const [images, colors, category, sizes] = await Promise.all([
            Article.getImages(articleById.id_article),
            Article.getColorsById(articleById.id_article),
            Article.getCategoryById(articleById.id_article),
            Article.getSizesById(articleById.id_article)
        ]);

        // Formater les URLs des images
        articleById.img = images.map(image => `${baseUrl}/asset${image.img}.jpg`);
        // Ajouter les couleurs à l'article
        articleById.colors = colors.map(color => color.color);
        // Ajouter la catégorie à l'article
        articleById.category = category.length > 0 ? category[0].category : null;
        // Ajouter les tailles à l'article
        articleById.sizes = sizes.map(size => ({ size: size.size, stock: size.stock }));

        // Calculer le stock total
        const totalStock = sizes.reduce((total, size) => total + size.stock, 0);
        articleById.totalStock = totalStock;

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
                    Article.getColorsById(article.id_article),
                    Article.getCategoryById(article.id_article),
                    Article.getMaterialById(article.id_article)
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
                    Article.getColorsById(article.id_article),
                    Article.getCategoryById(article.id_article),
                    Article.getMaterialById(article.id_article)
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

exports.getColors = async (req, res) => {
    try {
        const colors = await Article.getColors(req.query);
        if (!colors || colors.length === 0) {
            return res.status(404).json({
                message: `Colors not found`,
                status: 404
            });
        } else {
            return res.status(200).json({
                message: `Colors successfully found`,
                status: 200,
                colors: colors
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: `Error retrieving colors: ${err.message}`,
            status: 500
        });
    }
};
exports.getMaterials = async (req, res) => {
    try {
        const materials = await Article.getMaterials(req.query);
        if (!materials || materials.length === 0) {
            return res.status(404).json({
                message: `Materials not found`,
                status: 404
            });
        } else {
            return res.status(200).json({
                message: `Materials successfully found`,
                status: 200,
                materials: materials
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: `Error retrieving materials: ${err.message}`,
            status: 500
        });
    }
};
exports.getCategories = async (req, res) => {
    try {
        const categories = await Article.getCategories(req.query);
        if (!categories || categories.length === 0) {
            return res.status(404).json({
                message: `Categories not found`,
                status: 404
            });
        } else {
            return res.status(200).json({
                message: `Categories successfully found`,
                status: 200,
                categories: categories
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: `Error retrieving categories: ${err.message}`,
            status: 500
        });
    }
};