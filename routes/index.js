var express = require('express');
var router = express.Router();

var users = require('./users');
var products = require('./products');


/* 메인 페이지 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 유저 페이지 */
router.use('/users',users);

router.use('/products', products);

module.exports = router;
