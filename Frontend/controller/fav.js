const url = "http://localhost:4000/";
const axios = require("axios");

// Fonction asynchrone pour vérifier si un article est déjà dans les favoris
async function getFavID(token, id) {
    try {
        const response = await axios.get(`${url}get-fav/`, {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        });
        
        // Parcours des articles favoris pour vérifier si l'id_article est déjà présent
        for (const fav of response.data.articles) {
            if (fav.id_article == id) {
                return true; // Retourne true si l'article est trouvé dans les favoris
            }
        }
        
        return false; // Retourne false si l'article n'est pas trouvé dans les favoris
    } catch (err) {
        console.error("Error fetching favorite IDs:", err);
        return false; // En cas d'erreur, retourne false
    }
}

class Fav {
    // Méthode pour ajouter ou retirer un article des favoris
    static async AddToFav(req, res) {
        const { id_article, id_user } = req.body;
        const token = req.cookies.Token;

        // Vérification de la présence du token
        if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        }

        // Vérification des champs requis
        if (!id_article || !id_user) {
            return res.redirect('back').json({
                message: 'Les champs id_article et id_user sont requis.'
            });
        }

        const header = {
            "Authorization": token,
            "Content-Type": "application/json"
        };

        try {
            // Vérification si l'article est déjà dans les favoris
            const isFav = await getFavID(token, id_article);
            
            // Si l'article est déjà dans les favoris, on le retire
            if (isFav) {
                await axios.post(`${url}remove-from-fav`, { id_article, id_user }, { headers: header });
            } else {
                // Sinon, on l'ajoute aux favoris
                await axios.post(`${url}add-to-fav`, { id_article, id_user }, { headers: header });
            }
            
            res.redirect('back'); // Redirection vers la page précédente après l'opération
        } catch (err) {
            console.error("Error adding/removing favorite:", err);
            res.status(500).send('Internal Server Error');
        }
    }

    // Méthode pour récupérer les favoris d'un utilisateur
    static async getFav(token) {
        try {
            return await axios.get(`${url}get-fav/`, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });
        } catch (err) {
            console.error("Error getting favorites:", err);
            return false; // En cas d'erreur, retourne false
        }
    }
}

module.exports = {
    Fav,
    getFavID
};
