const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


var campgrounds = [{
        name: "Salmon Creek",
        image: "https://pixabay.com/get/e833b3092cf5033ed1584d05fb1d4e97e07ee3d21cac104491f4c571afedbcbd_340.jpg"
    },
    {
        name: "Granite Hill",
        image: "https://farm8.staticflickr.com/7368/9811937955_03d073d6ef.jpg"
    },
    {
        name: "Mountain Goat",
        image: "https://farm8.staticflickr.com/7174/6655837043_6b4948557f.jpg"
    },
    {
        name: "Salmon Creek",
        image: "https://pixabay.com/get/e833b3092cf5033ed1584d05fb1d4e97e07ee3d21cac104491f4c571afedbcbd_340.jpg"
    },
    {
        name: "Granite Hill",
        image: "https://farm8.staticflickr.com/7368/9811937955_03d073d6ef.jpg"
    },
    {
        name: "Mountain Goat",
        image: "https://farm8.staticflickr.com/7174/6655837043_6b4948557f.jpg"
    },
    {
        name: "Mountain Goat",
        image: "https://farm8.staticflickr.com/7174/6655837043_6b4948557f.jpg"
    },
    {
        name: "Salmon Creek",
        image: "https://pixabay.com/get/e833b3092cf5033ed1584d05fb1d4e97e07ee3d21cac104491f4c571afedbcbd_340.jpg"
    },
];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = { name: name, image: image };
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("YelpCamp Server has started!!");
});
