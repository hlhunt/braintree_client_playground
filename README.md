<<<<<<< HEAD
# Braintree Payment Method Playground
=======
# Braintree Client-side Playground

The purpose of this repository is to showcase the various payment method options offered through the Braintree SDKs. If you'd like to learn more about Braintree's product offerings and features, I would recommend visting their [marketing website](https://www.braintreepayments.com/), [developer documentation](https://developers.braintreepayments.com/), and [support articles](https://articles.braintreepayments.com/).
>>>>>>> 46d9da37b132ad6f88dd4e50f6eb781c45d3f98e

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
   
<<<<<<< HEAD
   By default, this runs the app on port `3000` (i.e. `localhost:3000`. You can configure the port by setting the environmental variable `PORT`.
=======
   By default, this runs the app on port `3000` (i.e. `localhost:3000`. You can configure the port by setting the environmental variable `PORT`.

4. Once on the home page, you can choose to go to each of the various features listed:
   * [Hosted Fields Checkout UI](https://developers.braintreepayments.com/guides/hosted-fields/overview/javascript/v3)
   * [Drop-in UI Checkout UI](https://developers.braintreepayments.com/guides/drop-in/overview/javascript/v3)
   * [ACH Direct Debit](https://developers.braintreepayments.com/guides/ach/overview)
   * [Transaction Search API (i.e. `transaction.search`)](https://developers.braintreepayments.com/reference/request/transaction/search/node)

*If you need testing values for the checkout forms, please reference the relevant testing documentation on the [Testing](https://developers.braintreepayments.com/reference/general/testing/node) and [ACH Direct Debit Testing Developer Documentation](https://developers.braintreepayments.com/guides/ach/testing-go-live).*
>>>>>>> 46d9da37b132ad6f88dd4e50f6eb781c45d3f98e
