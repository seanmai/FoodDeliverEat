var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

// AUTH //
//Show register form
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

//Handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to FoodDeliverEat " + user.username);
            res.redirect("/campgrounds");
        })
    })
});


module.exports = router;
