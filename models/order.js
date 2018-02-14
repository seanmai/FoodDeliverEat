var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cart: {type: Object, required: true},
    deliveryTime: {type: Date, required: true},
    payment: {type: String, required: true},
    instructions: String,
});
module.exports = mongoose.model("Order", foodSchema);
