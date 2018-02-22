var mongoose = require("mongoose");

var MovieSchema = new mongoose.Schema({
    name: String,
    year: Number,
    description: String,
    type: String,
    image: String
});

module.exports = mongoose.model("Movie", MovieSchema);
