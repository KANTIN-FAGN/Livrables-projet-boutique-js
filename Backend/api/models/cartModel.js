const connection = require('../config/db');

class ArticleCart {
    // Méthode pour ajouter un article au panier d'un utilisateur
    static async AddArticleToCart(article, user) {
        // Requête SQL pour insérer un article dans la table have_cart (avec IGNORE pour éviter les doublons)
        const query = `INSERT IGNORE INTO have_cart (id_article, id_user) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
            // Exécute la requête avec les paramètres article.id_article et user.id_user
            connection.query(query, [article.id_article, user.id_user], (err, results) => {
                if (err) {
                    reject(err); // Rejette la promesse en cas d'erreur
                } else {
                    resolve(results); // Résout la promesse avec les résultats de la requête
                }
            });
        });
    }

    // Méthode pour supprimer un article du panier d'un utilisateur
    static async RemoveArticleFromCart(article, user) {
        // Requête SQL pour supprimer un article de la table have_cart
        const query = `DELETE FROM have_cart WHERE id_article = ? AND id_user = ?`;
        return new Promise((resolve, reject) => {
            // Exécute la requête avec les paramètres article.id_article et user.id_user
            connection.query(query, [article.id_article, user.id_user], (err, results) => {
                if (err) {
                    reject(err); // Rejette la promesse en cas d'erreur
                } else {
                    resolve(results); // Résout la promesse avec les résultats de la requête
                }
            });
        });
    }

    // Méthode pour récupérer tous les articles dans le panier d'un utilisateur
    static async getCart(user) {
        // Requête SQL pour sélectionner tous les articles dans le panier d'un utilisateur
        const query = `SELECT article.* FROM article 
                       JOIN have_cart ON article.id_article = have_cart.id_article 
                       WHERE have_cart.id_user = ?`;
        return new Promise((resolve, reject) => {
            // Exécute la requête avec le paramètre user
            connection.query(query, [user], (err, results) => {
                if (err) {
                    reject(err); // Rejette la promesse en cas d'erreur
                } else {
                    resolve(results); // Résout la promesse avec les résultats de la requête
                }
            });
        });
    }
}

module.exports = ArticleCart;
