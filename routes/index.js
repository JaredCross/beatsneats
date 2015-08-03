var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var db = require('./../models');
var unirest = require('unirest');
var weatherParser = require('./../lib/server.js')

//Home Page
router.get('/', function(req, res, next) {
  if (req.session) {
    var fullName = req.session.fullName
  } else {
    var fullName = null;
  }
      res.render('index', {fullName: fullName});
});

router.post('/help', function (req,res,next){
  unirest.get('http://api.songkick.com/api/3.0/search/locations.json?query='+ req.body.city+ '&apikey='+ process.env.SONGKICK_API)
  .end(function (response) {
    var cityId = response.body.resultsPage.results.location[0].metroArea.id;
    unirest.get('http://api.songkick.com/api/3.0/metro_areas/'+ cityId + '/calendar.json?apikey=' + process.env.SONGKICK_API)
    .end(function (response) {
      var musicEvents = response.body.resultsPage.results.event
      unirest.post('http://api.openweathermap.org/data/2.5/forecast?q='+req.body.city+',us')
      .send()
      .end(function (response) {
        var weather = weatherParser(response);
        res.render('index', {musicEvents: musicEvents, weather: weather});
      });
    })
  });
});

router.post('/login', function (req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  db.Users.findOne({email: email}).then(function (user) {
    if (bcrypt.compareSync(password, user.password)) {
      req.session.fullName = user.fullName;
      res.redirect('/')
    }
  })
});

router.get('/logout', function (req,res,next){
  req.session = null;
  res.redirect('/');
});

router.get('/user/new', function(req,res,next){
  res.render('users/new')
})

router.post('/user', function(req,res,next){
  var fullName = req.body.fullName;
  var email = req.body.email;
  var password = req.body.password;
  var hash = bcrypt.hashSync(password, 8);
  db.Users.create({fullName: fullName, email: email, password: hash, destinations: []}).then(function () {
    req.session.fullName = fullName;
    res.redirect('/')
  })
})



module.exports = router;
