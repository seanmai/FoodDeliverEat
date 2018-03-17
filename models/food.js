var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    type: String,
    radioInput: [{
        name: String,
        items: [
            {
                type: String
            }
        ]
    }],
    selectInput: [{
        name: String,
        items: [
            {
                type: String
            }
        ]
    }]
});
module.exports = mongoose.model("Food", foodSchema);

//Add radio object
//Radio object is array of inputs
