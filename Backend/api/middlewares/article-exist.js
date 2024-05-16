const Article = require("../models/article");

const ArticleExists = async (req, res, next) => {
    const id = req.params.id;

    try {
        const articleById = await Article.getArticlebyID(id);

        if (!articleById) {
            return res.status(404).json({
                message: `Article with id ${id} not found`,
                status: 404
            });
        }

        req.article = articleById;
        next();
    } catch (err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
};

module.exports =  ArticleExists;