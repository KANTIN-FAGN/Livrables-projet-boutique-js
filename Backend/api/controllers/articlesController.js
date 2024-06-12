const Article = require('../models/articleModel');
const dotenv = require('dotenv');
dotenv.config();
const baseUrl = process.env.BASE_URL;


class ArticleFunc {
    static async getArticleById(req, res) {
        const articleById = req.article;

        try {
            // Execute the queries in parallel
            const [images, colors, category, sizes, articlesWithDifferentColors] = await Promise.all([
                Article.getImages(articleById.id_article),
                Article.getColorsById(articleById.id_article),
                Article.getCategoryById(articleById.id_article),
                Article.getSizesById(articleById.id_article),
                Article.getArticlesByNameWithDifferentColors(articleById.name, articleById.id_article)
            ]);

            // Format the image URLs
            articleById.img = images.map(image => `${baseUrl}/asset${image.img}.jpg`);
            // Add colors to the article
            articleById.colors = colors.map(color => color.color);
            // Add category to the article
            articleById.category = category.length > 0 ? category[0].category : null;
            // Add sizes to the article
            articleById.sizes = sizes.map(size => ({ size: size.size, stock: size.stock }));

            // Calculate the total stock
            const totalStock = sizes.reduce((total, size) => total + size.stock, 0);
            articleById.totalStock = totalStock;

            // Fetch and format the first image URL for each article with different colors
            const formattedArticlesWithDifferentColors = await Promise.all(
                articlesWithDifferentColors.map(async article => {
                    const firstImage = await Article.getFirstImageByArticleId(article.id_article);
                    return {
                        id: article.id_article,
                        name: article.name,
                        color: article.color,
                        img: firstImage ? `${baseUrl}/asset${firstImage}.jpg` : null,
                        // Add other properties if needed
                    };
                })
            );

            articleById.articlesWithDifferentColors = formattedArticlesWithDifferentColors;

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
    static async getArticlesByIds(req, res) {
        try {
            let articleIds = req.query.Ids;
    
            if (!articleIds) {
                return res.status(400).send({
                    message: 'Invalid or missing article IDs',
                    status: 400
                });
            }
    
            if (!Array.isArray(articleIds)) {
                articleIds = articleIds.split(',');
            }
    
            articleIds = articleIds.map(item => parseInt(item, 10)).filter(Number.isInteger);
    
            const articles = await Article.getArticlesByIDs(articleIds);
    
            for (const art of articles) {
                const imgs = await Article.getImages(art.id_article);
                if (Array.isArray(imgs) && imgs.length > 0) {
                    art.img = `${baseUrl}/asset${imgs[0].img}.jpg`;
                } else {
                    art.img = null; // Or set to a default image URL if desired
                }
            }
    
            return res.status(200).json({
                message: 'Articles were successfully retrieved',
                status: 200,
                articles: articles
            });
        } catch (err) {
            return res.status(500).json({
                message: `Error retrieving articles: ${err.message}`,
                status: 500
            });
        }
    }
    
    
    static async get4ArticlesAleatoire(req, res) {
        try {
            const articles = await Article.get4RandomArticles();

            if (!articles || articles.length === 0) {
                return res.status(404).json({
                    message: `Articles not found`,
                    status: 404
                });
            } else {
                const articlesWithDetails = await Promise.all(articles.map(async article => {
                    const [images] = await Promise.all([
                        Article.getImages(article.id_article),
                    ]);

                    article.images = {
                        img_1: images.length > 0 ? `${baseUrl}/asset${images[0].img}.jpg` : null,
                        img_2: images.length > 1 ? `${baseUrl}/asset${images[1].img}.jpg` : null
                    };

                    const { description, name, detail, manufacturing, price, reduction, genders, id_category, ...articleWithoutDescriptionAndName } = article;
                    return articleWithoutDescriptionAndName;
                }));

                return res.status(200).json({
                    message: `Articles successfully found`,
                    status: 200,
                    articles: articlesWithDetails
                });
            }
        } catch (err) {
            return res.status(500).json({
                message: `Error retrieving articles: ${err.message}`,
                status: 500
            });
        }
    }
    static async getArticleHomme(req, res) {
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
    static async getArticleFemme(req, res) {
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
    static async getColors(req, res) {
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
    static async getMaterials(req, res) {
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
    static async getCategories(req, res) {
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
    static async searchArticles(req, res) {
        const searchTerm = req.query.term;

        if (!searchTerm) {
            return res.status(400).json({
                error: 'Search term is required'
            });
        }

        try {
            const articles = await Article.searchArticles(searchTerm);
            if (articles.length === 0) {
                return res.status(200).json({
                    message: 'Désolé, aucun résultat ne correspond à votre recherche'
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

                return res.status(200).json({
                    message: `Articles successfully found`,
                    status: 200,
                    articles: {
                        total: articlesWithDetails.length,
                        items: articlesWithDetails
                    }
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: 'An error occurred while searching for articles'
            });
        }
    }
}

module.exports = ArticleFunc;