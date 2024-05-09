const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors({
    origin: '*'
}));

const routesPath = path.join(__dirname, './routes');
fs.readdirSync(routesPath).forEach(file => {
    const route = require(path.join(routesPath, file));
    app.use(route);
})

app.use("/images", express.static(path.join(__dirname, './img')));

module.exports = app;