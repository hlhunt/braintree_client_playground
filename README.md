# API Support Challenge Project

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
   
   By default, this runs the app on port `3000` (i.e. `localhost:3000`. You can configure the port by setting the environmental variable `PORT`.

4. Once on the home page, you can choose to go to the checkout form by selecting 'Checkout', or you can generate a table of the transactions in the last 3 months for your Braintree sandbox by clicking 'Generate'.