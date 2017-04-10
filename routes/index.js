var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// make it public
module.exports = router;
