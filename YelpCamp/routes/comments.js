const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// middleware

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCommnetOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundCommnent) => {
            if (err) {
                res.redirect("back");
            }
            else {
                if (foundCommnent.author.id.equals(req.user._id)) {
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

// Comments New
router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", { campground: campground });
        }
    });
});

// Comments Create
router.post("/", isLoggedIn, (req, res) => {
    //lookup using ID
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    console.log(`New comment;s username will be: ${req.user.username}`);
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
        }
    });
});

// comments edit route
router.get("/:comment_id/edit", checkCommnetOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect("back");
        }
        else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    });
});
// comment update
router.put("/:comment_id", checkCommnetOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updateComment) => {
        if (err) {
            res.redirect("back");
        }
        else {
            res.redirect(`/campgrounds/${req.params.id}`)
        }
    });
});

// comment destroy route
router.delete("/:comment_id", checkCommnetOwnership, (req, res) => {
    // findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back");
        }
        else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

module.exports = router;
