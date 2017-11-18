var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var bcrtyp = require("bcrypt-nodejs");

var UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {
        first: {type: String, required: true},
        last:  {type: String, required: true}}
});

UserSchema.methods.encrypPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
