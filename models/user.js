var mongoose = require("mongoose");
// passportLocalMongooseEmail = require('passport-local-mongoose-email');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, required: false},
    email: {type: String, required: false},
    password: {type: String, required: false},
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    phoneNumber: {type: Number, required: false},
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: false
        }
    ],
    isAdmin: {type: Boolean, default: false}
});

// UserSchema.plugin(passportLocalMongooseEmail, {
//     usernameField: 'email',
// });
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
