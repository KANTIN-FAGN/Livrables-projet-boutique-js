# Livrables-projet-boutique-js

Bienvenue dans le projet de la boutique en ligne de luxe, Roid. Ce guide vous aidera à démarrer rapidement avec l'installation et l'exécution de l'application.

## Table des Matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration du Backend](#configuration-du-backend)
- [Démarrage du Serveur](#démarrage-du-serveur)
- [Accès à l'Application Web](#accès-à-lapplication-web)
- [Structure du Projet](#structure-du-projet)
- [Remarques Finales](#Remarques-Finales)
- [Contributeurs](#Contributeurs)

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/)

## Installation

Clonez le dépôt du projet et naviguez vers les répertoires `backend` et `frontend` pour installer les dépendances nécessaires.

```bash
git clone https://github.com/Livrables-projet-boutique-js.git
cd roid Livrables-projet-boutique-js

cd backend
npm install
cd ../frontend
npm install
```

## Configuration du Backend

Avant de démarrer le serveur backend, vous devez configurer les variables d'environnement. Créez un fichier .env dans le répertoire backend et remplissez-le avec les informations suivantes :

### Explication des Variables

- ``PORT`` : Le port sur lequel le serveur backend écoute. Par défaut, 4000.
- ``HOST`` : L'hôte du serveur backend. Par défaut, localhost.
- ``BASE_URL`` : L'URL de base pour accéder à l'application backend.
- ``JWT_KEY`` : La clé secrète utilisée pour signer les JSON Web Tokens (JWT).
- ``PEPPER`` : Une valeur ajoutée pour renforcer le hachage des mots de passe.
- ``DB_HOST`` : L'hôte de la base de données. Par défaut, localhost.
- ``DB_USER`` : Le nom d'utilisateur pour se connecter à la base de données.
- ``DB_PASSWORD`` : Le mot de passe pour se connecter à la base de données.
- ``DB_NAME`` : Le nom de la base de données.
- ``DB_PORT`` : Le port sur lequel la base de données écoute. Par défaut, 3306.

## Démarrage du Serveur

### Backend

Pour démarrer le serveur backend, naviguez vers le répertoire backend et exécutez :

```bash
cd backend
npm start
```

### Frontend

Pour démarrer le serveur frontend, naviguez vers le répertoire frontend et exécutez :

```bash
cd ../frontend
npm start
```

## Accès à l'Application Web

Après avoir démarré le serveur frontend, un lien sera affiché dans le terminal. Maintenez la touche Ctrl enfoncée et cliquez sur le lien pour ouvrir l'application web dans votre navigateur par défaut.

## Structure du Projet

La structure du projet est la suivante :

```scss
Livrables-projet-boutique-js/
├── Backend/
│   ├── api/
│   ├── database/
│   ├── node_modules/
│   ├── .env
│   ├── .env.example
│   ├── package-lock.json
│   ├── package.json
│   ├── serveur.js
├── Frontend/
│   ├── assets/
│   ├── constroller/
│   ├── node-modules/
│   ├── routes/
│   ├── views/
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   ├── ... (autres fichiers de configuration)
├── Plan Projet/
│   ├── Diagramme-de-Gantt.xlsx
│   ├── RoadMap.xlsx
└── README.md
```

## Remarques Finales

Vous êtes maintenant prêt à travailler sur la boutique en ligne de luxe, Roid. Pour toute question ou assistance supplémentaire, n'hésitez pas à consulter la documentation ou à contacter l'équipe de développement.

Merci d'avoir choisi Roid !

## Contributeurs

Artur HERRY :
```bash
https://github.com/Shadow-sinn
```

Kantin FAGNIART :
```bash
https://github.com/KANTIN-FAGN
```

Si vous avez besoin d'autres ajustements ou d'ajouter plus de détails, n'hésitez pas à le demander.