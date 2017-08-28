var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('adminViews/product');
});

router.get('/registration', function(req, res, next){
    res.render('adminViews/product');
});

router.post('/registration', function(req, res, next){

});

module.exports = router;