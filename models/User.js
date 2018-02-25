var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    realname: String,
    password: String,
    about: String,
    created: {type: Date, default: Date.now},
    favorites: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie"
            },
            poster: String,
            title: String
        }
    ]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);