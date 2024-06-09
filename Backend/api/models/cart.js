const connection = require('../config/db');

class Cart {
    static addItemToCart(id_user, id_article, id_size, quantity) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO cart (id_user, id_article, id_size, quantity) VALUES (?, ?, ?, ?)`;
            connection.query(sql, [id_user, id_article, id_size, quantity], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static updateItemSize(id_cart, newSize) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE cart SET id_size = ? WHERE id_cart = ?`;
            connection.query(sql, [newSize, id_cart], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static updateItemQuantity(id_cart, newQuantity) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE cart SET quantity = ? WHERE id_cart = ?`;
            connection.query(sql, [newQuantity, id_cart], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static removeItemFromCart(id_cart) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM cart WHERE id_cart = ?`;
            connection.query(sql, [id_cart], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getUserCart(id_user) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    c.id_cart,
                    a.name AS article_name,
                    s.size AS size,
                    c.quantity,
                    c.date_added
                FROM
                    cart c
                JOIN
                    article a ON c.id_article = a.id_article
                JOIN
                    size s ON c.id_size = s.id_size
                WHERE
                    c.id_user = ?;
            `;
            connection.query(sql, [id_user], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = Cart;
