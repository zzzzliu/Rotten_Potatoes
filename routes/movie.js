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
                var alreadyFavorite = false;
                if (req.user) {
                    var index = -1;
                    for (var i = 0; i < req.user.favorites.length; i++) {
                        if (req.user.favorites[i].id.equals(movie._id)) {
                            index = i;
                        }
                    }
                    if (index !== -1)
                        alreadyFavorite = true;
                }
                res.render("movies/show", {movie: movie, alreadyFavorite: alreadyFavorite});
            }
        }
    );
});

// create route
router.post("/:imdbid", function (req, res) {
    Movie.find({imdbid: req.params.imdbid}, function (err, movie) {
        if (err) {
            console.log(err);
            req.flash("error", "Cannot find detailed information about this movie");
            res.redirect("/movies");
        } else if (movie.length === 0) {
            imdb.getById(req.params.imdbid, {apiKey: '44e45971', timeout: 30000}).then(function (value) {
                Movie.create(value, function (err, newMovie) {
                    if (err) {
                        req.flash("error", "Cannot find detailed information about this movie");
                        res.redirect("/movies");
                    } else {
                        res.redirect("/movies/" + newMovie._id);
                    }
                });
            }).catch(function (error) {
                if (error) {
                    req.flash("error", "Cannot find detailed information about this movie");
                    res.redirect("/movies");
                }
            });
        } else {
            res.redirect("/movies/" + movie[0]._id);
        }
    });
});

// Toggle favorite
router.get("/:id/favorite", middleware.isLoggedIn, function (req, res) {
    Movie.findById(req.params.id).populate("comments").exec(
        function (err, movie) {
            if (err) {
                console.log(err);
                req.flash("error", "Cannot add to favorites");
                res.redirect("back");
            } else {
                if (!req.user.active) {
                    req.flash("error", "Please verify your email address");
                    res.redirect("back");
                } else {
                    var index = -1;
                    for (var i = 0; i < req.user.favorites.length; i++) {
                        if (req.user.favorites[i].id.equals(movie._id)) {
                            index = i;
                        }
                    }
                    if (index === -1) {
                        req.user.favorites.push({
                            id: movie._id,
                            poster: movie.poster,
                            title: movie.title
                        });
                    } else {
                        req.user.favorites.splice(index, 1);
                    }
                    req.user.save(function (err) {
                        if (err)
                            console.log(err);
                    });
                    res.redirect("back");
                }
            }
        }
    );
});

module.exports = router;