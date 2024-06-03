require("dotenv").config()
const jwt = require('jsonwebtoken')
const jwtkey = process.env.JWT_KEY;

function validateToken(req, res, next) {
    const token = req.get('Authorization');

    if (!token) return res.status(401).send("Unauthorized")
    jwt.verify(token, jwtkey, (err, user) => {
        if (err) {
            return res.status(403).send("Forbidden")
        }
        req.user = user;
        next();
    })
}

module.exports = validateToken;