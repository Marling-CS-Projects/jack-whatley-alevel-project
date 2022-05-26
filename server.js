const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {

    res.redirect("/menu");

});

app.get("/menu", (req, res) => {

    res.sendFile(__dirname + "/index.html");

})

app.get("/game", (req, res) => {

    res.sendFile(__dirname + "/public/game.html");

});

app.listen(5000);