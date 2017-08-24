var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('adminViews/product');
});

module.exports = router;