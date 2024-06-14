const url = "http://localhost:4000/";
const axios = require("axios");

class Log {
    // Méthode pour afficher la page d'inscription
    static async PageInscription(req, res) {
        try {
            res.render('../views/pages/inscription');
        } catch (err) {
            console.error("Error rendering the inscription page:", err);
            res.status(500).send("Internal Server Error");
        }
    }

    // Méthode pour enregistrer un nouvel utilisateur
    static async Register(req, res) {
        try {
            const { firstname, lastname, email, pswd } = req.body;
            // Appel à l'API pour créer un compte utilisateur
            const response = await axios.post(`${url}create-compte/`, { firstname, lastname, email, pswd });
            
            // Vérification du statut de la réponse
            if (response.status === 201) {
                res.redirect('/Roid'); // Redirection après un enregistrement réussi
            } else {
                console.error("Unexpected response status during registration:", response.status);
                res.status(500).send("Registration failed");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            res.status(500).send("Internal Server Error");
        }
    }

    // Méthode pour gérer la connexion d'un utilisateur
    static async Login(req, res) {
        try {
            const { email, pswd, remember } = req.body;
            // Appel à l'API pour authentifier l'utilisateur
            const response = await axios.post(`${url}connexion/`, { email, pswd, remember });
            
            // Vérification du statut de la réponse
            if (response.status === 201) {
                // Configuration du cookie de session
                let maxAge = 24 * 60 * 60 * 1000 * (remember ? 365 : 1);
                res.cookie('Token', response.data.Token, {
                    maxAge: maxAge,
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Strict'
                });
                res.redirect('back'); // Redirection vers la page précédente
            } else {
                console.error("Unexpected response status during login:", response.status);
                res.status(401).send("Login failed");
            }
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).send("Internal Server Error");
        }
    }

    // Méthode pour récupérer les données de l'utilisateur
    static async getUser(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return undefined; // Retourne undefined si aucun token n'est trouvé
            }

            // Appel à l'API pour récupérer les informations de l'utilisateur
            const response = await axios.get(`${url}getUser/`, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            // Vérification du statut de la réponse
            if (response.status === 200) {
                return response.data; // Retourne les données de l'utilisateur
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

    // Méthode pour déconnecter l'utilisateur
    static async disconnect(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return res.status(400).send("No token found");
            }

            // Suppression du cookie de session
            res.clearCookie('Token');
            res.redirect('back'); // Redirection vers la page précédente
        } catch (err) {
            console.error("Error disconnecting:", err);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = Log;
