const request = require('request');

const BankService = require('../Services/BankService');
const Message = require('../Message');

module.exports = {
  applyForCreditCard: function(userId, intent, parameters, cb) {
    console.log("userId: "+userId);
      BankService.applyForCreditCard(userId, function(result) {
        if(result == 1) {
          let m1 = Message.formatMessageResponse(intent, "Congratulations! Your credit card application was successful.", null);
          let m2 = Message.formatMessageResponse(intent, "Your physical card will come in the mail in 5 to 10 business working days.", null);

          let result = [m1, m2];

          cb(result);
        }
      });
  },

  getCreditCardOffersNew: function(userId, intent, parameters, cb) {
    BankService.getCreditCardOffers(userId, function(result) {
      if(result[0].intent == undefined) {
        console.log("apr: "+result[0].apr);
        let t1 = {"text": "The Wells Fargo Cash Wise Card gives you cash rewards on purchases and has no annual fee."};
        let text = [t1];
        let m1DataObj = {
          inline: {
            type: "WIDGET",
            Content: {
              header: "Credit Card Offer",
              title: result[0].apr + "% APR",
              description: "No annual fee",
              backgroundImgPath: "widget-background-credit-card"
            }
          },
          details: {
              type: "wIDGET",
              Content: {
                header: "Credit Card Offer",
                backgroundImgPath: "widget-background-credit-card",
                description: text
              },
              data: {
                type: "IMAGE",
                values: result
              },
              BUTTONS: [
                {
                  title: "Apply Now",
                  payload: "confirm cash wise credit card application"
                },
                {
                  title: "Maybe Later",
                  payload: "cancel"
                }
              ]
          }
        /*  type: "WIDGET",
          data: {
            type: "CREDIT_CARD_OFFERS_CARD",
            header: "Credit Card Offer",
            values: result,
            payload: "I want to apply for the cash wise credit card",
            details: {
              messages: [],
              BUTTONS: [
                {
                  title: "Apply Now",
                  payload: "confirm cash wise credit card application"
                },
                {
                  title: "Maybe Later",
                  payload: "cancel"
                }
              ]
            }
          }*/
        };


        let m1 = Message.formatMessageResponse(intent, "The Wells Fargo Cash Wise Card gives you cash rewards on purchases and has no annual fee.", null);
        let m2 = Message.formatMessageResponse(intent, "It also has the lowest possible intro APR on purchases and balance transfers for 12 months", null);
        let m3 = Message.formatMessageResponse(intent, "If you're interested, here are more details", m1DataObj);

        let messages = [m1, m2, m3];

        cb(messages);
      } else {
        console.log("intent is: "+result[0].intent);
        cb(result);
      }

    });
  },

  getCreditCardOffers: function(userId, intent, parameters, cb) {
    BankService.getCreditCardOffers(userId, function(result) {
      if(result[0].intent == undefined) {
        let m1DataObj = {
          type: "WIDGET",
          data: {
            type: "CREDIT_CARD_OFFERS_CARD",
            header: "Credit Card Offer",
            values: result,
            payload: "I want to apply for the cash wise credit card",
            details: {
              messages: [],
              BUTTONS: [
                {
                  title: "Apply Now",
                  payload: "confirm cash wise credit card application"
                },
                {
                  title: "Maybe Later",
                  payload: "cancel"
                }
              ]
            }
          }
        };


        let m1 = Message.formatMessageResponse(intent, "The Wells Fargo Cash Wise Card gives you cash rewards on purchases and has no annual fee.", null);
        let m2 = Message.formatMessageResponse(intent, "It also has the lowest possible intro APR on purchases and balance transfers for 12 months", null);
        let m3 = Message.formatMessageResponse(intent, "If you're interested, here are more details", m1DataObj);

        let messages = [m1, m2, m3];

        cb(messages);
      } else {
        console.log("intent is: "+result[0].intent);
        cb(result);
      }

    });
  },

  handleCreditCardApplication: function(intent, parameters, cb) {
    let m3DataObj = {
      type: "BUTTONS",
      data: {
        BUTTONS: [
          {
            title: "Yes",
            payload: "confirm cash wise credit card application"
          },
          {
            title: "No",
            payload: "confirm cash wise credit card application"
          }
        ]
      }
    };

    let m1 = Message.formatMessageResponse(intent, "There is a Promotion for $200 cash rewards if you spend $1,000 in the first 3 months.", null);
    let m2 = Message.formatMessageResponse(intent, "With your usual spending, you will qualify for this reward", null);
    let m3 = Message.formatMessageResponse(intent,"Are you interested in applying?", m3DataObj);

    let messages = [m1, m2, m3];

    cb(messages);
  },

  handleDemoCCApplicationConfirmation: function(intent, parameters, cb) {
    let m1 = Message.formatMessageResponse(intent, "Great! You are approved!", null);
    let m2 = Message.formatMessageResponse(intent, "I've just added your digital card to your Wells Fargo wallet.", null);
    let m3 = Message.formatMessageResponse(intent, "Your physical cards will come in the mail in 3 to 5 business working days.", null);

    let result = [m1, m2, m3];

    cb(result);
  },

  handleCreditScoreIncrease: function(intent, parameters, cb) {
    let m1DataObj = { type: "WIDGET", data: {type: "BalloonsAnimation"}};
    let m2DataObj = { type: "WIDGET", data: {type: "CreditScoreCard"}};
    let m5DataObj = {
      type: "BUTTONS",
      data: {
        BUTTONS: [
          {
            title: "Tell me more",
            payload: "Tell me about getting a new credit card"
          },
          {
            title: "Not Interested",
            payload: "Not interested in getting a new credit card"
          }
        ]
      }
    };

    let m1 = Message.formatMessageResponse(intent, "Congratulations!!", m1DataObj);
    let m2 = Message.formatMessageResponse(intent, "Your credit score went up to " + parameters.number, m2DataObj);
    let m3 = Message.formatMessageResponse(intent, "You are currently using a Secured Credit Card.", null);
    let m4 = Message.formatMessageResponse(
      intent,
      "With your increase in credit, you qualify for a card with a lower interest rate and better perks.",
      null
    );
    let m5 = Message.formatMessageResponse(intent, "You are currently using a Secured Credit Card.", m5DataObj);

    let result = [m1, m2, m3, m4, m5];

    cb(result);
  }
}
