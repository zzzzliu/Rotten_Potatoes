var mongoose = require("mongoose");

var MovieSchema = new mongoose.Schema({
    title: String,
    _year_data: String,
    year: Number,
    rated: String,
    released: String,
    runtime: String,
    genres: String,
    director: String,
    writer: String,
    actors: String,
    plot: String,
    languages: String,
    country: String,
    awards: String,
    poster: String,
    ratings: [
        {
            Source: String,
            Value: String
        }
    ],
    metascore: String,
    rating: String,
    votes: String,
    imdbid: String,
    type: String,
    dvd: String,
    boxoffice: String,
    production: String,
    website: String,
    response: String,
    series: false,
    imdburl: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Movie", MovieSchema);









