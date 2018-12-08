var express = require("express");
var app = express();

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", (req, res) => {
    var thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server is listening!!!");
});
