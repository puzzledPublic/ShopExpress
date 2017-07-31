
module.exports = function(req, res, next){
    if(req.isAuthenticated()){
        res.render('index');
    }
    else{
        next();
    }

}