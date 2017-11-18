var express = require("express");
var router = express.Router();
var Campground = require("../models/food");
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

module.exports = router;
