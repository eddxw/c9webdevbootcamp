const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Schema Setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image: "https://farm8.staticflickr.com/7368/9811937955_03d073d6ef.jpg"
// }, (err, campground) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("NEWLY CREATED CAMPGROUND: ");
//         console.log(campground);
//     }
// });



app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    // Get all campground from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds", { campgrounds: allCampgrounds });
        }
    })
});

app.post("/campgrounds", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = { name: name, image: image };

    // Create a new campground and save to DB
    Campground.create(newCampground, (err, newcampground) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("YelpCamp Server has started!!");
});
