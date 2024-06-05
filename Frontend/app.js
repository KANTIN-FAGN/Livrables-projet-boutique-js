const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurer EJS comme moteur de vue
app.set('view engine', 'ejs');

// Servir les fichiers statiques depuis le dossier "assets"
app.use("/public/", express.static('assets'));

// Utiliser CORS pour gérer les requêtes cross-origin
app.use(cors());

// Lire le body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Utiliser les routes définies dans routes.js
app.use(routes);

// Démarrer le serveur
app.listen(port, '0.0.0.0', () => {
    console.log(`Server Frontend lancé sur => http://localhost:${port}/Roid`);
});
