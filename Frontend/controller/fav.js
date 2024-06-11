const url = "http://localhost:4000/";
const axios = require("axios");

async function getFavID(token, id) {
    try {
        const response = await axios.get(`${url}get-fav/`, {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        });
        for (const fav of response.data.articles) {
            if (fav.id_article == id) {
                return true;
            }
        }
        return false;
    } catch (err) {
        console.error("Error fetching favorite IDs:", err);
        return false;
    }
}

class Fav {
    static async AddToFav(req, res) {
        const { id_article, id_user } = req.body;
        const token = req.cookies.Token;

        if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        }

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
            const isFav = await getFavID(token, id_article);
            if (isFav) {
                await axios.post(`${url}remove-from-fav`, { id_article, id_user }, { headers: header },);
            } else {
                await axios.post(`${url}add-to-fav`, { id_article, id_user }, { headers: header });
            }
            res.redirect('back');
        } catch (err) {
            console.error("Error adding/removing favorite:", err);
            res.status(500).send('Internal Server Error');
        }
    }

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
            return false;
        }
    }
}

module.exports = {
    Fav,
    getFavID
};

