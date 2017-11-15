var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number
});
module.exports = mongoose.model("Food", foodSchema);
