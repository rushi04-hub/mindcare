const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_HOST,
    password: process.env.DB_PASSWRD,
    database: process.env.DB_NAME,
    port: 17309
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database Connected");
    }
});

module.exports = db;