var express = require('express');
var router = express.Router();
var braintree = require("braintree");
var gateway = require('../lib/gateway');

// modules for transaction.search
var stream = require('stream');
var readable = require('stream').Readable;
var date = require('date-utils');


function handleErrors(errors) {
	var errString = "";
	for (var i in errors) {
	  if (errors.hasOwnProperty(i)) {
	  	errString = errString + errors[i].code + " - " + errors[i].message + " ";
	  }
	}
	return errString;
}

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/* GET Hosted Fields page. */
router.get('/hosted-fields', function(req, res, next) {
	gateway.clientToken.generate({}, function (err, response) {
	  res.render('hosted-fields', { client_token: response.clientToken, messages: req.flash('error')})
	});
});

/* GET Drop-in UI page. */
router.get('/dropin', function(req, res, next) {
	gateway.clientToken.generate({}, function (err, response) {
	  res.render('dropin', { client_token: response.clientToken, messages: req.flash('error')})
	});
});

/* GET ACH page. */
router.get('/ach', function(req, res, next) {
	gateway.clientToken.generate({}, function (err, response) {
	  res.render('ach', { client_token: response.clientToken, messages: req.flash('error')})
	});
});

/* GET history page. */
router.get('/history', function(req, res, next) {
	// create the read and write streams
	var streambt = gateway.transaction.search(function (search) {
	    search.createdAt().between(Date.today().addMonths(-3),Date(Date.now()));
	});

	streambt.on("ready", function () {
	  console.log(streambt.searchResponse.length());
	});

	var transactions=[];

	// When data is available, add returned transactions to array
	streambt.on("data", function (transaction) {
	  transactions.push(transaction);
	});

	streambt.on("end", function () {
	  res.render('history', { transactions: transactions });
	});
});

router.post('/receipt-page', function(req, res, next) {
	var paymentMethodNonce = req.body.nonce;
	var amount = req.body.amount;
	var firstName = req.body["first-name"];
	var lastName = req.body["last-name"];
	var paymentType = req.body.paymentType; // store what type of payment method is being used for the transaction
	var integrationType = req.body.integrationType; // store whether or not the request was made with the Drop-in UI or Hosted Fields

	// Create a transaction for any payment method type
	function createTransaction(paymentMethod) {
		gateway.transaction.sale({
			amount: amount,
			paymentMethodToken: paymentMethod.token,
			options: {
				submitForSettlement: true
			 }
		}, function (err, result) {
			if (result.success || result.transaction) {
			  res.render('receipt-page', { transaction: result.transaction, success: result.success});
			} else {
				var deepErrors = result.errors.deepErrors();
				req.flash('error', { msg: handleErrors(deepErrors) });
				if (paymentType === "CreditCard") {
					if (integrationType === "dropin") {
						res.redirect('dropin');
					} else {
						res.redirect('hosted-fields');
					}
				} else if (paymentType === "us_bank_account") {
					res.redirect('ach');
				}
			}
		});
	}


	gateway.customer.create({
		firstName: firstName,
		lastName: lastName
	}, function (err, result) {
		if (result !== undefined && result.success) {
			switch(paymentType) {
				case "us_bank_account":
					gateway.paymentMethod.create({
					  customerId: result.customer.id,
					  paymentMethodNonce: paymentMethodNonce,
					  options: {
					    usBankAccountVerificationMethod: braintree.UsBankAccountVerification.VerificationMethod.NetworkCheck
					  }
					}, function (err, result) {
						if (result.success && result.paymentMethod.verified) {
							createTransaction(result.paymentMethod);
						} else if (result.success == false) {
							var deepErrors = result.errors.deepErrors();
							handleErrors(deepErrors);
							req.flash('error', { msg: handleErrors(deepErrors) });
							res.redirect('ach');
						} else {
							console.log("Error!");
							console.log(err.message);
						}
					});
					break;
				case "CreditCard":
					// create payment method for credit cards from either the Drop-in UI or Hosted Fields
					gateway.paymentMethod.create({
					  customerId: result.customer.id,
					  paymentMethodNonce: paymentMethodNonce,
					  options: {
					    verifyCard: true
					  }
					}, function (err, result) {
						if (result.success) {
							createTransaction(result.paymentMethod);
						} else if (result.success == false) {
							var deepErrors = result.errors.deepErrors();
							handleErrors(deepErrors);
							req.flash('error', { msg: handleErrors(deepErrors) });
							if (integrationType === "dropin") {
								res.redirect('dropin');
							} else {
								res.redirect('hosted-fields');
							}
						} else {
							console.log("Error!");
							console.log(err.message);
						}
					});
					break;
			}
		} else if (result !== undefined && result.success == false) {
			var deepErrors = result.errors.deepErrors();
			handleErrors(result.errors.deepErrors());
			req.flash('error', { msg: handleErrors(deepErrors) });
			switch(paymentType) {
				case 'usa_bank_account':
					res.redirect('ach');
					break;
				case 'CreditCard':
					if (integrationType === "dropin") {
						res.redirect('dropin');
					} else {
						res.redirect('hosted-fields');
					}
					break;
				default:
					res.redirect('/');
					console.log(paymentType);
					break;
			}
		} else {
			console.log("Error!");
			console.log(err.message);
		}	
	})
});


module.exports = router;
