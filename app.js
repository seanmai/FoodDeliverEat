var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override");

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

app.get("/", function(req, res){
    res.render("landing");
});

app.listen(3000, function(){
    console.log("FoodDeliverEat is listening on PORT3000.");
});
