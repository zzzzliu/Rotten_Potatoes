var express = require("express"),
    router = express.Router({mergeParams: true});

var Movie = require('../models/Movie'),
    Comment = require('../models/Comment'),
    middleware = require("../middleware");


// new page
router.get("/new", middleware.isLoggedIn, function (req, res) {
    // find campgrounds by id
    Movie.findById(req.params.id, function (err, movie) {
        if (err) {
            req.flash("error", "Cannot add comments to this movie");
            res.redirect("/movies");
        } else {
            res.render("comments/new", {movie: movie});
        }
    });
});


// create page
router.post("/", middleware.isLoggedIn, function (req, res) {
    //look up movie using id
    //create a new comment
    //connect movie with new comment
    //redirect to somewhere
    Movie.findById(req.params.id, function (err, movie) {
        if (err) {
            console.log(err);
            req.flash("error", "Cannot add comments to this movie");
            res.redirect("/movies/" + req.params.id);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Cannot add comments to this movie");
                    console.log(err);
                    res.redirect("/movies/" + req.params.id);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.movie.id = req.params.id;
                    comment.movie.poster = movie.poster;
                    comment.movie.title = movie.title;
                    comment.save();
                    movie.comments.push(comment._id);
                    movie.save(function (err) {
                        if (err) {
                            req.flash("error", "Cannot add comments to this movie");
                            console.log(err);
                            res.redirect("/movies/" + req.params.id);
                        }
                    });
                    req.flash("success", "Successfully Created");
                    res.redirect("/movies/" + req.params.id);
                }
            });
        }
    });

});


// edit page
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            req.flash("error", "Cannot edit comment");
            res.redirect("back");
        } else {
            res.render("comments/edit", {movieID: req.params.id, comment: foundComment});
        }
    })
});

// update page
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, newComment) {
        if (err) {
            req.flash("error", "Cannot update comment");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully Updated");
            res.redirect("/movies/" + req.params.id);
        }
    })
});


// delete page
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            req.flash("error", "Cannot delete comment");
            res.redirect("/movies/" + req.params.id);
        } else {
            req.flash("success", "Successfully deleted");
            res.redirect("/movies/" + req.params.id);
        }
    });
});


module.exports = router;