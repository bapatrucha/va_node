const request = require('request');

const BankService = require('../Services/BankService');
const Message = require('../Message');

module.exports = {
  getSubscriptionSuggestions(userId, intent, parameters, cb) {
    BankService.getSubscriptions(userId, function(result) {
      console.log("result.length: "+result.subscriptions.length);
      var subscriptions = result.subscriptions;
      var totalSubscriptionAmount = 0;
      for(var i=0;i<subscriptions.length;i++) {
        console.log('eachSubscription amount: ', subscriptions[i].AMOUNT);
        totalSubscriptionAmount = totalSubscriptionAmount + subscriptions[i].AMOUNT;
      }
      console.log("totalSubscriptionAmount: "+totalSubscriptionAmount);
      if(result[0] == undefined) {
        let messageObj = {
          type: "WIDGET",
          data: {
            type: "SUBSCRIPTIONS",
            header: "Subscriptions",
            values:result,
            payload: "",
            details: {
              messages: [],
              BUTTONS: [
                {
                  title: "Cancel Subscriptions",
                  payload: "cancel subscription with IDs: [subscriptionID]"
                }
              ]
            }
          }
        };

        let m1 = Message.formatMessageResponse(
          intent, "I've noticed you are currently spending $"+totalSubscriptionAmount+" on subscriptions each month.", null);

        let m2 = Message.formatMessageResponse(
          intent, "Here is the summary of your current subscriptions", messageObj);

        let messages = [m1, m2];

        cb(messages);
      } else {
        console.log("intent is: "+result[0].intent);
        cb(result);
      }

    });
  },

  cancelSubscriptions(userId, intent, parameters, cb) {
    let subscriptionIds = parameters.number;



    // let m1 = Message.formatMessageResponse(
    //   intent, "OK sure. I've cancelled those subscriptions for you.", null);
    //
    // let messages = [m1];
    //
    // cb(messages);
    BankService.cancelSubscriptions(userId, subscriptionIds, function(result) {
      let m1 = Message.formatMessageResponse(
        intent, "OK sure. I've cancelled those subscriptions for you.", null);

      let messages = [m1];

      cb(messages);
    });
  },

  getSavingSuggestions(userId, intent, parameters, cb) {
    BankService.getCreditPaymentAverage(userId, function(result) {
      console.log("averageCardPayment: "+result);
      let averageCardPayment = result;
      let m2DataObj = {
        type: "BUTTONS",
        data: {
          BUTTONS: [
            {
              title: "Yes",
              payload: "Yes"
            },
            {
              title: "No",
              payload: "No"
            }
          ]
        }
      };
        //let m1 = Message.formatMessageResponse(intent, "Congratulations on getting your own place Brad", null);
        let m2 = Message.formatMessageResponse(intent, "I've noticed your spending has increased significantly lately.", null);
        let m3 = Message.formatMessageResponse(intent, "I see that you are spending $"+averageCardPayment+" on an average on your current credit card.", null);
        let m4 = Message.formatMessageResponse(intent, "Would you like to hear about our new Cash Wise Credit Card which can help you save more?", m2DataObj);

        let messages = [m2, m3, m4];

        cb(messages);
    });
  },

  getUserSubscriptions(userId, intent, parameters, cb) {
    console.log("inside getUserSubscriptions");
    BankService.getSubscriptions(userId, function(result) {
      console.log("result is: "+result);
      if(result[0] == undefined) {
        let messageObj = {
          type: "WIDGET",
          data: {
            type: "SUBSCRIPTIONS",
            header: "Subscriptions",
            values:result,
            payload: "",
            details: {
              messages: [],
              BUTTONS: [
                {
                  title: "Cancel Subscriptions",
                  payload: "cancel subscription with IDs: [subscriptionID]"
                }
              ]
            }
          }
        };

        let m1 = Message.formatMessageResponse(intent, "Sure, here are your current subscriptions", messageObj);

        let messages = [m1];

        cb(messages);
      } else {
        console.log("intent is: "+result[0].intent);
        cb(result);
      }

    });
  }
}
