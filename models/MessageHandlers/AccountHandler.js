const request = require('request');

const BankService = require('../Services/BankService');
const Message = require('../Message');

module.exports = {
  getAccountBalance: function(userId, intent, cb) {
    BankService.getUserAccounts(userId, function(accounts) {
      let accountMsg = "";
      for(i = 0; i < accounts.length; i++) {
        let accNum  = accounts[i].ACCOUNT_NUMBER;
        accNum = "#" + accNum.substr(accNum.length - 4, accNum.length);
        accountMsg += accounts[i].ACCOUNT_TYPE + " " + accNum + ": $" + accounts[i].BALANCE + ". ";
      }

      let m1 = Message.formatMessageResponse(intent,
        "Sure, here is your current account summary: " + accountMsg,
        null);

      let result = [m1];

      cb(result);
    });
  },
};
