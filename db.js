const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "mysql-11b4bab2-rmore8199-6b64.g.aivencloud.com",
    user: "avnadmin",
    password: "process.env.DB_PASSWORD",
    database: "defaultdb",
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