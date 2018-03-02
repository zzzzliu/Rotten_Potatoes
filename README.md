# Rotten_Potatoes
An full-stack project based on MongoDB, Node.js, and Express. Please find the project at [http://rottenpotatoesmovie.herokuapp.com/](http://rottenpotatoesmovie.herokuapp.com/).

To run the project locally, just type
```
$ node app.js
```
In this project:
- Implemented the web service with Node.js, jQuery, Bootstrap, Express, MongoDB, and Heroku for deployment
- Designed and developed the Ajax based frontend with jQuery, Bootstrap and ejs; Constructed the MVC backend with Express on MongoDB with mongoose; Employed method-override and body-parser for RESTful routing
- Implemented user authentication with Passport.js, passport-local-mongoose to support 3rd party users
- Utilized Nodemailer to achieve the SMTP email transport for new-users email verification

## Acknowledgement
1. The basic idea of this project is based on [Colt Steele's bootcamp](https://www.udemy.com/the-web-developer-bootcamp/). In this Rotten_Protatoes version, the user-profile page and email-verification functionalities are added.
2. The [OMDB API](http://www.omdbapi.com/) is employed for querying movie information.

## Setup
Different setups are needed if you plan to use this project locally verus the Heroku + MongoLab setup. This is accomplished using enviornment variables. Basically, there are 4 environment variables to be set up.
### Locally
Just type the following line in terminal:
```
export OMDBAPI=[Please get an OMDB api and enter it here]
export DBURL=[The local mongoDB url]
export EMAILUSER=[The Gmail address to send the verification email]
export EMAILPASSWORD=[The password for that email address]
```
### Heroku + MongoLab setup
Here, please replace the `DBURL` as your `mLab` url, and you are ready to go.
