const imdb = require('imdb-api');

var title = 'jumanji';
imdb.search({title: title}, {apiKey: '44e45971', timeout: 30000}).then(function (value) {
    console.log(value.results);
}).catch(function (error) {
    if (error) {
        console.log(error);
    }
});