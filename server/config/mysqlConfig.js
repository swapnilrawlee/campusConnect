require('dotenv').config();
const mysql = require('mysql2/promise');

const connectDB= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    queueLimit: 0,
    connectTimeout: 10000,
    multipleStatements: true 
});

connectDB.then(async () => {
    console.log('Database connected');
}).catch(err => console.log(err));

module.exports =  connectDB;
