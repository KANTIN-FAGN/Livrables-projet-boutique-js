const connection = require('../config/db');

class User {
    static Login(email) {
        const query = `SELECT * FROM users WHERE email = ?;`;
        return new Promise((resolve, reject) => {
            connection.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    static Register(user) {
        const query = `INSERT INTO users (firstname, lastname, email, pswd, salt, adress) VALUES (?, ?, ?, ?, ?, DEFAULT)`
        return new Promise((resolve, reject) => {
            connection.query(query, [user.firstname, user.lastname, user.email, user.hashedPassword.hashedPassword, user.hashedPassword.salt], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    static getUser(id) {
        const query = `SELECT * FROM users WHERE id_user = ?;`;
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
}

module.exports = User;