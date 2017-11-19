var express = require("express");
var router = express.Router();
var Cart = require("../models/cart");

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

module.exports = router;
