var express = require("express");
var router = express.Router();
var Food = require("../models/food");
var Cart = require("../models/cart");
var Order = require("../models/order");
var middleware = require("../middleware");

router.get("/", function(req, res){
    Food.find({}, function(err, foods){
        var category = [];
        foods.forEach(function(food){
            if(middleware.notInArray(food.type, category)){
                category.push(food.type);
            }
        });
        if(err){
            console.log(err);
        } else{
            res.render("order/index", {foods: foods, category: category});
        }
    });
});

router.get("/:id", function(req, res){
    Food.findById(req.params.id).exec(function(err, foodItem){
        if(err){
            console.log(err);
            res.redirect("/order");
        } else {
            res.render("order/show", {food: foodItem});
        }
    });
});

router.get("/view-orders", function(req, res){

});

module.exports = router;
