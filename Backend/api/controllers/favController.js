const Fav = require('../models/favModel'); // Modèle pour les opérations sur les favoris
const Article = require('../models/articleModel'); // Modèle pour les opérations sur les articles
const dotenv = require('dotenv'); // Module pour charger les variables d'environnement
dotenv.config();
const baseUrl = process.env.BASE_URL; // URL de base pour la construction des URL des images

class FavFunc {
    /**
 * Ajoute un article aux favoris de l'utilisateur.
 * @param {Object} req - Requête HTTP contenant id_article et id_user dans le corps.
 * @param {Object} res - Réponse HTTP pour retourner le résultat de l'ajout aux favoris.
 */
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

    /**
 * Retire un article des favoris de l'utilisateur.
 * @param {Object} req - Requête HTTP contenant id_article et id_user dans le corps.
 * @param {Object} res - Réponse HTTP pour retourner le résultat du retrait des favoris.
 */
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

    /**
 * Récupère les articles favoris d'un utilisateur.
 * @param {Object} req - Requête HTTP contenant l'ID utilisateur extrait du jeton JWT.
 * @param {Object} res - Réponse HTTP pour retourner les articles favoris de l'utilisateur.
 */
    static async getUserFav(req, res) {
        try {
            const IdUser = req.user.Sub; // Récupération de l'ID utilisateur à partir du jeton JWT
            const favArticles = await Fav.getFav(IdUser);

            if (!favArticles || favArticles.length === 0) {
                return res.status(404).send({
                    message: "Aucun article favori trouvé !",
                    status: 404
                });
            }

            // Récupération des détails des articles favoris avec leurs images
            const articlesWithDetails = await Promise.all(favArticles.map(async article => {
                const [images] = await Promise.all([
                    Article.getImages(article.id_article),
                ]);

                // Construction de l'URL complet de l'image
                article.images = {
                    img_1: images.length > 0 ? `${baseUrl}/asset${images[0].img}.jpg` : null
                };
                return article;
            }));

            return res.status(200).json({
                message: "Articles favoris trouvés",
                status: 200,
                articles: articlesWithDetails
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
                status: 500
            });
        }
    }


}

module.exports = FavFunc;