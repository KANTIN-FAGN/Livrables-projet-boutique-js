const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/routes')

// EJS
app.set('view engine', 'ejs')
app.use("/public/", express.static('assets'));
app.use(cors())
app.use(routes)

const port = 3000

app.listen(port, '0.0.0.0', console.log(`Server Frontend lancé sur => http://localhost:${port}/Roid`));