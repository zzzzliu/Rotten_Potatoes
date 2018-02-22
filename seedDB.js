var mongoose = require("mongoose"),
    Movie = require("./models/Movie");
mongoose.connect("mongodb://localhost/rotten_potatoes");

var data = [
    {
        title: 'The Toxic Avenger',
        _year_data: '1984',
        year: 1984,
        rated: 'R',
        released: '1986-04-11T05:00:00.000Z',
        runtime: '82 min',
        genres: 'Action, Comedy, Horror',
        director: 'Michael Herz, Lloyd Kaufman',
        writer: 'Lloyd Kaufman (story), Joe Ritter (screenplay), Lloyd Kaufman (additional material), Gay Partington Terry (additional material), Stuart Strutin (additional material)',
        actors: 'Andree Maranda, Mitch Cohen, Jennifer Babtist, Cindy Manion',
        plot: 'This is the story of Melvin, the Tromaville Health Club mop boy, who inadvertently and naively trusts the hedonistic, contemptuous and vain health club members, to the point of accidentally ending up in a vat of toxic waste. The devastating results then have a transmogrification effect, his alter ego is released, and the Toxic Avenger is born, to deadly and comical results. The local mop boy is now the local Superhero, the saviour of corruption, thuggish bullies and indifference. Troma classic with good make-up effects and stunts, a pleasant surprise indeed.',
        languages: 'English',
        country: 'USA',
        awards: '1 nomination.',
        poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNzViNmQ5MTYtMmI4Yy00N2Y2LTg4NWUtYWU3MThkMTVjNjk3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        ratings: [
            { Source: 'Internet Movie Database', Value: '6.2/10' },
            { Source: 'Rotten Tomatoes', Value: '70%' }
        ],
        metascore: 'N/A',
        rating: '6.2',
        votes: '21,039',
        imdbid: 'tt0090190',
        type: 'movie',
        dvd: '10 Nov 1997',
        boxoffice: 'N/A',
        production: 'Troma',
        website: 'N/A',
        response: 'True',
        series: false,
        imdburl: 'https://www.imdb.com/title/tt0090190'
    },
    {
        title: 'Jumanji: Welcome to the Jungle',
        _year_data: '2017',
        year: 2017,
        rated: 'PG-13',
        released: '2017-12-20T05:00:00.000Z',
        runtime: '119 min',
        genres: 'Action, Adventure, Comedy',
        director: 'Jake Kasdan',
        writer: 'Chris McKenna (screenplay by), Erik Sommers (screenplay by), Scott Rosenberg (screenplay by), Jeff Pinkner (screenplay by), Chris McKenna (screen story by), Chris Van Allsburg (based on the book "Jumanji" by), Greg Taylor (based on the film "Jumanji" screenplay by), Jim Strain (based on the film "Jumanji" screen story by), Chris Van Allsburg (based on the film "Jumanji" screen story by), Jonathan Hensleigh (based on the film "Jumanji" screenplay by), Greg Taylor (based on the film "Jumanji" screen story by), Jim Strain (based on the film "Jumanji" screenplay by)',
        actors: 'Dwayne Johnson, Kevin Hart, Jack Black, Karen Gillan',
        plot: 'In a brand new Jumanji adventure, four high school kids discover an old video game console and are drawn into the game\'s jungle setting, literally becoming the adult avatars they chose. What they discover is that you don\'t just play Jumanji - you must survive it. To beat the game and return to the real world, they\'ll have to go on the most dangerous adventure of their lives, discover what Alan Parrish left 20 years ago, and change the way they think about themselves - or they\'ll be stuck in the game forever, to be played by others without break.',
        languages: 'English',
        country: 'USA',
        awards: 'N/A',
        poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkyNDQ1MDc5OV5BMl5BanBnXkFtZTgwOTcyNzI2MzI@._V1_SX300.jpg',
        ratings: [
            { Source: 'Internet Movie Database', Value: '7.2/10' },
            { Source: 'Rotten Tomatoes', Value: '76%' },
            { Source: 'Metacritic', Value: '58/100' }
        ],
        metascore: '58',
        rating: '7.2',
        votes: '63,910',
        imdbid: 'tt2283362',
        type: 'movie',
        dvd: 'N/A',
        boxoffice: '$245,606,319',
        production: 'Columbia Pictures',
        website: 'http://www.jumanjimovie.com/',
        response: 'True',
        series: false,
        imdburl: 'https://www.imdb.com/title/tt2283362'
    },
    {
        title: 'Inception',
        _year_data: '2010',
        year: 2010,
        rated: 'PG-13',
        released: '2010-07-16T04:00:00.000Z',
        runtime: '148 min',
        genres: 'Action, Adventure, Sci-Fi',
        director: 'Christopher Nolan',
        writer: 'Christopher Nolan',
        actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
        plot: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb\'s rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible - inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea but to plant one. If they succeed, it could be the perfect crime. But no amount of careful planning or expertise can prepare the team for the dangerous enemy that seems to predict their every move. An enemy that only Cobb could have seen coming.',
        languages: 'English, Japanese, French',
        country: 'USA, UK',
        awards: 'Won 4 Oscars. Another 152 wins & 204 nominations.',
        poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        ratings: [
            { Source: 'Internet Movie Database', Value: '8.8/10' },
            { Source: 'Rotten Tomatoes', Value: '86%' },
            { Source: 'Metacritic', Value: '74/100' }
        ],
        metascore: '74',
        rating: '8.8',
        votes: '1,670,098',
        imdbid: 'tt1375666',
        type: 'movie',
        dvd: '07 Dec 2010',
        boxoffice: '$292,568,851',
        production: 'Warner Bros. Pictures',
        website: 'http://inceptionmovie.warnerbros.com/',
        response: 'True',
        series: false,
        imdburl: 'https://www.imdb.com/title/tt1375666'
    }
];

data.forEach(function (value) {
    Movie.create(value, function (err, newMovie) {
        if (err) {
            console.log(err)
        }
    });
});
