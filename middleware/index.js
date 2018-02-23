var middlewareObj = {};

middlewareObj.pushNoPosterToEnd = function(a) {
    if (a.poster === "N/A")
        return 1;
    else
        return -1;
};

middlewareObj.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;