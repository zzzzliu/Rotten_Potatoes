var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    realname: String,
    password: String,
    about: String,
    created: {type: Date, default: Date.now}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);