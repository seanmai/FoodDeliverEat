var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Food           = require("./models/food");

// Requiring Routes
// var indexRoutes = ,
//     foodRoutes = ,

mongoose.connect("mongodb://localhost/fooddelivereat", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// // Passport Configuration
// app.use(require("express-session")({
//     secret: "ASDF312213",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Food.create({
//     name: "Sandwich",
//     description: "Homemade sandwich",
//     image: "https://farm4.staticflickr.com/3111/5721758195_c9efaa9452.jpg",
//     price: 10.00
// }, function(err, food){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(food);
//     }
// });


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/order", function(req, res){
    Food.find({}, function(err, foods){
        if(err){
            console.log(err);
        } else{
            res.render("order/index", {foods: foods});
        }
    });
});

app.listen(3000, function(){
    console.log("FoodDeliverEat is listening on PORT3000.");
});
