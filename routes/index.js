var express = require("express"),
    router = express.Router(),
    imdb = require("imdb-api"),
    middleware = require("../middleware");


// All the basic pages, e.g. homepage, not found page
router.get("/", function (req, res) {
    res.render("homepage");
});

router.post("/search", function (req, res) {
    var title = req.body.title;
    imdb.search({title: title}, {apiKey: '44e45971', timeout: 30000}).then(function (value) {
        var results = value.results.sort(middleware.pushNoPosterToEnd);
        res.render("movies/results", {errorMessage: null, movies: results});
    }).catch(function (error) {
        if (error) {
            console.log(error);
            res.render("movies/results", {errorMessage: "Cannot found the movie."});
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