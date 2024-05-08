const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;

function validateToken(req, res, next) {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    if (token !== API_KEY) {
        return res.status(403).send('Forbidden');
    }

    return next();
}

module.exports = validateToken;