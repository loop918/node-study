const express = require('express');
const app = express();
const  cors = require('cors');
app.use(cors());
require('dotenv').config();
const mysql = require('mysql');

const client = mysql.createConnection({
    host :  process.env.DB_HOST,
    user :  process.env.DB_ID,
    password :  process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE_NAME,
});

app.get("/", (req,res) => {
    client.query("SELECT * FROM BOARD WHERE bnum = 1", (err, result, fields) =>{
        res.json(result);
    });
})

const PORT = process.env.PORT || 3060;

const corsOption = {
    origin : 'http://localhost:3000',
    credentials : true
}
app.use(cors(corsOption));

const user = require('./routes/user');
const post = require('./routes/post');

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});




