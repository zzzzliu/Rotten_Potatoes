var express = require("express"),
    router = express.Router(),
    imdb = require("imdb-api"),
    passport = require("passport"),
    nodemailer = require("nodemailer");

var User = require("../models/User"),
    middleware = require("../middleware");


// configure SMTP
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "rotten.potatoes.movie.review",
        pass: "rottenPotatoesAdmin!"
    }
});


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
    var newUser = new User({
        username: req.body.username,
        realname: req.body.firstname + " " + req.body.lastname,
        email: req.body.email,
        about: req.body.about,
        active: false
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success", "Welcome to Rotten Potatoes, " + user.username + "! Please verify your email.");

                var host = req.get('host');
                var link = "http://" + host + "/verify?id=" + req.user.salt;
                var mailOptions = {
                    to : req.body.email,
                    subject : "Please Confirm Your Email Account",
                    html : "Hello, " + req.body.username +
                           "<br><br>" +
                           "Please Click on the link to verify your email." +
                           "<br><br>" +
                           "<a href=" + link + ">Click here to verify</a>" +
                           "<br><br>" +
                           "Best, " +
                           "<br>" +
                           "Rotten Potatoes"
                };
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error) {
                        console.log(error);
                    } else {
                        console.log(response);
                    }
                });
                res.redirect("/movies");
            });
        }
    });
});

router.get('/verify', function (req, res) {
    User.findOneAndUpdate({salt: req.query.id}, {active: true}, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", "Cannot Verify the Email");
            res.end("<h1>Cannot Verify the Email</h1>");
        } else {
            console.log("Successfully Verified");
            req.flash("success", "Successfully Verified");
            res.redirect("/login");
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