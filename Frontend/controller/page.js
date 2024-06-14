const controllerLog = require('./log');
const controllerFav = require('./fav');

class Page {
    // Méthode pour rendre la page d'index
    static async Index(req, res) {
        try {
            const token = req.cookies.Token;
            // Récupération des données utilisateur à partir du contrôleur log
            const dataUser = await controllerLog.getUser(req, res);
            // Récupération des favoris à partir du contrôleur fav
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;

            // Rendu de la vue avec les données récupérées
            res.render('../views/pages/index', {
                dataUser,
                // Si dataFav et dataFav.articles existent, on passe dataFav.articles sinon un tableau vide
                dataFav: dataFav && dataFav.articles ? dataFav.articles : []
            });

        } catch (err) {
            // En cas d'erreur, affiche l'erreur dans la console
            console.error(err);
            // Répond avec un statut 500 et un message d'erreur générique
            res.status(500).send("Internal Server Error");
        }
    }

    // Méthode pour rendre la page de checkout
    static async Checkout(req, res) {
        try {
            const token = req.cookies.Token;
            // Récupération des données utilisateur à partir du contrôleur log
            const dataUser = await controllerLog.getUser(req, res);
            // Récupération des favoris à partir du contrôleur fav
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;

            // Rendu de la vue avec les données récupérées
            res.render('../views/pages/checkout', {
                dataUser,
                // Si dataFav et dataFav.articles existent, on passe dataFav.articles sinon un tableau vide
                dataFav: dataFav && dataFav.articles ? dataFav.articles : []
            });

        } catch (err) {
            // En cas d'erreur, affiche l'erreur dans la console
            console.error(err);
            // Répond avec un statut 500 et un message d'erreur générique
            res.status(500).send("Internal Server Error");
        }
    }

    // Méthode pour gérer les pages non trouvées
    static pageNotFound(req, res) {
        // Redirige vers une page de gestion d'erreur 404
        res.redirect('/Roid');
    }
}

module.exports = Page;
