const controllerLog = require('./log');
const controllerFav = require('./fav');

class Page {
    static async Index(req, res) {
        try {
            const token = req.cookies.Token;
            const dataUser = await controllerLog.getUser(req, res);
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;

            res.render('../views/pages/index', {
                dataUser,
                dataFav: dataFav && dataFav.articles ? dataFav.articles : []
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }
    static async Checkout(req, res) {
        try {
            const token = req.cookies.Token;
            const dataUser = await controllerLog.getUser(req, res);
            const dataFavResponse = await controllerFav.Fav.getFav(token);
            const dataFav = dataFavResponse.data;

            res.render('../views/pages/checkout', {
                dataUser,
                dataFav: dataFav && dataFav.articles ? dataFav.articles : []
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = Page;