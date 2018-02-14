var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    name: {type: String, required: true},
    phone: {type: Number, required: true},
    cart: {type: Object, required: true},
    lat: Number,
    lng: Number,
    deliveryTime: {type: Date, required: true},
    payment: {type: String, required: true},
    instructions: String,
});
module.exports = mongoose.model("Order", orderSchema);
