var express = require("express");
var router = express.Router();
var Food = require("../models/food");
var Cart = require("../models/cart");
var Order = require("../models/order");
var middleware = require("../middleware");

router.get("/", function(req, res){
    Order.find({}, function(err, orders){
        if(err){
            console.log(err)
        } else {
            console.log(orders[0].cart.items);
            res.render("orders/index", {orders: orders})
        }
    })
});

module.exports = router;
