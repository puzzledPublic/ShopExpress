var express = require('express');
var router = express.Router();

var users = require('./users');
var products = require('./products');
var admin = require('./admin/index');

/* 메인 페이지 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 유저 페이지 */
router.use('/users',users);

/* 제품 페이지 */
router.use('/products', products);

/* 어드민 페이지*/
router.use('/admin', admin);

module.exports = router;
