const url = "http://localhost:4000/";
const axios = require("axios");

class Log {
    static async PageInscription(req, res) {
        try {
            res.render('../views/pages/inscription');
        } catch (err) {
            console.error("Error rendering the inscription page:", err);
            res.status(500).send("Internal Server Error");
        }
    }
    static async Register(req, res) {
        try {
            const { firstname, lastname, email, pswd } = req.body;
            const response = await axios.post(`${url}create-compte/`, { firstname, lastname, email, pswd });
            if (response.status === 201) {
                res.redirect('/Roid');
            } else {
                console.error("Unexpected response status during registration:", response.status);
                res.status(500).send("Registration failed");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            res.status(500).send("Internal Server Error");
        }
    }
    static async Login(req, res) {
        try {
            const { email, pswd, remember } = req.body;
            const response = await axios.post(`${url}connexion/`, { email, pswd, remember });
            if (response.status === 201) {
                let maxAge = 24 * 60 * 60 * 1000 * (remember ? 365 : 1);
                res.cookie('Token', response.data.Token, {
                    maxAge: maxAge,
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Strict'
                });
                res.redirect('back');
            } else {
                console.error("Unexpected response status during login:", response.status);
                res.status(401).send("Login failed");
            }
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).send("Internal Server Error");
        }
    }
    static async getUser(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return undefined;
            }

            const response = await axios.get(`${url}getUser/`, {
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

module.exports = Log;