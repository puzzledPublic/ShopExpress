var express = require('express');
var router = express.Router();

var product = require('./product');
//var order = require('./order');

/* 어드민 메인 페이지 */
router.get('/', function(req, res, next){
    res.render('adminViews/main');
});

/* 상품 관리 페이지 */
router.use('/product', product);

/* 주문 관리 페이지 */
//router.use('/order', order);

module.exports = router;