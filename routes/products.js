var express = require('express');
var router = express.Router();
var categorys = require('../models/category');
var Product = require('../model/product');

router.get('/', function(req, res, next){
    res.send('products');
});

router.get('/:category', function(req, res, next){
    let category = req.params.category;
    if(categorys.includes(category)){
        Product.findAll(category, function(products){
            res.render('productViews/productList', products);
        });
    }
    else{
        res.render('404page');
    }   
});

module.exports = router;