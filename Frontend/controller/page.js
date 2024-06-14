const controllerLog = require('./log');
const controllerFav = require('./fav');

let Cart;

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
    static async Paiement(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.status(401).send("Unauthorized");
            }

            const dataUser = await controllerLog.getUser(req, res);

            // Récupérer les données du corps de la requête
            const { cart, shippingAddress, postalCode, city, paymentDetails } = req.body;
            if (!cart || !shippingAddress || !postalCode || !city || !paymentDetails) {
                return res.status(400).send("Bad Request: Missing required fields");
            }

            // Traitez les coordonnées bancaires (veuillez ne pas stocker les informations sensibles en clair)
            const { cardNumber, cardHolder, expiryDate, cryptogram } = paymentDetails;

            // Ajoutez votre logique de traitement de paiement ici (par exemple, intégration avec une passerelle de paiement

            res.status(200).send("Payment processed and cart items deleted successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }
    static getLocalStorage(req, res) {
        const { cart } = req.body;
        console.log(cart);
        global.Cart = cart;
        res.status(200).send("Local storage data received");
    }
    static pageNotFound(req, res) {
        res.redirect('/Roid');
    }
}

module.exports = Page;