const express = require("express");
const app = express();

app.set("view engine", "ejs");



app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
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
        }
    ];

    res.render("campgrounds", { campgrounds: campgrounds });

});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("YelpCamp Server has started!!");
});
