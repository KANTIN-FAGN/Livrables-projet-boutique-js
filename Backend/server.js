const app = require("./api/app")
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 4000;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => console.log(`Server lancé sur => http://localhost:${port}/`));
