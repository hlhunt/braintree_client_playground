# Braintree Express Example

[![Build Status](https://travis-ci.org/braintree/braintree_express_example.svg?branch=master)](https://travis-ci.org/braintree/braintree_express_example)

An example Braintree integration for Node in the Express framework.

## Setup Instructions

1. Install packages:

   ```sh
   npm install
   ```

2. Copy the contents of `example.env` into a new file named `.env` and fill in your Braintree API credentials. Credentials can be found by navigating to Account > My User > View Authorizations in the Braintree Control Panel. Full instructions can be [found on our support site](https://articles.braintreepayments.com/control-panel/important-gateway-credentials#api-credentials).

3. Start the server:

   ```sh
   npm start
   ```
   
   By default, this runs the app on port `3000`. You can configure the port by setting the environmental variable `PORT`.