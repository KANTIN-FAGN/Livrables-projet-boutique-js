const connection = require('../config/db');

class Article {
    static getArticlebyID(articleID){
        const query = `SELECT * FROM articles WHERE id = ?;`;
        return new Promise((resolve, reject) => {
            connection.query(query, [articleID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
    static getImagesForArticle(articleID){
        const query = `SELECT * FROM images WHERE article_id = ?;`;
        return new Promise((resolve, reject) => {
            connection.query(query, [articleID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    static getSizesForArticle(articleID){
        const query = `SELECT * FROM sizes WHERE article_id = ?;`;
        return new Promise((resolve, reject) => {
            connection.query(query, [articleID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    static getArticlesBySex(sex) {
        const query = `SELECT * FROM articles WHERE sex = ?;`;
        return new Promise((resolve, reject) => {
            connection.query(query, [sex], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    static getColorsForArticle(articleID) {
        const query = `SELECT color FROM colors WHERE article_id = ?;`;
        return new Promise((resolve, reject) => {
            connection.query(query, [articleID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const colors = results.map(result => result.color);
                    resolve(colors);
                }
            });
        });
    }
    static getCategorysForArticle(articleID) {
        const query = `SELECT category FROM categorys WHERE article_id = ?;`;
        return new Promise((resolve, reject) => {
            connection.query(query, [articleID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const categories = results.map(result => result.category);
                    resolve(categories);
                }
            });
        });
    }
}

module.exports = Article;
