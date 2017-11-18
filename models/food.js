var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    type: String
});
module.exports = mongoose.model("Food", foodSchema);
