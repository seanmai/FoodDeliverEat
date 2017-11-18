var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {
        first: {type: String, required: true},
        last:  {type: String, required: true}}
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
