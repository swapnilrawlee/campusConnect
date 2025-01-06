require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    queueLimit: 0,
    connectTimeout: 10000
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to database!");
        connection.release();
    } catch (err) {
        console.error("Error connecting to database: ", err);
    }
}

testConnection();

pool.on('error', (err) => {
    console.error('MySQL Pool Error: ', err);
});

module.exports = pool;
