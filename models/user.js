var mongoose = require("mongoose");
passportLocalMongooseEmail = require('passport-local-mongoose-email');

var UserSchema = new mongoose.Schema({
    email: {type: String, required: false},
    password: {type: String, required: false},
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    phoneNumber: {type: Number, required: false},
    isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongooseEmail, {
    usernameField: 'email',
});
module.exports = mongoose.model("User", UserSchema);
