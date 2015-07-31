var express = require('express');
var router = express.Router();




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






module.exports = router;
