var express = require("express");
var router = express.Router();
var passport = require("passport");
var csrf = require("csurf");
var User = require("../models/user");

var csrfProtection = csrf();
router.use(csrfProtection);

// AUTH //
//Show register form
router.get("/register", function(req, res){
    res.render("user/register", {page: "register", csrfToken: req.csrfToken()});
});

//Handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/user/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to FoodDeliverEat " + user.username);
            res.redirect("/menu");
        })
    })
});

//Show login form
router.get("/login", function(req, res){
    res.render("user/login", {page: "login", csrfToken: req.csrfToken()});  //page: orders for header navbar active
});

//Handles login logic using passport middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/menu",
    failureRedirect: "/user/login",
    failureFlash: true
    }), function(req, res){
});

//Logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Signed out");
    res.redirect("/menu");
});

//User Profile
router.get("/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/menu");
        }
        res.render("user/profile", {page: "profile", user: foundUser});
    });
});

module.exports = router;
