"use strict";


// Inporte le module Express
const express = require("express");
const env = require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.use("/public/", express.static('assets'))

const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 8081;
const BoutiqueRoutes = require('./routeur/route');

app.use(BoutiqueRoutes);
app.listen(port, () => console.log('listening on port ${port}'));