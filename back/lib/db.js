const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host :  process.env.DB_HOST,
    user :  process.env.DB_ID,
    password :  process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE_NAME,
    connectTimeout : 5000,
    connectionLimit : 20,
});

module.exports = db;