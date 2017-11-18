var middlewareObj = {};

middlewareObj.notInArray = function(item, arr) {
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return false;
        }
    }
    return true;
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must log in to continue.");
    res.redirect("/login");
}

module.exports = middlewareObj;
