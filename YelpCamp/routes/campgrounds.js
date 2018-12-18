const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// ============================
//  Campgrounds ROUTES
// ============================

// Index - show all campgrounds
router.get("/", (req, res) => {
    // Get all campground from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    })
});

// Create
router.post("/", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = { name: name, image: image, description: desc };

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

// New
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

// Show - shows more info about one campground
router.get("/:id", (req, res) => {
    // find the campground 
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

module.exports = router;