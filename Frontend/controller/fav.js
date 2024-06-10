const url = "http://localhost:4000/";
const axios = require("axios");

class Fav {
    static async AddToFav(req, res) {
        try {
            const { id_article, id_user } = req.body;
            console.log({ id_article, id_user });
            if (!id_article || !id_user) {
                return res.status(400).json({ message: 'Les champs id_article et id_user sont requis.' });
            }
            const response = await axios.post(`${url}add-to-fav`, { id_article, id_user });
            if (response.status === 200) {
                return res.status(200).json({
                    message: 'Article ajouté aux favoris.',
                    data: response.data
                });
            } else {
                throw new Error("Erreur lors de la récupération de l'article");
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'article aux favoris.', error: err.message });
        }
    }
    static async RemoveFromFav(req, res) {
        try {
            const { id_article, id_user } = req.body;
            console.log({ id_article, id_user });
            if (!id_article || !id_user) {
                return res.status(400).json({ message: 'Les champs id_article et id_user sont requis.' });
            }
            const response = await axios.post(`${url}remove-from-fav`, { id_article, id_user });
            if (response.status === 200) {
                return res.status(200).json({
                    message: 'Article retiré des favoris.',
                    data: response.data
                });
            } else {
                throw new Error("Erreur lors de la récupération de l'article");
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'article des favoris.', error: err.message });
        }
    }
}

module.exports = Fav;