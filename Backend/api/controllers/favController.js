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
}

module.exports = FavFunc;