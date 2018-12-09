var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/fallinlovewith/:thing", (req, res) => {
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", (req, res) => {
    var posts = [
            {title: "Post1", author: "Susy"},
            {title: "My adorable pet bunny", author: "Charlie"},
            {title: "Can you believe this pomsky", author: "Colt"},
        ];
    res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server is listening!!!");
});
