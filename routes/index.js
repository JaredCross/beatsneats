var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('./../models');

var promises = require('./../lib/promise.js');
var eventParse = require('./../lib/musicEventParse.js');

//Home Page
router.get('/', function(req, res, next) {
  if (req.session) {
    var fullName = req.session.fullName
  } else {
    var fullName = null;
  }
      res.render('index', {fullName: fullName,});
});



router.post('/help', function (req,res,next){
  promises.cityIdPromFunc(req.body.city).then(function (data) {
    var cityId = data.body.resultsPage.results.location[0].metroArea.id;
    return Promise.all(
      [
        promises.musicEventPromFuncPage1(cityId),
        promises.musicEventPromFuncPage2(cityId),
        promises.musicEventPromFuncPage3(cityId),
        promises.musicEventPromFuncPage4(cityId),
        promises.yelpPromFunc(req.body.city),
        promises.weatherPromFunc(req.body.city)
      ]);
  }).then(function (results) {
    var restaurants = results[4].businesses;
    var weather = results[5];
    var musicEvent5DaysArr = eventParse(results[0],results[1],results[2],results[3]);
    res.render('index', {musicEvents: musicEvent5DaysArr, restaurants: restaurants, city: req.body.city, state: req.body.state, weather: weather, display: JSON.stringify(weather)});
  });
});




router.post('/login', function (req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  db.Users.findOne({email: email}).then(function (user) {
    if (bcrypt.compareSync(password, user.password)) {
      req.session.fullName = user.fullName;
      res.redirect('/');
    }
  });
});

router.get('/logout', function (req,res,next){
  req.session = null;
  res.redirect('/');
});

router.get('/user/new', function(req,res,next){
  res.render('users/new');
});

router.post('/user', function(req,res,next){
  var fullName = req.body.fullName;
  var email = req.body.email;
  var password = req.body.password;
  var hash = bcrypt.hashSync(password, 8);
  db.Users.create({fullName: fullName, email: email, password: hash, destinations: []}).then(function () {
    req.session.fullName = fullName;
    res.redirect('/');
  });
});



module.exports = router;
