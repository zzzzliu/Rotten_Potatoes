var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    methodOverride = require('method-override'),
    localStrategy = require('passport-local'),
    flash = require('connect-flash');

var indexRoutes = require("./routes/index"),
    movieRoutes = require("./routes/movie"),
    commentRoutes = require("./routes/comment"),
    userRoutes = require("./routes/user");

var User = require("./models/User");


// configure application
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());


// configure database
// mongoose.connect("mongodb://localhost/rotten_potatoes");
mongoose.connect("mongodb://admin:iAmFullStack@ds247648.mlab.com:47648/rotten_potatoes");

// configure passport
app.use(require("express-session")({
    secret: "I am a full-stack engineer",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


// routes
app.use("/movies", movieRoutes);
app.use("/movies/:id/comments", commentRoutes);
app.use("/users/", userRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT || 4000, function () {
    console.log("The Rotten Potatoes Server is Running!");
});