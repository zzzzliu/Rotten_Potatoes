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
                    res.render("users/show", {user: user, comments: comments});
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

// Show favorites of the user
router.get("/:id/favorites", middleware.isLoggedIn, function (req, res) {
    res.render("users/showfavorites", {favorites: req.user.favorites});
});

// Edit route
router.get("/:id/edit", function (req, res) {
    res.render("users/edit", {user: req.user});
});

// Update route
router.put("/:id", function (req, res) {
    User.findByIdAndUpdate(req.params.id, {about: req.body.about}, function (err, newUser) {
        if (err) {
            req.flash("error", "Cannot update user");
        } else {
            req.flash("success", "Successfully Updated");
        }
        res.redirect("/users/" + req.params.id);
    });
});

module.exports = router;