yaml = require('js-yaml');
fs   = require('fs');

const CommonHandler = require('./CommonHandler');
const CustomerOffersHandler = require('./CustomerOffersHandler');
const ExpenseHandler = require('./ExpenseHandler');
const SubscriptionHandler = require('./SubscriptionHandler');
const ErrorHandler = require('./ErrorHandler');

const {
  GREETING,
  DEMO_SAVE_MONEY,
  DEMO_SHOW_EXPENSES,
  DEMO_MANAGE_SUBSCRIPTIONS,
  DEMO_DO_SOMETHING_ELSE
} = require('../../Intents');

module.exports = {
  processIntent: function(options, cb) {
    console.log("Processing intent: " + options.intent);

    switch(options.intent) {
      case GREETING:
        CommonHandler.handleGreeting(options, function(result) {
          cb(result);
        });
      break;
      case DEMO_SAVE_MONEY:
        CustomerOffersHandler.handleCreditCardOffers(options, function(result) {
          cb(result);
        });
      break;
      case DEMO_SHOW_EXPENSES:
        ExpenseHandler.handleManageExpenses(options, function(result) {
          cb(result);
        });
      break;
      case DEMO_MANAGE_SUBSCRIPTIONS:
        SubscriptionHandler.handleManageSubscriptions(options, function(result) {
          cb(result);
        });
      break;
      case DEMO_DO_SOMETHING_ELSE:
        CommonHandler.handleDoSomethingElse(options, function(result) {
          cb(result);
        });
      break;
      default:
        console.log("Something broke");
        ErrorHandler.handleError(options, function(result) {
          cb(result);
        });
    }
  }
};
