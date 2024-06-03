const connection = require('../config/db');

class Article {
    static getArticlebyID(articleID) {
        const query = `SELECT * FROM article WHERE id_article = ?;`;
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
    static getArticleHomme(query) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT article.* FROM article`;
            let joins = "";
            let conditions = " WHERE article.genders = 'homme'";
            const values = [];

            Object.entries(query).forEach(([key, value], index) => {
                if (key.toLowerCase() === "limit" || key.toLowerCase() === "offset") {
                    sql += ` ${key.toUpperCase()} ?`;
                    values.push(parseInt(value));
                } else if (key.toLowerCase() === "color") {
                    const colors = value.split(',').map(color => color.trim()); // Séparer les couleurs par une virgule
                    const colorConditions = colors.map((_, index) => `?`).join(', '); // Créer des ? pour chaque couleur
                    joins += ` LEFT JOIN have_colors ON article.id_article = have_colors.id_article LEFT JOIN color ON have_colors.id_color = color.id_color`;
                    conditions += ` AND color.color IN (${colorConditions})`; // Utiliser IN pour vérifier plusieurs couleurs
                    values.push(...colors); // Ajouter toutes les couleurs à la liste de valeurs
                } else if (key.toLowerCase() === "category") {
                    const categorys = value.split(',').map(category => category.trim()); // Séparer les categories par une virgule
                    const categoryConditions = categorys.map((_, index) => `?`).join(', '); // Créer des ? pour chaque categorie
                    joins += ` LEFT JOIN category ON article.id_category = category.id_category`;
                    conditions += ` AND category.category IN (${categoryConditions})`; // Utiliser IN pour vérifier plusieurs categories
                    values.push(...categorys); // Ajouter toutes les categories à la liste de valeurs
                } else if (key.toLowerCase() === "material") {
                    const materials = value.split(',').map(material => material.trim()); // Séparer les matières par une virgule
                    const materialConditions = materials.map((_, index) => `?`).join(', '); // Créer des ? pour chaque matières
                    joins += ` LEFT JOIN have_materials ON article.id_article = have_materials.id_article LEFT JOIN material ON have_materials.id_material = material.id_material`;
                    conditions += ` AND material.material = (${materialConditions})`; // Utiliser IN pour vérifier plusieurs matières
                    values.push(...materials); // Ajouter toutes les matières à la liste de valeurs
                } else {
                    conditions += ` AND ${key} = ?`;
                    values.push(value);
                }
            });

            sql += joins + conditions;

            connection.query(sql, values, (err, results) => err ? reject(err) : resolve(results));
        });
    }
    static getArticleFemme(query) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT article.* FROM article`;
            let joins = "";
            let conditions = " WHERE article.genders = 'femme'";
            const values = [];

            Object.entries(query).forEach(([key, value], index) => {
                if (key.toLowerCase() === "limit" || key.toLowerCase() === "offset") {
                    sql += ` ${key.toUpperCase()} ?`;
                    values.push(parseInt(value));
                } else if (key.toLowerCase() === "color") {
                    const colors = value.split(',').map(color => color.trim());
                    const colorConditions = colors.map((_, index) => `?`).join(', ');
                    joins += ` LEFT JOIN have_colors ON article.id_article = have_colors.id_article LEFT JOIN color ON have_colors.id_color = color.id_color`;
                    conditions += ` AND color.color IN (${colorConditions})`;
                    values.push(...colors);
                } else if (key.toLowerCase() === "category") {
                    const categorys = value.split(',').map(category => category.trim());
                    const categoryConditions = categorys.map((_, index) => `?`).join(', ');
                    joins += ` LEFT JOIN category ON article.id_category = category.id_category`;
                    conditions += ` AND category.category IN (${categoryConditions})`;
                    values.push(...categorys);
                } else if (key.toLowerCase() === "material") {
                    const materials = value.split(',').map(material => material.trim());
                    const materialConditions = materials.map((_, index) => `?`).join(', ');
                    joins += ` LEFT JOIN have_materials ON article.id_article = have_materials.id_article LEFT JOIN material ON have_materials.id_material = material.id_material`;
                    conditions += ` AND material.material = (${materialConditions})`;
                    values.push(...materials);
                } else {
                    conditions += ` AND ${key} = ?`;
                    values.push(value);
                }
            });

            sql += joins + conditions;

            connection.query(sql, values, (err, results) => err ? reject(err) : resolve(results));
        });
    }
    static getImages(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT image.img FROM article LEFT JOIN image ON article.id_article = image.id_article WHERE article.id_article = ?;`
            connection.query(sql, [id], (err, result) => err ? reject(err) : resolve(result));
        })
    }
    static getColorsById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT color.color FROM have_colors LEFT JOIN color ON have_colors.id_color = color.id_color WHERE have_colors.id_article = ?;`;
            connection.query(sql, [id], (err, result) => err ? reject(err) : resolve(result));
        });
    }
    static getCategoryById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT category.category FROM article LEFT JOIN category ON article.id_category = category.id_category WHERE article.id_article = ?;`;
            connection.query(sql, [id], (err, result) => err ? reject(err) : resolve(result));
        });
    }
    static getMaterialById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT material.material FROM have_materials LEFT JOIN material ON have_materials.id_material = material.id_material WHERE have_materials.id_article = ?;`;
            connection.query(sql, [id], (err, result) => err ? reject(err) : resolve(result));
        });
    }
    static getSizesById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT size.size, have_sizes.stock 
                FROM have_sizes 
                LEFT JOIN size ON have_sizes.id_size = size.id_size 
                WHERE have_sizes.id_article = ?;
            `;
            connection.query(sql, [id], (err, result) => err ? reject(err) : resolve(result));
        });
    }
    static getColors() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT DISTINCT * FROM color;`;
            connection.query(sql, (err, result) => err ? reject(err) : resolve(result));
        });
    }
    static getCategories() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT DISTINCT * FROM category;`;
            connection.query(sql, (err, result) => err ? reject(err) : resolve(result));
        });
    }
    static getMaterials() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT DISTINCT * FROM material;`;
            connection.query(sql, (err, result) => err ? reject(err) : resolve(result));
        });
    }
    static async getArticlesByNameWithDifferentColors(name, excludeArticleId) {
        const query = `
            SELECT article.id_article, article.name, color.color
            FROM article
            JOIN have_colors ON article.id_article = have_colors.id_article
            JOIN color ON have_colors.id_color = color.id_color
            WHERE article.name = ? AND article.id_article != ?;
        `;

        const [rows] = await connection.promise().query(query, [name, excludeArticleId]);
        return rows;
    }
    static async getFirstImageByArticleId(articleId) {
        const query = `
            SELECT img FROM image WHERE id_article = ? LIMIT 1;
        `;

        const [rows] = await connection.promise().query(query, [articleId]);
        return rows.length > 0 ? rows[0].img : null;
    }
}

module.exports = Article;
