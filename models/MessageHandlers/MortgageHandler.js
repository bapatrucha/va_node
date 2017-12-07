const request = require('request');

const BankService = require('../Services/BankService');
const ExternalService = require('../Services/ExternalService');
const Message = require('../Message');

module.exports = {
  submitPreapproval: function(userId, intent, parameters, cb) {
    let m1 = Message.formatMessageResponse(intent, "Perfect!", null);
    let m2 = Message.formatMessageResponse(intent, "You are approved for TBD mortgage", null);

    let result = [m1, m2];

    cb(result);
  },

  savePreapprovalAmount: function(userId, intent, parameters, cb) {
      let m1 = Message.formatMessageResponse(intent, "What is the amount that you are looking to get pre approved for?", null);
      let result = [m1];

      cb(result);
  },

  sendPreApprovalUserConfirmation: function(userId, intent, parameters, cb) {
      console.log("inside askForUserConfirmation");
      BankService.checkIfUserPreApproved(userId, intent, parameters, function(result) {
        console.log("is user preapproved? "+result.canPreApprove);
        let m1, m2, m3, messages;

        if(result.canPreApprove) {
          m1 = Message.formatMessageResponse(intent, "Thank you for your patience.", null);
          m2 = Message.formatMessageResponse(intent, "Good news. You are approved for a $" + parameters.amount+ " mortgage", null);
          m3 = Message.formatMessageResponse(intent, "One of our mortgage brokers will be in touch shortly to finalize some details.", null);
          messages = [m1, m2, m3];
        } else {
          let m1 = Message.formatMessageResponse(
            intent, "I'm sorry. We cannot pre-approve you at this time. Please consider changing your pre-approval amount and try again later", null);
          messages = [m1];
        }

        cb(messages);
      });
  },

  checkAssets: function(userId, intent, parameters, cb) {
      console.log("inside checkAssets");
      let dataObj = {
        type: "BUTTONS",
        data: {
          BUTTONS: [
            {
              title: "Retirement accounts",
              payload: "Retirement accounts"
            },
            {
              title: "Stocks and Bonds",
              payload: "stocks and bonds"
            },
            {
              title: "Gifts from relative",
              payload: "Gifts from relative"
            },
            {
              title: "Other",
              payload: "other"
            },
            {
              title: "No Assets",
              payload: "no assets"
            }
          ]
        }
      };
      let m1 = Message.formatMessageResponse(intent, "What other assets do you have available? ", dataObj);
      let result = [m1];

      cb(result);
  },

  checkRealEstateAgent: function(userId, intent, parameters, cb){
      console.log("inside checkRealEstateAgent");
      let dataObj = {
        type: "BUTTONS",
        data: {
          BUTTONS: [
            {
              title: "Yes",
              payload: "yes"
            },
            {
              title: "No",
              payload: "no"
            }
          ]
        }
      };
      let m1 = Message.formatMessageResponse(intent, "Are you working with a real estate agent? ", dataObj);
      let result = [m1];

      cb(result);
  },

  saveTitleOwner: function(userId, intent, parameters, cb) {
      console.log("inside saveTitleOwner");
      let dataObj = {
        type: "BUTTONS",
        data: {
          BUTTONS: [
            {
              title: "Yes",
              payload: "yes"
            },
            {
              title: "No",
              payload: "no"
            }
          ]
        }
      };
      let m1 = Message.formatMessageResponse(intent, "Will there be someone else on the title? ", dataObj);
      let result = [m1];

      cb(result);
  },

  checkForOtherIncome: function(userId, intent, parameters, cb) {
      console.log("inside checkForOtherIncome");
      let dataObj = {
        type: "BUTTONS",
        data: {
          BUTTONS: [
            {
              title: "Yes",
              payload: "yes"
            },
            {
              title: "No",
              payload: "no"
            }
          ]
        }
      };
      let m1 = Message.formatMessageResponse(intent, "Do you have other forms of income outside of your W-2? ", dataObj);
      let result = [m1];

      cb(result);
  },

  doSoftCreditCheck: function(userId, intent, parameters, cb) {
      console.log("inside doSoftCreditCheck");
      let dataObj = {
        type: "BUTTONS",
        data: {
          BUTTONS: [
            {
              title: "Confirm",
              payload: "confirm"
            },
            {
              title: "Not now",
              payload: "No"
            }
          ]
        }
      };
      let m1 = Message.formatMessageResponse(intent, "Excellent! As a part of pre approval process, we would need to run a soft credit check for you.", null);
      let m2 = Message.formatMessageResponse(intent, "This won't affect your credit score in any way.", null);
      let m3 = Message.formatMessageResponse(intent, "We'll need this information to provide you with accurate loan recommendations.", null);
      let m4 = Message.formatMessageResponse(intent, "Could you please confirm?", dataObj);
      let result = [m1, m2, m3, m4];

      cb(result);
  },

  getPropertyTyoe: function(userId, intent, parameters, cb) {
      console.log("inside getPropertyTyoe");
      let messageObj = {
        type: "LIST",
        payload: "",
        data: {
          header: "Property Type",
          options: [
              {
                title: "Single Family",
                payload: "single family",
                img: "options-icon-single-family"
              },
              {
                title: "Condo/Townhouse",
                payload: "condo",
                img: "options-icon-condo"
              },
              {
                title: "2 to 4 Units",
                payload: "units",
                img: "options-icon-units"
              }
            ]
        }
      };
      /*let dataObj = {
        type: "BUTTONS",
        data: {
          BUTTONS: [
            {
              title: "Single Family",
              payload: "single family"
            },
            {
              title: "Condo/Townhouse",
              payload: "condo"
            },
            {
              title: "2 to 4 Units",
              payload: "units"
            }
          ]
        }
      };*/

      let m1 = Message.formatMessageResponse(intent, "Great! What kind of property are you looking for?", messageObj);
      //let m2 = Message.formatMessageResponse(intent, "What do you plan on doing with your new home?", dataObj);

      let result = [m1];

      cb(result);
  },

  getFirstTimeBuyMessage: function(userId, intent, parameters, cb) {
    console.log("zipcode: "+parameters.zipcode);
    ExternalService.getCityByZipCode(parameters, function(result) {
      let city = "";
      if(result.results && result.results[0]) {
        city = result.results[0].address_components[1].long_name;
      } else {
        city = "San Francisco";
      }

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

      let m1 = Message.formatMessageResponse(intent, city+", That's exciting!!", null);
      let m2 = Message.formatMessageResponse(intent, "What do you plan on doing with your new home?", messageObj);

      let messages = [m1, m2];

      cb(messages);
    });

  },

  getHomeUseMessage: function(userId, intent, parameters, cb) {
    let dataObj = {
      type: "BUTTONS",
      data: {
        BUTTONS: [
          {
            title: "Yes",
            payload: "yes"
          },
          {
            title: "No",
            payload: "no"
          }
        ]
      }
    }

    let m1 = Message.formatMessageResponse(intent, "Your soft credit check went through successfully. Let's go through few more questions to complete pre approval process.", null);
    let m2 = Message.formatMessageResponse(intent, "Have you (or your spouse) served in the US military?", dataObj);

    let result = [m1, m2];

    cb(result);
  },

  startPreApproval: function(intent, parameters, cb) {
    console.log("inside startPreApproval");
    let m1 = Message.formatMessageResponse(intent, "Great! Let's get started", null);
    let m2 = Message.formatMessageResponse(intent, "I have a few short questions for you.", null);

    /*let dataObj = {
      type: "BUTTONS",
      data: {
        BUTTONS: [
          {
            title: "Yes",
            payload: "yes"
          },
          {
            title: "No",
            payload: "no"
          }
        ]
      }
    }*/

    //let m3 = Message.formatMessageResponse(intent, "Is this your first time buying a home?", dataObj);
    let m3 = Message.formatMessageResponse(intent, "What is the zip code where you're looking to buy a house?", null);

    let result = [m1, m2, m3];
    console.log(result);
    cb(result);
  },

  saveZipcode: function(userId, intent, parameters, cb) {
      // call some third party api and get the city based on the zipcode
      console.log("zipcode: "+parameters.zipcode);

      let m1 = Message.formatMessageResponse(intent, "Oh, San Francisco!! Great.", null);

  },

  getConfirmPreApprovalMessage: function(intent, parameters, cb) {
    let m1 = Message.formatMessageResponse(intent, "Good news!", null);
    let m2 = Message.formatMessageResponse(intent, "You've been pre-approved. I've sent you a confirmation email.", null);
    let m3 = Message.formatMessageResponse(intent, "One of our mortgage brokers will contact you shortly.", null);

    let result = [m1, m2, m3];

    cb(result);
  },

  getPreApprovalSuggestion: function(intent, parameters, cb) {
    let m1 = Message.formatMessageResponse(intent, "Congratulations on completing your savings goal!", null);

    let dataObj = {
      type: "BUTTONS",
      data: {
        BUTTONS: [
          {
            title: "Start pre-approval",
            payload: "Start pre-approval",
            primary: true
          },
          {
            title: "Maybe later",
            payload: "cancel",
            primary: false
          }
        ]
      }
    };

    let m2 = Message.formatMessageResponse(intent, "Do you want to start the pre-approval process?", dataObj);

    let result = [m1, m2];

    cb(result);
  },
};
