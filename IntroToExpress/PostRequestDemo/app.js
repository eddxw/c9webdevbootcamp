var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", (req,res)=>{
    res.render("home");
});

app.get("/friends", (req,res)=>{
   res.render("friends", {friends: friends}); 
});

app.post("/addfriend", (req, res)=>{
    var newfriend = req.body.newfriend;
    friends.push(newfriend);
    res.redirect("/friends");
});


app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("Server started!!!");
});

