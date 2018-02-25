var express = require("express"),
    router = express.Router(),
    imdb = require("imdb-api"),
    passport = require("passport");

var User = require("../models/User"),
    middleware = require("../middleware");


// Homepage
router.get("/", function (req, res) {
    res.render("homepage");
});

// Search Page
router.post("/search", function (req, res) {
    var title = req.body.title;
    imdb.search({title: title}, {apiKey: '44e45971', timeout: 30000}).then(function (value) {
        var results = value.results.sort(middleware.pushNoPosterToEnd);
        res.render("movies/results", {movies: results});
    }).catch(function (error) {
        if (error) {
            req.flash("error", "Cannot found the movie");
            res.redirect("/movies");
        }
    });
});

// Register Page
router.get("/register", function (req, res) {
    res.render("loginAndRegister");
});

router.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username, about: req.body.about, realname: req.body.realname});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success", "Welcome to Rotten Potatoes, " + user.username);
                res.redirect("/movies");
            });
        }
    });
});

// Login Page
router.get("/login", function (req, res) {
    res.render("loginAndRegister");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/movies",
    successFlash: "Successfully Logged In",
    failureRedirect: "/login",
    failureFlash: 'Invalid username or password.'
}), function (req, res) {});

// Logout Page
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Successfully Logged Out");
    res.redirect("/movies");
});


// router.get("/results", function (req, res) {
//     var api = "http://www.omdbapi.com/?apikey=44e45971&s=" + req.query.search_term;
//     request(api, function (error, response, body) {
//         if (!error && response.statusCode === 200) {
//             var data = JSON.parse(body);
//             console.log(data);
//             res.render("results", {data: data["Search"]});
//         }
//     });
//
// });

// Not Found Page
router.get("*", function (req, res) {
    res.render("notfound");
});

module.exports = router;