const Intents = require('./Intents');

const SubscriptionHandler = require('./MessageHandlers/SubscriptionHandler');
const CreditCardHandler = require('./MessageHandlers/CreditCardHandler');
const ExpensesHandler = require('./MessageHandlers/ExpensesHandler');
const CommonHandler = require('./MessageHandlers/CommonHandler');
const GoalHandler = require('./MessageHandlers/GoalHandler');
const AccountHandler = require('./MessageHandlers/AccountHandler');
const MortgageHandler = require('./MessageHandlers/MortgageHandler');

module.exports = {
  // returns an array of messages
  processIntent: function(userId, intent, parameters, context, cb) {

    console.log("Processing intent: " + intent);
    console.log("Context: ", context);

    switch(intent) {
      case Intents.GREETING:
        CommonHandler.getGreetingMessage(intent, function(result) {
          cb(result);
        });
      break;
      case Intents.ORDER_COFFEE_SUGGESTION:
        CommonHandler.getOrderCoffeeMessage(intent, function(result) {
          cb(result);
        });
        break;
      case Intents.PLACE_ORDER:
        CommonHandler.placeOrderMessage(intent, function(result) {
          cb(result);
        });
        break;
      case Intents.GOODBYE:
        CommonHandler.getGoodbyeMessage(intent, function(result) {
          cb(result);
        });
      break;
      case Intents.HELP:
        CommonHandler.getHelpMessage(intent, function(result) {
          cb(result);
        });
      break;
      case Intents.THANKS:
        CommonHandler.getThanksMessage(intent, function(result) {
          cb(result);
        });
      break;
      case Intents.LOGOUT:
        CommonHandler.logOutUser(intent, function(result) {
          cb(result);
        });
      break;
      case Intents.DO_SOMETHING_ELSE:
        CommonHandler.getDoSomethingMessage(intent, function(result) {
          cb(result);
        });
      break;
      case Intents.GET_BALANCE:
        AccountHandler.getAccountBalance(userId, intent, function(result) {
          cb(result);
        });
      break;
      case Intents.DEMO_CREDIT_SCORE_INCREASE:
        CreditCardHandler.handleCreditScoreIncrease(intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.DEMO_SAVE_MONEY:
        CreditCardHandler.getCreditCardOffers(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.SUGGEST_SUBSCRIPTION_MANAGEMENT:
        SubscriptionHandler.getSubscriptionSuggestions(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.DEMO_MANAGE_SUBSCRIPTIONS:
        SubscriptionHandler.getUserSubscriptions(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.MANAGE_MY_SUBSCRIPTIONS:
        SubscriptionHandler.getUserSubscriptions(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.CANCEL_SUBSCRIPTIONS:
        SubscriptionHandler.cancelSubscriptions(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.DEMO_SAVING_SUGGESTIONS:
        SubscriptionHandler.getSavingSuggestions(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.CREATE_A_GOAL:
        GoalHandler.completeGoalSetUp(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.CREATE_A_GOAL_DATE:
        GoalHandler.completeGoalSetUp(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.CREATE_INDEPENDENCE_GOAL:
        GoalHandler.completeGoalSetUp(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.ANALYSE_MOVING_OUT:
        GoalHandler.getGoalAnalysis(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.FINANCIAL_INDEPENDENCE_YES:
        GoalHandler.getGoalSuggestions(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.FINANCIAL_INDEPENDENCE_NO:
        CommonHandler.getDoSomethingMessage(intent, function(result) {
          cb(result);
        });
      break;
      case Intents.SUGGEST_FINANCIAL_INDEPENDENCE:
        GoalHandler.setUpSavingsGoal(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.TEST:
        CreditCardHandler.getCreditCardOffersNew(userId, intent, parameters, function(result) {
          cb(result);
        });
        /*CommonHandler.handleTest(intent, parameters, function(result) {
          cb(result);
        });*/
        break;
      case Intents.DEMO_CREDIT_CARD_OFFERS:
        CreditCardHandler.getCreditCardOffers(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.SUGGEST_CREDIT_CARD:
        CreditCardHandler.getCreditCardOffers(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.DEMO_SHOW_EXPENSES:
        ExpensesHandler.getUserExpenses(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.DEMO_APPLY_FOR_CC:
        CreditCardHandler.handleCreditCardApplication(intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.DEMO_CC_APPLICATION_CONFIRMATION:
        CreditCardHandler.applyForCreditCard(userId, intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.CONFIRM_PRE_APPROVAL:
        MortgageHandler.getConfirmPreApprovalMessage(intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.SUGGEST_PRE_APPROVAL:
        MortgageHandler.getPreApprovalSuggestion(intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.GET_PRE_APPROVAL:
        console.log("calling startPreApproval");
        MortgageHandler.startPreApproval(intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.GET_PRE_APPROVAL_ZIPCODE:
        MortgageHandler.getFirstTimeBuyMessage(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.GET_PROPERTY_TYPE:
        MortgageHandler.getPropertyTyoe(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.SOFT_CREDIT_CHECK:
        MortgageHandler.doSoftCreditCheck(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.PREAPPROVAL_AMOUNT:
        MortgageHandler.savePreapprovalAmount(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.OTHER_INCOME:
        MortgageHandler.checkForOtherIncome(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.TITLE_OWNER:
        MortgageHandler.saveTitleOwner(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.REAL_ESTATE_AGENT:
        MortgageHandler.checkRealEstateAgent(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.OTHER_ASSETS:
        MortgageHandler.checkAssets(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.CONFIRM_SOFT_CREDIT:
        MortgageHandler.getHomeUseMessage(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.CONFIRM_PREAPPROVAL:
        MortgageHandler.sendPreApprovalUserConfirmation(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.SUBMIT_PREAPPROVAL:
        MortgageHandler.submitPreapproval(userId, intent, parameters, function(result) {
          cb(result);
        });
        break;
      case Intents.FIRST_TIME_BUY:
        MortgageHandler.getFirstTimeBuyMessage(intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.HOME_USE:
        MortgageHandler.getHomeUseMessage(intent, parameters, function(result) {
          cb(result);
        });
      break;
      case Intents.MILITARY_SERVICE:
        MortgageHandler.getConfirmPreApprovalMessage(intent, parameters, function(result) {
          cb(result);
        });
      break;
      default:
        CommonHandler.getErrorMessage(intent, function(result) {
          cb(result);
        });
    }
  }
}
