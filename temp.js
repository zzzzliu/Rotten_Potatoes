const imdb = require('imdb-api');
imdb.get('The Toxic Avenger', {apiKey: '44e45971', timeout: 30000}).then(console.log).catch(console.log);
// imdb.search({title: 'jumanji'}, {apiKey: '44e45971'}).then(console.log).catch(console.log);