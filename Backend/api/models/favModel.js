const connection = require('../config/db');

class ArticleFav {
    // Méthode pour ajouter un article aux favoris d'un utilisateur
    static async AddArticleToFav(article, user) {
        // Requête SQL pour insérer un favori dans la table have_fav
        const query = `INSERT IGNORE INTO have_fav (id_article, id_user) VALUES (?, ?)`;
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

    // Méthode pour supprimer un article des favoris d'un utilisateur
    static async RemoveArticleFromFav(article, user) {
        // Requête SQL pour supprimer un favori de la table have_fav
        const query = `DELETE FROM have_fav WHERE id_article = ? AND id_user = ?`;
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

    // Méthode pour récupérer les articles favoris d'un utilisateur
    static async getFav(user) {
        // Requête SQL pour sélectionner les articles favoris d'un utilisateur
        const query = `SELECT article.* FROM article 
                       JOIN have_fav ON article.id_article = have_fav.id_article 
                       WHERE have_fav.id_user = ?`;
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

module.exports = ArticleFav;
