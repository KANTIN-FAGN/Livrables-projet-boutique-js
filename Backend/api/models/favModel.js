const connection = require('../config/db');

class ArticleFav {
    static async AddArticleToFav(article, user) {
        // IGNORE INTO pour éviter les doublons
        const query = `INSERT IGNORE INTO have_fav (id_article, id_user) VALUES (?, ?)`;
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
    static async RemoveArticleFromFav(article, user) {
        const query = `DELETE FROM have_fav WHERE id_article = ? AND id_user = ?`;
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
    static async getFav(user) {
        const query = `SELECT article.* FROM article 
                       JOIN have_fav ON article.id_article = have_fav.id_article 
                       WHERE have_fav.id_user = ?`;
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

module.exports = ArticleFav;