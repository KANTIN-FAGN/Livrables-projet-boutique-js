const url = "http://localhost:4000/";
const axios = require("axios");

class Log {
    static async PageInscription(req, res) {
        try {
            res.render('../views/pages/inscription');
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
        
    }

    static async Register(req, res) {
        try {
            const {firstname, lastname, email, pswd} = req.body;
            await axios.post(`${url}create-compte/`, {firstname, lastname, email, pswd});
            res.redirect('/Roid')
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }
    static async Login(req, res) {
        try {
            const {email, pswd, remember} = req.body;
            await axios.post(`${url}connexion/`, {email, pswd, remember});
            res.redirect('back')
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = Log;
