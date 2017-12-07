const request = require('request');

const BankService = require('../Services/BankService');
const Message = require('../Message');

module.exports = {
  getUserExpenses: function(userId, intent, parameters, cb) {
    BankService.getTransactionsByCategory(userId, function(result) {
      console.log("Result", result);
      if(result[0].intent == undefined) {
        let messageObj = {
          type: "WIDGET",
          data: {
            type: "EXPENSE_BREAKDOWN_CARD",
            header: "Expense Report",
            values: result,
            payload: ""
          }
        };

        let m1 = Message.formatMessageResponse(intent, "Sure, here is a breakdown of your latest expenses.", messageObj);

        let messages = [m1];
        console.log("TRANSACTION DATA", messages);
        cb(messages);
      } else {
        console.log("intent is: "+result[0].intent);
        cb(result);
      }

    });
  }
}
