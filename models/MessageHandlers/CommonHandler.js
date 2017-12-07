const request = require('request');

const BankService = require('../Services/BankService');
const Message = require('../Message');

module.exports = {
  handleTest: function(intent, parameters, cb) {
    let messageObj = {
      type: "LIST",
      payload: "",
      data: {
        header: "Property Usage",
        options: [
            {
              title: "Primary Residence",
              payload: "primary residence",
              img: "options-icon-primary-residence"
            },
            {
              title: "Vacation",
              payload: "vacation",
              img: "options-icon-vacation"
            },
            {
              title: "Investment",
              payload: "investment",
              img: "options-icon-investment"
            }
          ]
      }
    };

    let m1 = Message.formatMessageResponse(intent, "What type of home are you interested in?", messageObj);

    let result = [m1];

    cb(result);
  },

  getGreetingMessage: function(intent, cb) {
    let dataObj = {
      type: "BUTTONS",
      data: {
        BUTTONS: [
          {
            title: "Expenses",
            payload: "manage my expenses"
          },
          {
            title: "Help me save",
            payload: "Help me save money"
          },
          {
            title: "Subscriptions",
            payload: "Show me my subscriptions"
          },
          {
            title: "Set a goal",
            payload: "Create a goal"
          }
        ]
      }
    };

    let m1 = Message.formatMessageResponse(
      intent,
      "Hello! Here are some of the things that I can help you with",
      dataObj
    );

    let result = [m1];

    cb(result);
  },

  placeOrderMessage: function(intent, cb){
    let m1 = Message.formatMessageResponse(intent, "I have placed your coffee order.", null);
    let m2 = Message.formatMessageResponse(intent, "You can pick it up at 333 Market Street, San Francisco in 10 minutes.", null);
    let result = [m1, m2];

    cb(result);
  },

  getOrderCoffeeMessage: function(intent, cb){
      let dataObj = {
        type: "BUTTONS",
        data: {
          BUTTONS: [
            {
              title: "Yes",
              payload: "place coffee order for me"
            },
            {
              title: "No",
              payload: "no coffee"
            }
          ]
        }
      };

      let m1 = Message.formatMessageResponse(intent, "Do you want to place your usual coffee order in Starbucks located in 333 Market Street, San Francisco.?", dataObj);
      let result = [m1];
      cb(result);
  },

  getGoodbyeMessage: function(intent, cb) {
    let message = "Until next time.";

    let m1 = Message.formatMessageResponse(intent, message, null);
    let result = [m1];

    cb(result);
  },

  getThanksMessage: function(intent, cb) {
    let message = "No, thank you! Let me know if I can help you with anything else.";

    let m1 = Message.formatMessageResponse(intent, message, null);
    let result = [m1];

    cb(result);
  },

  getHelpMessage: function(intent, cb) {

    let dataObj = {
      type: "BUTTONS",
      data: {
        BUTTONS: [
          {
            title: "Expenses",
            payload: "manage my expenses"
          },
          {
            title: "Help me save",
            payload: "Help me save money"
          },
          {
            title: "Show subscriptions",
            payload: "Show me my subscriptions"
          },
          {
            title: "Set a goal",
            payload: "create a goal"
          }
        ]
      }
    };

    let m1 = Message.formatMessageResponse(
      intent,
      "Here are some of the things that I can help you with",
      dataObj
    );

    let result = [m1];

    cb(result);
  },

  getDoSomethingMessage: function(intent, cb) {
    let dataObj = {
      type: "BUTTONS",
      data: {
        BUTTONS: [
          {
            title: "Expenses",
            payload: "manage my expenses"
          },
          {
            title: "Help me save",
            payload: "Help me save money"
          },
          {
            title: "Subscriptions",
            payload: "Show me my subscriptions"
          },
          {
            title: "Set a goal",
            payload: "create a goal"
          }
        ]
      }
    };

    let m1 = Message.formatMessageResponse(intent, "Is there something else that I can help you with?", dataObj);

    let result = [m1];

    cb(result);
  },

  getErrorMessage: function(intent, cb) {
    let message = "Sorry, I didn't quite get that. I understand " +
    "things like: Manage my expenses";

    let m1 = Message.formatMessageResponse(intent, message, null);
    let result = [m1];

    cb(result);
  },

  logOutUser: function(intent, cb) {
    let dataObj = {
      type: "NAVIGATION",
      data: {
        view: "LoginController"
      }
    };

    let m1 = Message.formatMessageResponse(intent, "Sure, logging out", dataObj);

    let result = [m1];

    cb(result);
  }

};
