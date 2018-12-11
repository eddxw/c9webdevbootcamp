const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");

app.get("/results", (req, res) => {
    var query = req.query.search;
    const url = `http://www.omdbapi.com/?apikey=thewdb&s=${query}`;

    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            res.render("results", { data: data });
        }
    })
});

app.get("/", function(req, res) {
    res.render("search");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie App has has started!");
});
