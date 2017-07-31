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

  let userInstance = setUserParameter(req.body);
  if(User.validateUser(userInstance, req.body.passwordcheck)){
    User.create(userInstance, function(result){
      res.send(result);
    });
  }
  else{
      res.render('userViews/signup');
  }
  
});

function setUserParameter(params){
  let user = new User();
  user.setId(params.username);
  user.setName(params.name);
  user.setPasswordToHash(params.password);
  user.setZipcode(params.zipcode);
  user.setAddr(params.addr);
  user.setDetailsAddr(params.detailsaddr);
  user.setTel(params.tel);
  user.setHp(params.hp);
  user.setEmail(params.email);
  return user;
}

module.exports = router;
