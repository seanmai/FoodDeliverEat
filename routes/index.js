var express = require("express");
var router = express.Router();
var passport = require("passport");
var csrf = require("csurf");
var User = require("../models/user");

var csrfProtection = csrf();
router.use(csrfProtection);

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

// AUTH //
//Show register form
router.get("/register", function(req, res){
    res.render("register", {page: "register", csrfToken: req.csrfToken()});
});

//Handle sign up logic
router.post("/register", function(req, res){
    User.register(new User({email : req.body.email}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to FoodDeliverEat " + user.username);
            res.redirect("/order");
        });
    });
});

//Show login form
router.get("/login", function(req, res){
    res.render("login", {page: "login", csrfToken: req.csrfToken()});
});

//Handles login logic using passport middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/order",
    failureRedirect: "/login",
    failureFlash: true
    }), function(req, res){
});


//Logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out");
    res.redirect("/order");
});

module.exports = router;
