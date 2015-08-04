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
  if (req.body.city.trim() != '') {
   promises.cityIdPromFunc(req.body.city).then(function (data) {
     if (data.body.resultsPage.results.location) {
       var cityId = data.body.resultsPage.results.location[0].metroArea.id;
     } else {
       var cityId = 0;
     }
     if (cityId != 0) {
       Promise.all(
       [
         promises.musicEventPromFuncPage1(cityId),
         promises.musicEventPromFuncPage2(cityId),
         promises.musicEventPromFuncPage3(cityId),
         promises.musicEventPromFuncPage4(cityId),
         promises.yelpPromFunc(req.body.city),
         promises.weatherPromFunc(req.body.city)
       ])
     .then(function (results) {
     var restaurants = results[4].businesses;
     var weather = results[5];
     var musicEvent5DaysArr = eventParse(results[0],results[1],results[2],results[3]);
     res.render('index', {musicEvents: musicEvent5DaysArr, restaurants: restaurants, city: req.body.city, weather: weather});
   });
   } else {
     res.render('index', {error: "City isn't valid", city: req.body.city});
   }
   });
 } else {
   res.render('index', {error: "City isn't valid", city: req.body.city});
 }
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

router.get('/music', function (req, res, next) {
  console.log('here?');
  console.log(req.query.info);
  var response = {'hello': 'hi'};
  req.json(response);
  // var user = req.query.user;
  // var bookmark = req.query.bookmark;
  // var checked = req.query.checked;
  // if (checked === 'yes') {
  //   db.Users.update({_id: user}, {$push: {favorites: music}}).then(function (data) {
  //   })
  // } else {
  //   db.Users.update({_id: user}, {$pull: {favorites: music}}).then(function (data) {
  //   })
  // }
})

router.get('/food', function (req, res, next) {
  console.log('here?');
  console.log(req.query);
  var response = {'hello': 'hi'};
  req.json(response);
  // var user = req.query.user;
  //   var bookmark = req.query.bookmark;
  //   var checked = req.query.checked;
  //   if (checked === 'yes') {
  //     db.Users.update({_id: user}, {$push: {favorites: food}}).then(function (data) {
  //     })
  //   } else {
  //     db.Users.update({_id: user}, {$pull: {favorites: food}}).then(function (data) {
  //     })
  //   }
})

router.post('/user', function(req,res,next){
  console.log(req.query);
  var response = {'hello': 'hi'};
  req.json(response);
  // var fullName = req.body.fullName;
  // var email = req.body.email;
  // var password = req.body.password;
  // var hash = bcrypt.hashSync(password, 8);
  // db.Users.create({email: email, password: hash, favoritesMusic: [], favoritesFood: []}).then(function () {
  //   req.session.fullName = fullName;
  //   res.redirect('/');
  // });
});

module.exports = router;
