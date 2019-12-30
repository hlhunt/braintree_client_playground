var express = require('express');
var router = express.Router();
var braintree = require("braintree");
var gateway = require('../lib/gateway');

// // Braintree credentials
// var gateway = braintree.connect({
//     environment:  braintree.Environment.Sandbox,
//     merchantId:   'vgpqg5772jkq97q2',
//     publicKey:    '4jx8dt9kspbdpdf5',
//     privateKey:   '4d984ad6f7197474b596052d3fd620ab'
// });

/* GET home page. */
router.get('/', function(req, res, next) {
	gateway.clientToken.generate({
	}, function (err, response) {
	  res.render('index', { client_token: response.clientToken})
	});
});

router.post('/checkout', function(req, res, next) {
	var paymentMethodNonce = req.body.nonce
	var amount = req.body.amount;
	console.log(paymentMethodNonce);
	gateway.transaction.sale({
	  amount: amount,
	  paymentMethodNonce: paymentMethodNonce,
	  options: {
	    submitForSettlement: true
	  }
	}, function (err, result) {
	  if (result.success) {
	    console.log(result.transaction.id);
	    res.render('checkout', { transaction: result.transaction});
	  } else if (result.success == false) {
	  	var deepErrors = result.errors.deepErrors();

	  	  for (var i in deepErrors) {
	  	    if (deepErrors.hasOwnProperty(i)) {
	  	      console.log(deepErrors[i].code);
	  	      console.log(deepErrors[i].message);
	  	      console.log(deepErrors[i].attribute);
	  	    }
	  	  }
	  	} else {
	    console.log("Error!");
	    console.log(err);
	  }
	});
});

module.exports = router;
