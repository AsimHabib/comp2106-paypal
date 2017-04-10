var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');

//let callBackURL  = "http://localhost:3000";
let callBackURL  = "https://comp2106-paypal.herokuapp.com";


router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Success' });
});

router.get('/cancel', function(req, res, next) {
  res.render('cancel', { title: 'Cancel' });
});


router.post('/', function(req, res) {
   // paypal payment configuration.
  var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal" 
  },
  "redirect_urls": {
    "return_url": callBackURL +"/paynow/success",
    "cancel_url": callBackURL +"/paynow/cancel"
  },
  "transactions": [{
    "amount": {
      "total":parseInt(req.body.amount),
      "currency":  req.body.currency
    }
  }]
  };

paypal.payment.create(payment, function (error, payment) {
  if (error) {
    console.log(error);
  } else {
    if(payment.payer.payment_method === 'paypal') {
      req.paymentId = payment.id;
      var redirectUrl;
      console.log(payment);
      for(var i=0; i < payment.links.length; i++) {
        var link = payment.links[i];
        if (link.method === 'REDIRECT') {
          redirectUrl = link.href;
        }
      }
      res.redirect(redirectUrl);
    }
  }
});
/*
paypal.payment.create(payment, function (error, payment) {
    if (error) {
        console.log(error);
    } else {
        console.log("Create Payment Response");
        console.log(payment);
        res.redirect(redirectUrl);
    }
});*/

});


// make it public
module.exports = router;