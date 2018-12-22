const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect("back");
            }
            else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
            }
        });
    }
    else {
        res.redirect("back");
    }
}

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
router.post("/", isLoggedIn, (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = { name: name, image: image, description: desc, author: author };

    // Create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// New
router.get("/new", isLoggedIn, (req, res) => {
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
            // render show template with that campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// Edit campground route
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});
// Update campground route
router.put("/:id", checkCampgroundOwnership, (req, res) => {
    // find and update campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {

        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
    // redirect
});

// Destroy campground Route
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
