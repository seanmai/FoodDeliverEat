var User = require("../models/user");

var middlewareObj = {};

middlewareObj.notInArray = function(item, arr) {
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return false;
        }
    }
    return true;
}

middlewareObj.checkAccountOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
            if(err){
                req.flash("error", "User not found");
                res.redirect("back");
            } else {
                if(foundUser._id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You do not have permission");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You must log in to continue");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must log in to continue");
    res.redirect("/user/login");
}

module.exports = middlewareObj;
