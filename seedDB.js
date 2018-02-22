var mongoose = require("mongoose"),
    Movie = require("./models/Movie");
mongoose.connect("mongodb://localhost/rotten_potatoes");

var data = [
    {
        name: "Harry Porter",
        year: 2011,
        description: "magic novel",
        type: "for children",
        image: "http://www.imdb.com/title/tt1324999/mediaviewer/rm2517941248?ref_=tt_ov_i"
    },
    {
        name: "The Shawshank Redemption",
        year: 1994,
        description: "Two imprisoned men bond over a number of years, finding solace and eventual " +
        "redemption through acts of common decency.",
        type: "crime drama",
        image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzL" +
        "WFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
    },
    {
        name: "The Godfather",
        year: 1972,
        description: "The aging patriarch of an organized crime dynasty transfers control of " +
        "his clandestine empire to his reluctant son.",
        type: "crime, drama",
        image: "https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q2NzQ3ZDUtNWU5OC00Yjc0LTh" +
        "lYmEtNWM3NTFmM2JiY2VhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg"
    }
];

data.forEach(function (value) {
    Movie.create(value, function (err, newMovie) {
        if (err) {
            console.log(err)
        }
    });
});
