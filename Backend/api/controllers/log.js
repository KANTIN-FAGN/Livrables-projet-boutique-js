const log = require('../models/user');
const cryp = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtkey = process.env.JWT_KEY;
const pepper = process.env.PEPPER;

const hashPassword = (password, salt) => {
    const hash = cryp.createHmac('sha512', salt);
    hash.update(password + pepper);
    const hashedPassword = hash.digest('hex');
    return { salt, hashedPassword }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
}

class Log {
    static async Register(req, res) {
        const { firstname, lastname, email, pswd } = req.body;

        if (!isValidEmail(email)) {
            return res.status(401).send({
                message: 'Email invalid',
                status: 401
            });
        }

        if (!isValidPassword(pswd)) {
            return res.status(401).send({
                message: 'Mot de passe invalide',
                status: 401
            });
        }

        const hashedPassword = hashPassword(pswd, cryp.randomBytes(16).toString('hex'));

        try {
            await log.Register({ firstname, lastname, email, hashedPassword });
            res.status(201).send({
                message: 'User registered successfully!',
                status: 201
            });
        } catch (err) {
            res.status(500).send({
                message: err.message,
                status: 500
            });
        }
    }

    static async Login(req, res) {
        const { email, pswd, remember } = req.body;

        try {
            let user;
            if (isValidEmail(email)) {
                user = await log.Login(email);
            } else {
                return res.status(401).send({
                    message: 'Invalid email or password',
                    status: 401
                });
            }

            if (!user) {
                return res.status(401).send({
                    message: 'Invalid email or password',
                    status: 401
                });
            }

            const hashedPassword = hashPassword(pswd, user.salt);
            if (hashedPassword.hashedPassword === user.pswd) {
                const Token = jwt.sign({ Sub: user.id_user }, jwtkey, { expiresIn: remember ? '365d' : '24h' });
                res.status(201).json({ Token });
            } else {
                return res.status(401).send({
                    message: 'Invalid email or password',
                    status: 401
                });
            }

        } catch (err) {
            res.status(500).send({
                message: err.message,
                status: 500
            });
        }
    }

    static async getUser(req, res) {
        try {
            const IdUser = req.user.Sub;
            const user = await log.getUser(IdUser);
            if (!user) {
                res.status(401).send({
                    message: "User not found !",
                    status: 401
                });
            } else {
                return res.status(200).json({
                    message: `User trouvé`,
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
