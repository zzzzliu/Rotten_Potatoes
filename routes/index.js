var express = require("express");
var router = express.Router();
var request = require("request");
var imdb = require("imdb-api");

// All the basic pages, e.g. homepage, not found page
router.get("/", function (req, res) {
    res.render("homepage");
});

router.post("/search", function (req, res) {
    var title = req.body.title;
    imdb.search({title: title}, {apiKey: '44e45971', timeout: 30000}).then(function (value) {
        res.render("movies/results", {movies: value.results});
    }).catch(function (error) {
        if (error) {
            console.log(error);
            res.redirect("back");
        }
    });
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

router.get("*", function (req, res) {
    res.send("Cannot find the page.");
});

module.exports = router;