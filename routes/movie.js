var express = require("express"),
    router = express.Router(),
    imdb = require("imdb-api"),
    Movie = require("../models/Movie"),
    middleware = require("../middleware");

// Index route
router.get("/", function (req, res) {
    Movie.find({}, function (err, movies) {
        if (err) {
            console.log(err);
        } else {
            movies = middleware.shuffle(movies).sort(middleware.pushNoPosterToEnd);
            res.render("movies/index", {movies: movies.slice(0, 16)});
        }
    });
});

// Show route
router.get("/:id", function (req, res) {
    Movie.findById(req.params.id).populate("comments").exec(
        function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.render("movies/show", {movie: movie});
            }
        }
    );
});

// create route
router.post("/:imdbid", function (req, res) {
    Movie.find({imdbid: req.params.imdbid}, function (err, movie) {
        if (err) {
            console.log(err);
            res.redirect("/movies");
        } else if (movie.length === 0) {
            imdb.getById(req.params.imdbid, {apiKey: '44e45971', timeout: 30000}).then(function (value) {
                Movie.create(value, function (err, newMovie) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect("/movies/" + newMovie._id);
                    }
                });
            }).catch(function (error) {
                if (error) {
                    console.log(error);
                    res.redirect("/movies");
                }
            });
        } else {
            res.redirect("/movies/" + movie[0]._id);
        }
    });
});

module.exports = router;