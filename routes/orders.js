var express = require("express");
var router = express.Router();
var Food = require("../models/food");
var Cart = require("../models/cart");
var Order = require("../models/order");
var middleware = require("../middleware");

router.get("/", middleware.isLoggedIn, function(req, res){
    Order.find({}, function(err, orders){
        if(err){
            console.log(err)
        } else {
            res.render("orders/index", {page: "orders", orders: orders})
        }
    })
});

router.delete("/:id", function(req, res){
    Order.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/orders");
        } else{
            res.redirect("/orders");
        }
    })
});

module.exports = router;
