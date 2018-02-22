var express = require("express");
var router = express.Router();
var Movie = require("../models/Movie");

// Index route
router.get("/", function (req, res) {
    Movie.find({}, function (err, movies) {
        if (err) {
            console.log(err);
        } else {
            res.render("movies/index", {movies: movies});
        }
    });
});

// Show route
router.get("/:id", function (req, res) {
    Movie.findById(req.params.id, function (err, movie) {
        if (err) {
            console.log(err);
        } else {
            res.render("movies/show", {movie: movie});
        }
    });
});

module.exports = router;