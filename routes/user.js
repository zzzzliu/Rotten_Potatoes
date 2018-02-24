var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware");

var User = require("../models/User"),
    Comment = require("../models/Comment");

// Show Route
router.get("/:id", middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", "Cannot find the user");
            req.redirect("back");
        } else {
            Comment.find({"author.username": user.username}, function (err, comments) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Cannot find the user's comments");
                    req.redirect("back");
                } else {
                    res.render("users/show", {user: user, comments:comments});
                }
            });
        }
    });
});

// Show the comment of the user
router.get("/:id/comments", middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", "Cannot find the user");
            req.redirect("back");
        } else {
            Comment.find({"author.username": user.username}, function (err, comments) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Cannot find the user's comments");
                    req.redirect("back");
                } else {
                    res.render("users/showcomments", {user: user, comments:comments});
                }
            });
        }
    });
});

module.exports = router;