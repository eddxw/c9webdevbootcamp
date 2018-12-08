var express = require("express");
var app = express();


app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});
app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog:"Woof Woof!",
        cat: "I hate you human",
        goldfish: "..."
    }
    var sound = sounds[animal];
    res.send(`The ${animal} says '${sound}'`);
});

app.get("/repeat/:word/:times", function(req, res) {
    var word = req.params.word;
    var times = Number(req.params.times);
    var repstr = "";
    for (let i = 0; i < times; i++) {
        repstr += `${word} `;
    }
    res.send(repstr);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});
