const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");
var NodeGeocoder = require("node-geocoder");

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

// console.log(options);

// var geocoder = NodeGeocoder(options);

let geo = require('mapbox-geocoding');

geo.setAccessToken(process.env.MAPBOX_GEOCODING_API_KEY);



// Index - show all campgrounds
router.get("/", (req, res) => {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        Campground.find({ name: regex }, (err, allCampgrounds) => {
            if (err) {
                console.log(err);
            }
            else {
                if (allCampgrounds.length < 1) {
                    req.flash("error", "No campgrounds found");
                }
                res.render("campgrounds/index", { campgrounds: allCampgrounds });
            }
        });
    }
    else {
        Campground.find({}, (err, allCampgrounds) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render("campgrounds/index", { campgrounds: allCampgrounds });
            }
        });
    }
});

// Create
router.post("/", middleware.isLoggedIn, (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    geo.geocode('mapbox.places', req.body.location, function(err, geoData) {
        if (err) {
            console.log(req.body.location, geoData);
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        var foundLocation = geoData.features[0];
        var lat = foundLocation.geometry.coordinates[0];
        var lng = foundLocation.geometry.coordinates[1];
        var location = foundLocation.place_name;
        var newCampground = { name: name, price: price, image: image, description: desc, author: author, location: location, lat: lat, lng: lng };

        // Create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            }
            else {
                //redirect back to campgrounds page
                res.redirect("/campgrounds");
            }
        });
    });
});

// New
router.get("/new", middleware.isLoggedIn, (req, res) => {
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
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {

        res.render("campgrounds/edit", { campground: foundCampground });
    });
});
// Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {

    geo.geocode('mapbox.places', req.body.campground.location, function(err, geoData) {
        if (err) {
            console.log(req.body.campground.location, geoData);
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
        var foundLocation = geoData.features[0];
        var lat = foundLocation.geometry.coordinates[0];
        var lng = foundLocation.geometry.coordinates[1];
        var location = foundLocation.place_name;

        var campground = req.body.campground;
        var newData = { name: campground.name, price: campground.price, image: campground.image, description: campground.description, location: location, lat: lat, lng: lng };
        console.log(newData);
        Campground.findByIdAndUpdate(req.params.id, { $set: newData }, function(err, campground) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("back");
            }
            else {
                req.flash("success", "Successfully Updated!");
                res.redirect("/campgrounds/" + campground._id);
            }
        });
    });
});

// Destroy campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
