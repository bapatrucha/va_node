const yaml = require('js-yaml');
const path = require('path');
const fs   = require('fs');
const json2yaml = require('json2yaml');

const BankService = require('../Services/BankService');
const yaml_dir = '/../../yaml/examples';
const Message = require('../Message');
const camelCase = require('camelcase');


module.exports = {
  camelize: function(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  },

  startGoalSetUp: function(userId, intent, parameters, cb) {
    let m1 = Message.formatMessageResponse(intent, "What date would you like to complete this goal by?", null);
    let messages = [m1];

    cb(messages);
  },

  completeGoalSetUp: function(userId, intent, parameters, cb) {
    console.log("goal params: ", parameters);
    let date = '';
    if(parameters.endPeriod) {
      date = parameters.endPeriod;
    } else {
      date = parameters.endDate;
    }
    let amount = parseFloat(parameters.dollar);

    console.log("endDate: " + date);
    BankService.createGoal(userId, parameters.goalName, amount,
      date, function(result) {
      if(result[0] == undefined) {
        console.log("goal created, now calling getGoalById "+result);
        console.log("goal: " + parameters.goalName);
        var str = parameters.goalName;
        var header = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        console.log("goal name: "+header);
        let m1DataObj = {
          type: "WIDGET",
          data: {
            type: "GOAL_CARD",
            header: header + " Goal",
            values: result,
            payload: ""
          }
        };
        let m1 = Message.formatMessageResponse(intent, "Done! I just set up your savings goal.", m1DataObj);

        let messages = [m1];

        cb(messages);
      } else {
        cb(result);
      }

    });
  },

  getGoalAnalysis: function(userId, intent, parameters, cb) {
    var expense, savings;
    console.log("Rent: " + parameters.targetRent);

    BankService.getExpenses(userId, function(result) {
      console.log("EXPENSES:");
      console.log(result);
      result.rent = parameters.targetRent;
      var rent = result.rent;
      var utilities = result.utilities;
      var expenses = result.expenses;
      for(var eachExpense in expenses){
        console.log(expenses[eachExpense].projected);
        if(expenses[eachExpense].projected == true) {
          console.log("expense: "+expenses[eachExpense].expense);
          console.log("savings: "+expenses[eachExpense].savings);
          expense = expenses[eachExpense].expense;
          savings = expenses[eachExpense].savings;
        }
      }

      var goalAmount = parseFloat(parameters.targetRent) + parseFloat(result.food) + parseFloat(result.transportation) + parseFloat(result.utilities);
      console.log("Goal Amount" + goalAmount);
      console.log("expense: "+expense+" savings: "+savings);

      let rentMessage = "";

      let t1 = {"text": 'Rent: $'+rent+' p/m'};
      let t2 = {"text": "Utilities Estimate: $"+utilities+" p/m"};
      //let t3 = {"text": expenseMsg};
      let t4 = {"text": "Estimate Completion Time: 2 months"};

      let messages = [t1, t2, t4];

      let messageObj = {
        type: "WIDGET",
        payload: "",
        data: {
          type: "SUGGESTION",
          header: "Goal Suggestion",
          values: result,
          details: {
            messages: messages,
            BUTTONS: [
              {
                title: "Start this goal",
                payload: "start a goal called moving out of $" +  Math.floor(goalAmount) + " for user 12 to December 12th"
              },
              {
                title: "Maybe later",
                payload: "cancel"
              }
            ]
          }
        }
      };

      let m4 = Message.formatMessageResponse(intent, "Excellent! Let me do some analysis to help achieve your moving out goal", null);
      let m5 = Message.formatMessageResponse(intent, "OK. I've completed my analysis. I estimate that you will need to save $" + Math.floor(goalAmount) + " before you can move out.", null);;
      // let m6 = Message.formatMessageResponse(intent, "Based on your current spending history, this goal would take 2 months to complete.", null);;
      let m7 = Message.formatMessageResponse(intent, "Here's a plan that I've made to help you move into your own place.", messageObj);

      let finalMessages = [m4, m5, m7];

      cb(finalMessages);
    });

  },

  getGoalSuggestions: function(userId, intent, parameters, cb) {
    let m1DataObj = {
      type: "BUTTONS",
      data: {
        BUTTONS: [
          {
            title: "Moving out",
            payload: "moving out"
          },
          {
            title: "Buy a car",
            payload: "buying a car"
          },
          {
            title: "Vacation",
            payload: "vacation"
          },
          {
            title: "Other",
            payload: "cancel"
          }
        ]
      }
    };
    let m1 = Message.formatMessageResponse(intent, "OK great, what would you like to start saving for?", m1DataObj);
    let messages = [m1];

    cb(messages);
  },

  setUpSavingsGoal: function(userId, intent, parameters, cb) {
    let m4DataObj = {
      type: "BUTTONS",
      data: {
        BUTTONS: [
          {
            title: "Yes",
            payload: "yes",
            primary: true
          },
          {
            title: "No",
            payload: "no",
            primary: false
          }
        ]
      }
    };

    let m1 = Message.formatMessageResponse(intent, "Great job Brad!", null);
    let m3 = Message.formatMessageResponse(intent, "On average, you're saving almost 30% of your paycheck!", null);
    let m4 = Message.formatMessageResponse(intent, "Would you like to setup a goal to help you save even more?", m4DataObj);

    let messages = [m1, m3, m4];

    cb(messages);
  }
}
