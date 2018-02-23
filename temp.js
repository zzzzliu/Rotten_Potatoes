var imdb = require('imdb-api'),
    Movie = require('./models/Movie'),
    mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/rotten_potatoes");


var title = 'jumanji';
// imdb.search({title: title}, {apiKey: '44e45971', timeout: 30000}).then(function (value) {
//     console.log(value.results);
// }).catch(function (error) {
//     if (error) {
//         console.log(error);
//     }
// });
//
// Movie.find({imdbid: 'tt2283462'}, function (err, movie) {
//     if (err) {
//         console.log(err);
//     } else if (movie.length === 0) {
//         console.log("No movie");
//     } else {
//         console.log(movie);
//     }
// });

imdb.search({title: title}, {apiKey: '44e45971', timeout: 30000}).then(function (value) {
    value.results.sort(function (a, b) {
        var pa = a.poster;
        var pb = b.poster;
        if (pa == 'N/A')
            return 1;
        else
            return -1;
    });
    console.log(value);
}).catch(console.log);