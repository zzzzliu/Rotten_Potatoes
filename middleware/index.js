var middlewareObj = {};

middlewareObj.pushNoPosterToEnd = function(a) {
    if (a.poster === "N/A")
        return 1;
    else
        return -1;
};

module.exports = middlewareObj;