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
    return {salt, hashedPassword}
}


function isValidEmail(email) {
    const emailRegex = '/^[^\s@]+@[^\s@]+\.[^\s@+$/';
    return emailRegex.test(email);
}

class Log {
    static async Register() {
        const {firstname, lastname, email, pswd} = req.body;
        if (!isValidEmail(email)) {
            res.status(401).send({
                message: 'Email invalid',
                status: 401
            })
        }
        const hashedPassword = hashPassword(pswd, cryp.randomBytes(16).toString('hex'))
        try {
            await Log.Register({firstname, lastname, email, hashedPassword});
            res.status(201).send({
                message: `User registered successfully !`,
                status: 201
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async Login() {
        const {email, pswd, remember} = req.body;
        try {
            let user;
            if (isValidEmail(email)) {
                user = await Log.Login(email);
            } else {
                return res.status(401).send({
                    message: `Invalid email or password`,
                    status: 401
                });
            }
            if (!user) {
                return res.status(401).send({
                    message: `Invalid email or password`,
                    status: 401
                });
            }
            const hashedPassword = hashPassword(pswd, user.salt);
            if (hashedPassword.hashedPassword === user.pswd) {
                const Token = jwt.sign({Sub: user.id_user}, jwtkey, {expiresIn: remember ? '365j':'24h'});
                res.status(201).json({Token});
            } else {
                return res.status(401).send({
                    message: `Invalid email or password`,
                    status: 401
                });
            }
            
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }
    
}

module.exports = Log;