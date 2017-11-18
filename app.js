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
//     name: "Linguine",
//     description: "A delicious combo of dry-cured capicollo, mozzarella, mac and cheese, salt chips, and red pepper spread.",
//     image: "http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/8/4/1/IG0511_linguine-with-shrimp-scampi_s4x3.jpg.rend.hgtvcom.616.462.suffix/1384540894943.jpeg",
//     price: 10.00,
//     type: "Sandwich"
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
        var category = [];
        foods.forEach(function(food){
            if(notInArray(food.type, category)){
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

function notInArray(item, arr) {
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return false;
        }
    }
    return true;
}

app.listen(3000, function(){
    console.log("FoodDeliverEat is listening on PORT3000.");
});
