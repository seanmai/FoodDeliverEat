var express = require("express");
var router = express.Router();
var passport = require("passport");
var csrf = require("csurf");
var User = require("../models/user");
var middleware = require("../middleware");

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

//Update route
router.put("/:id", function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){ // Uses req.body.user due to the way form data is set up
        if(err){                                                                     // ie) user[firstName]
            req.flash("error", err.message);
            res.redirect("/:id/account");
        } else {
            req.flash("success", "Your account information has been changed succesfully.");
            res.redirect("/:id/account");
        }
    })
})

//User Account
router.get("/:id/account", middleware.checkAccountOwnership, function(req, res){
    User.findById(req.params.id).exec(function(err, foundUser){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/menu");
        }
        // console.log(foundUser);
        res.render("user/account", {page: "profile", user: foundUser});
    });
});

//User Payment
router.get("/:id/payment-info", middleware.checkAccountOwnership, function(req, res){
    User.findById(req.params.id).exec(function(err, foundUser){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/menu");
        }
        // console.log(foundUser);
        res.render("user/payment", {page: "payment-info", user: foundUser});
    });
});

//User Order History
router.get("/:id/order-history", middleware.checkAccountOwnership, function(req, res){
    User.findById(req.params.id).populate("orders").exec(function(err, foundUser){  // Must use populate method to populate orders from objectID
        if(err){
            req.flash("error", err.message);
            return res.redirect("/menu");
        }
        // console.log(foundUser);
        res.render("user/orders", {page: "order-history", user: foundUser});
    });
});

module.exports = router;
