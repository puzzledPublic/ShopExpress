var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');
//session에 user 정보 등록
passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function (user, done) {
        done(null, user);
});
//passport LocalStrategy Config 
passport.use(new localStrategy(

    function(username, password, done){
        User.findOne(username, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, {message : '아이디가 존재하지 않습니다.'});
            }
            if(!user.comparePassword(password)){
                return done(null, false, {message : '비밀번호가 틀렸습니다.'});
            }
            return done(null, user);
        });
    }
));

module.exports = passport;