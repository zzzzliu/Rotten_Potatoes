var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("homepage");
});

app.get("/results", function (req, res) {
    var api = "http://www.omdbapi.com/?apikey=44e45971&s=" + req.query.search_term;
    request(api, function (error, response, body) {
       if (!error && response.statusCode === 200) {
           var data = JSON.parse(body);
           res.render("results", {data: data["Search"]});
       }
    });

});

app.get("*", function (req, res) {
    res.send("Cannot find the page.");
});

app.listen(3000, function () {
    console.log("The Server is Running!!!");
});