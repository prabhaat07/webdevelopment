// var mongoose = require('mongoose');
// var url = "mongodb://localhost:27017/Friends";

// mongoose.connect("mongodb://localhost:27017/Friends", { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
//     if (err) {
//         Console.log("Not connected");
//     }
//     else {
//         console.log("database connected success");

//         db.close();
//     }
// })
var express = require('express');

var bodyparser = require('body-parser');

var path = require('path');

var mongoose = require('mongoose');

var passport = require('passport');

var passportLocalMongoose = require('passport-local-mongoose');

var localStrategy = require('passport-local');

const handle = require('express-handlebars');

var user = require('./models/userModel');

const { db } = require('./models/userModel');

var app = express();

var userData;
// var id = 
// 
/*
 id score
 
 insert into tt values() 
*/

//   DataBase Connection 

mongoose.connect("mongodb://localhost:27017/Friends",
    { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
        if (err) {
            Console.log("Not connected");
        }
        else {
            console.log("database connected success");
        }
    });


// app.set("Views", path.join(__dirname, '/Views/'));

// app.engine("hbs", handle({
//     extname: "hbs",
//     defaultLayout: "mainLayout",
//     layoutsDir: __dirname + "views/layouts"
// }));
app.set("view engine", "ejs");


app.use(bodyparser.urlencoded({
    extended: true
}));

//app.use(bodyparser.json());
app.use(require('express-session')({
    secret: "World is not as bad as you think",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('public'));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());

passport.deserializeUser(user.deserializeUser());
//============================
//          ROUTES
//============================

var a = {
    name: "prabhat",
    age: "23"
};

app.get('/req', (req, res) => {

    var resultq = [];
    mongoose.connect("mongodb://localhost:27017/Friends",
        { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
            if (err) {
                Console.log("Not connected");
            }
            else {
                console.log("database connected success");
            }

            var re = db.collection('users').find({}, { projection: { _id: 0, age: 1, name: 1 } }).toArray(function (err, result) {
                if (err)
                    console.log(err);
                else
                    res.send(result);
            });


        });


});

app.get("/stat", function (req, res) {

    res.render('wtest.ejs', { dataAraay: [5, 10, 17, 20] });
});



app.get("/", (req, res) => {

    console.log(userData);
    res.render('welcome.ejs', { test: userData });

});

app.get("/feedAbout", (req, res) => {
    res.render('feedAbout.ejs');
});

app.get("/play", isLoggedIn, (req, res) => {
    res.render("play.ejs");
})

app.get("/check", (req, res) => {
    res.send("World is Beautifull ");
})
app.get("/about", (req, res) => {
    res.render('about.ejs')
})
// Auth Route
app.get('/register', (req, res) => {
    res.render('Register')
});

app.post('/register', isLoggedInRegis, (req, res) => {
    user.register(new user({ username: req.body.username, name: req.body.pName, age: req.body.age }),
        req.body.password, function (err, user) {
            if (err) {

                console.log(err);
                return res.render('Register');
            }
            passport.authenticate("local")(req, res, function () {
                res.redirect('/');
            });
        });
})
app.get("/login", (req, res) => {
    res.render('login.ejs')
});

app.post("/sclogin", passport.authenticate('local'),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        userData = req.user.username;
        res.redirect("/");
    });
app.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: '/login'
}), function (req, res) {
    userData = req.body.username;
    console.log(userData);
    console.log("userrrrr");
});

//====================
// Game Route
//====================
app.get('/fastfeed', (req, res) => {

    res.render('index.ejs');

});
app.get('/colorBreak', (req, res) => {

    res.render('colorBreak.ejs');

});
app.get('/colorAbout', (req, res) => {

    res.render('colorAbout.ejs');

});
app.get('/decode', (req, res) => {

    res.render('decode.ejs');

});


app.get('/flowfree', (req, res) => {

    res.render('flowfree.ejs');

});


app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/login');
    }
}
function isLoggedInRegis(req, res, next) {
    if (req.isAuthenticated()) {

        res.redirect('/');
    }
    else {
        return next();
    }
}

app.listen(3000, () => {
    console.log("Server is started");
});

