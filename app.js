const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Show Registration Page
app.get("/", (req, res) => {
    res.render("register");
});

// Save User in Database
app.post("/register", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const sql =
        "INSERT INTO users(name,email,password) VALUES(?,?,?)";

    db.query(sql, [name, email, password], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error while registering");
        } else {
            res.send("Registration Successful");
        }

    });

});

// Show Login Page
app.get("/login", (req, res) => {
    res.render("login");
});

// Check Login
app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const sql =
        "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            console.log(err);
        }
        else if (result.length > 0) {
            res.redirect("/dashboard");
        }
        else {
            res.send("Invalid Email or Password");
        }

    });

});

app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});
// Show Mood Page
app.get("/mood", (req, res) => {
    res.render("mood");
});

// Save Mood
app.post("/mood", (req, res) => {

    const mood = req.body.mood;
    const note = req.body.note;

    const sql =
        "INSERT INTO moods(mood,note,entry_date) VALUES(?,?,CURDATE())";

    db.query(sql, [mood, note], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error");
        }
        else {
            res.send("Mood Saved Successfully");
        }

    });

});
// Mood History
app.get("/history", (req, res) => {

    const sql = "SELECT * FROM moods ORDER BY id DESC";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
        }
        else {
            res.render("history", { moods: result });
        }

    });

});
// AI Emotional Insight
app.get("/insight", (req, res) => {

    const sql = "SELECT mood FROM moods";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
        }
        else {

            let positive = 0;
            let negative = 0;

            result.forEach((row) => {

                if (
                    row.mood === "Happy" ||
                    row.mood === "Relaxed"
                ) {
                    positive++;
                }

                if (
                    row.mood === "Sad" ||
                    row.mood === "Angry" ||
                    row.mood === "Stressed"
                ) {
                    negative++;
                }

            });

            let message = "";

            if (positive > negative) {

                message =
                "😊 Positive Mood Trend. Keep maintaining your healthy habits.";

            }
            else if (negative > positive) {

                message =
                "😔 Negative Mood Trend. Consider meditation and relaxation exercises.";

            }
            else {

                message =
                "😐 Balanced Mood Trend. Continue monitoring your emotions.";

            }

            res.render("insight", { message });

        }

    });

});
// Meditation Sessions
app.get("/meditation", (req, res) => {

    const sql = "SELECT * FROM meditation";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
        }
        else {
            res.render("meditation", {
                sessions: result
            });
        }

    });

});
app.listen(3000, () => {
    console.log("Server Running On Port 3000");
});