var express = require('express');
var router = express.Router();

//Home Page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/new', function(req,res,next){
  res.render('users/new')
})






module.exports = router;
