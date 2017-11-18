var express        = require("express"),
    cookieParser   = require("cookie-parser"),
    session        = require("express-session"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    MongoStore     = require("connect-mongo")(session),
    Food           = require("./models/food"),
    User           = require("./models/user");

// Requiring Routes
var indexRoutes = require("./routes/index"),
    orderRoutes = require("./routes/order");

mongoose.connect("mongodb://localhost/fooddelivereat", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// // Passport Configuration
app.use(require("express-session")({
    secret: "QWER1234",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000} //min * sec * millisec
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.session = req.session;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/order", orderRoutes);

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

app.listen(3000, function(){
    console.log("FoodDeliverEat is listening on PORT3000.");
});
