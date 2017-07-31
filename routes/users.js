var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var auth = require('../helper/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('userpage');
});

router.get('/login', auth, function(req, res, next){
  res.render('userViews/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect: '/users/login'
}));


router.get('/signup', auth, function(req, res, next){
  res.render('userViews/signup');
});
router.post('/signup',function(req, res, next){
  
  
  let userInstance = new User();
  userInstance.setId(req.body.username);
  userInstance.setName(req.body.name);
  userInstance.setPasswordToHash(req.body.password);
  User.create(userInstance, function(result){
    res.send(result+"");
  });
});

module.exports = router;
