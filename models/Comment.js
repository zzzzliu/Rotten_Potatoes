var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    rating: Number,
    created: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    movie: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie"
        },
        poster: String,
        title: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);