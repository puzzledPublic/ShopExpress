module.exports = {
    notAllowForLogined: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.render('index');
        } else {
            next();
        }
    },
    notAllowForNotLogined: function(req, res, next){
        if(req.isAuthenticated()){
            next();
        }
        else{
            res.render('/users/login');
        }
    }
}