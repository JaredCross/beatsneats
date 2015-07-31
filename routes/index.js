var express = require('express');
var router = express.Router();
var db = require('./../models')

//Home Page
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/help', function (req,res,next){
  res.render('index');
});

router.get('/user/new', function(req,res,next){
  res.render('users/new')
})

router.post('/user', function(req,res,next){
  var fullName = req.body.fullName;
  var email = req.body.email;
  var password = req.body.password;
  db.Users.create({fullName: fullName, email: email, password: password, destinations: []}).then(function () {
    res.redirect('/')
  })
})


module.exports = router;
