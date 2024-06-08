// Importation des modules
const express = require('express');
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Crée une application Express
const app = express();

// Middleware pour gérer les requêtes cross-origin
app.use(cors());

// Middleware pour servir les fichiers statiques depuis le dossier "asset"
app.use("/asset", express.static(path.join(__dirname, "/asset")));

// Middleware pour parser les corps de requête en JSON
app.use(express.json());

// Middleware pour parser les corps de formulaire
app.use(express.urlencoded({ extended: true }));

// Middleware pour appliquer une limite de requête à toutes les routes
const rateLimit = require("./middlewares/rate-limit");
app.use(rateLimit);

// Appel des routes automatisé
const forumRoutes = path.join(__dirname, "./routes/");
fs.readdirSync(forumRoutes).forEach((file) => {
    const route = require(path.join(forumRoutes, file));
    app.use(route);
});

module.exports = app;
