const url = "http://localhost:4000/";
const axios = require("axios");

class Fav {
    static async AddToFav(req, res) {
        try {
            const { id_article, id_user } = req.body;
            const token = req.cookies.Token;

            if (!token) {
                return undefined;
            }
            
            if (!id_article || !id_user) {
                return res.status(400).json({ message: 'Les champs id_article et id_user sont requis.' });
            }
            const response = await axios.post(`${url}add-to-fav`, { id_article, id_user },{
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                res.status(200).json({
                    message: 'Article ajouté aux favoris.',
                    data: response.data
                });
                res.redirect('back')
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
            const token = req.cookies.Token;

            if (!token) {
                return undefined;
            }

            if (!id_article || !id_user) {
                return res.status(400).json({ message: 'Les champs id_article et id_user sont requis.' });
            }
            const response = await axios.post(`${url}remove-from-fav`, { id_article, id_user }, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                res.status(200).json({
                    message: 'Article retiré des favoris.',
                    data: response.data
                });
                res.redirect('back')
            } else {
                throw new Error("Erreur lors de la récupération de l'article");
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'article des favoris.', error: err.message });
        }
    }
    static async getFav(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return undefined;
            }

            const response = await axios.get(`${url}get-fav/`, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                console.error("Unexpected response status when fetching user data:", response.status);
                res.status(401).send("Failed to fetch user data");
                return undefined;
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
            res.status(500).send("Internal Server Error");
            return undefined;
        }
    }
}

module.exports = Fav;