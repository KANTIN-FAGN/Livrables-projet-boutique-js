// Load env variables
const dotenv = require('dotenv');
dotenv.config();

// import mysql2 module
const mysql = require('mysql2');

// Define connection
const connectionConfig = {
    host: process.env.HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connnectionLimit: 10,
}

// Create connection
const connection = mysql.createConnection(connectionConfig);
connection.connect((err) => {
    if (err) {
        console.log('Error creating connection')
        return
    }
    console.log('Connection established')
})

module.exports = connection;
