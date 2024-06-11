const connection = require('../config/db');

class ArticleCart {
    static async AddArticleToCart(article, user) {
        // IGNORE INTO pour éviter les doublons
        const query = `INSERT IGNORE INTO have_cart (id_article, id_user) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
            connection.query(query, [article.id_article, user.id_user], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    static async RemoveArticleFromCart(article, user) {
        const query = `DELETE FROM have_cart WHERE id_article = ? AND id_user = ?`;
        return new Promise((resolve, reject) => {
            connection.query(query, [article.id_article, user.id_user], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    static async getCart(user) {
        const query = `SELECT article.* FROM article 
                       JOIN have_cart ON article.id_article = have_cart.id_article 
                       WHERE have_cart.id_user = ?`;
        return new Promise((resolve, reject) => {
            connection.query(query, [user], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = ArticleCart;