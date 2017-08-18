var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var auth = require('../helper/auth');
var Level = require('../models/level');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('404page');
});

router.get('/login', auth, function(req, res, next){
  res.render('userViews/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect: '/users/login'
}));

router.get('/logout', function(req, res, next){
  req.logOut();
  res.redirect('/');
});

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

router.get('/info', function(req, res, next){
  let info = {'name':req.user.name, 
              'level':Level.getToString(req.user.level), 
              'point':req.user.point};
  res.render('userViews/info',{'info': info});
});

router.get('/account', function(req, res, next){
  let account = req.user;
  res.render('userViews/account',{'account': account});
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
