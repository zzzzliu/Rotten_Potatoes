var express = require("express"),
    router = express.Router({mergeParams: true});

var Movie = require('../models/Movie'),
    Comment = require('../models/comment'),
    middleware = require("../middleware");


// new page
router.get("/new", middleware.isLoggedIn, function (req, res) {
    // find campgrounds by id
    Movie.findById(req.params.id, function (err, movie) {
        if (err) {
            console.log(err);
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
            res.redirect("/movies/" + req.params.id);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    movie.comments.push(comment._id);
                    movie.save(function (err) {
                        if (err) console.log(err);
                    });
                    res.redirect("/movies/" + req.params.id);
                }
            });
        }
    });

});




module.exports = router;