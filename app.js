var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    localStrategy = require('passport-local');

var indexRoutes = require("./routes/index"),
    movieRoutes = require("./routes/movie");

var User = require("./models/User");


// configure application
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


// configure database
mongoose.connect("mongodb://localhost/rotten_potatoes");


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
    next();
});


// routes
app.use("/movies", movieRoutes);
app.use("/", indexRoutes);

app.listen(4000, function () {
    console.log("The Server is Running!!!");
});