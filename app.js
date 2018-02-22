var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var indexRoutes = require("./routes/index"),
    movieRoutes = require("./routes/movie");


// configure application
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


// configure database
mongoose.connect("mongodb://localhost/rotten_potatoes");

// routes
app.use("/movies", movieRoutes);
app.use("/", indexRoutes);

app.listen(4000, function () {
    console.log("The Server is Running!!!");
});