var express = require('express');
var router = express.Router();
var passport = require("passport");
var localStrategy = require("passport-local");
var userModel = require('./users');

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/signuppage', function (req, res) {
  res.render("signuppage");
});
router.post("/signup", function (req, res) {
  var newUser = new userModel({
    name: req.body.name,
    username: req.body.username,
  })
  userModel
    .register(newUser, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect("/profile");
      })
    })
});
router.get("/profile", isLoggedIn, function (req, res) {
  res.send("this page is under devlopment");
});

router.post('/login',
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/"
  }),
  function (req, res) {}
);

router.post("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }

}


module.exports = router;