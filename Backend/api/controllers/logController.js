const log = require('../models/userModel'); // Import du modèle d'utilisateur pour les opérations CRUD sur les utilisateurs
const cryp = require('crypto'); // Module crypto pour le hachage des mots de passe
const jwt = require('jsonwebtoken'); // JWT pour la génération et la vérification des jetons d'authentification
require('dotenv').config(); // Chargement des variables d'environnement depuis un fichier .env

const jwtkey = process.env.JWT_KEY; // Clé secrète JWT provenant des variables d'environnement
const pepper = process.env.PEPPER; // Poivre (pepper) pour renforcer le hachage des mots de passe

/**
 * Fonction pour hacher le mot de passe avec un sel et un poivre.
 * @param {string} password - Mot de passe à hacher.
 * @param {string} salt - Sel pour renforcer le hachage.
 * @returns {object} - Objet contenant le sel et le mot de passe haché.
 */
const hashPassword = (password, salt) => {
    const hash = cryp.createHmac('sha512', salt);
    hash.update(password + pepper);
    const hashedPassword = hash.digest('hex');
    return { salt, hashedPassword };
};

/**
 * Vérifie si une adresse email est valide.
 * @param {string} email - Adresse email à valider.
 * @returns {boolean} - true si l'email est valide, sinon false.
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Vérifie si un mot de passe est valide selon les critères définis.
 * @param {string} password - Mot de passe à valider.
 * @returns {boolean} - true si le mot de passe est valide, sinon false.
 */
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
}

class Log {
    /**
 * Inscrit un nouvel utilisateur.
 * @param {Object} req - Requête HTTP contenant les données de l'utilisateur à inscrire.
 * @param {Object} res - Réponse HTTP pour envoyer le résultat de l'inscription.
 */
    static async Register(req, res) {
        const { firstname, lastname, email, pswd } = req.body;

        // Validation de l'email et du mot de passe
        if (!isValidEmail(email)) {
            return res.status(401).send({
                message: 'Email invalide',
                status: 401
            });
        }

        if (!isValidPassword(pswd)) {
            return res.status(401).send({
                message: 'Mot de passe invalide',
                status: 401
            });
        }

        // Hachage du mot de passe avant l'enregistrement
        const hashedPassword = hashPassword(pswd, cryp.randomBytes(16).toString('hex'));

        try {
            // Appel à la méthode Register du modèle log pour enregistrer l'utilisateur
            await log.Register({ firstname, lastname, email, hashedPassword });
            res.status(201).send({
                message: 'Utilisateur enregistré avec succès !',
                status: 201
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
                status: 500
            });
        }
    }
    /**
     * Connecte un utilisateur en vérifiant les identifiants fournis.
     * @param {Object} req - Requête HTTP contenant les informations de connexion (email, pswd).
     * @param {Object} res - Réponse HTTP pour envoyer le résultat de la connexion.
     */
    static async Login(req, res) {
        const { email, pswd, remember } = req.body;

        try {
            let user;

            // Vérification de l'email avant de chercher l'utilisateur dans la base de données
            if (isValidEmail(email)) {
                user = await log.Login(email);
            } else {
                return res.status(401).send({
                    message: 'Email ou mot de passe invalide',
                    status: 401
                });
            }

            // Vérification du mot de passe haché
            if (!user || hashPassword(pswd, user.salt).hashedPassword !== user.pswd) {
                return res.status(401).send({
                    message: 'Email ou mot de passe invalide',
                    status: 401
                });
            }

            // Génération du jeton JWT en cas de succès
            const Token = jwt.sign({ Sub: user.id_user }, jwtkey, { expiresIn: remember ? '365d' : '24h' });
            res.status(201).json({ Token });

        } catch (err) {
            res.status(500).send({
                message: err.message,
                status: 500
            });
        }
    }

    /**
     * Récupère les informations d'un utilisateur à partir de l'ID utilisateur.
     * @param {Object} req - Requête HTTP contenant l'ID de l'utilisateur extrait du jeton JWT.
     * @param {Object} res - Réponse HTTP pour envoyer les informations de l'utilisateur.
     */
    static async getUser(req, res) {
        try {
            const IdUser = req.user.Sub; // Récupération de l'ID utilisateur à partir du jeton JWT
            const user = await log.getUser(IdUser);

            if (!user) {
                res.status(404).send({
                    message: "Utilisateur non trouvé !",
                    status: 404
                });
            } else {
                res.status(200).json({
                    message: `Utilisateur trouvé`,
                    status: 200,
                    user
                });
            }

        } catch (err) {
            res.status(500).send({
                message: err.message,
                status: 500
            });
        }
    }
}

module.exports = Log;