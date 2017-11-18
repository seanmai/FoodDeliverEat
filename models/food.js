var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    type: String,
    size: String,
    addition: String,
    flavour: String
});
module.exports = mongoose.model("Food", foodSchema);
