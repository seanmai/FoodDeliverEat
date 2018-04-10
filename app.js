var express        = require("express"),
    // socket         = require("socket.io"),
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
    User           = require("./models/user"),
    seedDB         = require("./seeds");

// Requiring Routes
var indexRoutes = require("./routes/index"),
    menuRoutes = require("./routes/menu"),
    ordersRoutes = require("./routes/orders"),
    userRoutes = require("./routes/user"),
    checkoutRoutes = require("./routes/checkout");

//DATABASEURL exported on local machine and set as env var for heroku
mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
app.locals.pluralize = require("pluralize");
// seedDB();

app.use(cookieParser());
app.use(require("express-session")({
    secret: "QWER1234",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000} //min * sec * millisec
}));

// Passport Configuration
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
app.use("/menu", menuRoutes);
app.use("/orders", ordersRoutes);
app.use("/user", userRoutes);
app.use("/checkout", checkoutRoutes);
app.all("*", function(req, res){            //Redirects all other routes that are not specified
    res.redirect("http://www.loceats.ca/menu");
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
    console.log("locEATS is listening on PORT" + port);
});
// var io = socket(server);
// app.set("socketio", io); // Stores io in app object to be accessed in req.app and res.app objects

// io.on("connection", function(socket){
    // console.log("Made socket connection", socket.id);

    // socket.on("order", function(data){
    //     console.log("Order passed into socket");
    //     io.sockets.emit("order", data);
    // });
// });
