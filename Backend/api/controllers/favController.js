const Fav = require('../models/favModel');
const dotenv = require('dotenv');
dotenv.config();

class FavFunc {
    static async AddToFav(req, res) {
        const { id_article, id_user } = req.body;

        if (!id_article || !id_user) {
            return res.status(400).json({ message: 'Les champs id_article et id_user sont requis.' });
        }

        try {
            await Fav.AddArticleToFav({ id_article }, { id_user });
            res.status(200).json({ message: 'Article ajouté aux favoris.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'article aux favoris.' });
        }
    }
    static async RemoveFromFav(req, res) {
        try {
            const { id_article, id_user } = req.body;
            if (!id_article || !id_user) {
                return res.status(400).json({ message: 'Les champs id_article et id_user sont requis.' });
            }
            await Fav.RemoveArticleFromFav({ id_article }, { id_user });
            res.status(200).json({ message: 'Article retiré des favoris.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors du retrait de l\'article des favoris.' });
        }
    }
    static async getUserFav(req, res) {
        try {
            const IdUser = req.user.Sub;
            const favArticles = await Fav.getFav(IdUser);

            if (!favArticles) {
                res.status(404).send({
                    message: "No favorite articles found!",
                    status: 404
                });
            } else {
                return res.status(200).json({
                    message: "Favorite articles found",
                    status: 200,
                    favArticles
                });
            }
        } catch (err) {
            res.status(500).send({
                message: err.message,
                status: 500
            });
        }
    }
}

module.exports = FavFunc;