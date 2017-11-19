var mongoose = require("mongoose");
passportLocalMongooseEmail = require('passport-local-mongoose-email');

var UserSchema = new mongoose.Schema({
    email: {type: String, required: false},
    password: {type: String, required: false},
    name: {
        first: {type: String, required: false},
        last:  {type: String, required: false}}
});

UserSchema.plugin(passportLocalMongooseEmail, {
    usernameField: 'email',
});
module.exports = mongoose.model("User", UserSchema);
