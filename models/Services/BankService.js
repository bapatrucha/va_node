const request = require('request');
const ErrorHandler = require('../ErrorHandler/ErrorHandler');
const Message = require('../Message');

const web_url = '';

module.exports = {
  checkIfUserPreApproved: function(userId, intent, parameters, cb) {
    console.log("inside checkIfUserPreApproved");
    console.log("pre approval amount: "+parameters.amount);
    var json = {
      "preApprovalAmount": parameters.amount
    };
    console.log("Request JSON", json);

    var options = {
     url: "https://irdva.etforge.com/vap/v1/user/"+userId+"/loan/preapproval/verify",
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     json: json
   };

   request(options, function(error, response, body) {
     if(error) {
       let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
       let messages = [m1];
       cb(messages);
     } else {
       console.log('statusCode:', response && response.statusCode);
       console.log('body:', response && body);
       if(body == undefined) {
         let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
         let messages = [m1];
         cb(messages);
       }else {
         console.log("body is: " + body);
         let result = body;
         /*let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", body.httpResponseCode + " - " + body.userMessage, null);
         let messages = [m1];
         cb(messages);*/
         //if(body == 1)
         cb(result);
       }
     }
   });
  },

  getCreditPaymentAverage: function(userId, cb) {
      console.log("inside getCreditPaymentAverage");
      request("https://irdva.etforge.com/vap/v1/user/"+userId+"/transactions/credit/"+Math.random(),
      function (error, response, body) {
        if(error) {
          let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
          let messages = [m1];
          cb(messages);
        } else {
          console.log('statusCode:', response && response.statusCode);
          //console.log('body:', response && body);
          if(body == undefined) {
            let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
            let messages = [m1];
            cb(messages);
          }else {
            let result = JSON.parse(body);
            console.log("averageCardPayment: "+result.averageCardPayment);
            cb(result.averageCardPayment);
          }
        }
      });
  },

  getUser: function(userId, cb) {
    console.log('Getting user details');
    request("https://irdva.etforge.com/vap/v1/user/" + userId,
    function (error, response, body) {
      if(error) {
        let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
        let messages = [m1];
        cb(messages);
      } else {
        console.log('statusCode:', response && response.statusCode);
        //console.log('body:', response && body);
        if(body == undefined) {
          let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
          let messages = [m1];
          cb(messages);
        }else {
          let result = JSON.parse(body);

          cb(result.users);
        }
      }
    });
  },

  getUserAccounts: function(userId, cb) {
    console.log('Getting user account details');
    request("https://irdva.etforge.com/vap/v1/user/" + userId + "/accounts/"+Math.random(),
    function (error, response, body) {
      if(error) {
        let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
        let messages = [m1];
        cb(messages);
      } else {
        console.log('statusCode:', response && response.statusCode);
        //console.log('body:', response && body);
        if(body == undefined) {
          let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
          let messages = [m1];
          cb(messages);
        }else {
          let result = JSON.parse(body);
          cb(result.accounts);
        }
      }
    });
  },

  getGoalById: function(userId, goalId, cb) {
    console.log("Getting goal by ID");
    request("https://irdva.etforge.com/vap/v1/user/" + userId + "/goals/" + goalId,
    function (error, response, body) {
      if(error) {
        let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
        let messages = [m1];
        cb(messages);
      } else {
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', response && body);
        if(body == undefined) {
          let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
          let messages = [m1];
          cb(messages);
        }else {
          let result = JSON.parse(body);
          /*let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", body.httpResponseCode + " - " + body.userMessage, null);
          let messages = [m1];
          cb(messages);*/
          cb(result.goal);
        }
      }
    });
  },

  applyForCreditCard: function(userId, cb) {
    console.log("inside applyForCreditCard: "+userId);
    var json = {
      "cardNumber": "1234567812345678",
      "type": "Visa",
      "expiryDate": "04/2020",
      "limit": "2000.00",
      "balance": "2000.00"
    };
    console.log("Request JSON", json);

    var options = {
     url: "https://irdva.etforge.com/vap/v1/user/"+userId+"/card",
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     json: json
   };

   request(options, function(error, response, body) {
     if(error) {
       let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
       let messages = [m1];
       cb(messages);
     } else {
       console.log('statusCode:', response && response.statusCode);
       console.log('body:', response && body);
       if(body == undefined) {
         let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
         let messages = [m1];
         cb(messages);
       }else {
         console.log("body is: "+body);
         /*let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", body.httpResponseCode + " - " + body.userMessage, null);
         let messages = [m1];
         cb(messages);*/
         if(body == 1)
         cb(body);
       }
     }
   });
  },

  createGoal: function(userId, goalName, amount, endDate, cb) {
    console.log("Creating a goal");

    var json = {
     "type": goalName,
     "amount": amount,
     "status": "pending",
     "endDate": endDate
   };

   console.log("Request JSON", json);

    var options = {
     url: "https://irdva.etforge.com/vap/v1/user/"+userId+"/goals",
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     json: json
   };

   request(options, function(error, response, body) {
     if(error) {
       let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
       let messages = [m1];
       cb(messages);
     } else {
       console.log('statusCode:', response && response.statusCode);
       //console.log('body:', response && body);
       if(body == undefined) {
         let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
         let messages = [m1];
         cb(messages);
       }else {
         //console.log("body is: "+body+" body.goal: "+body.goal);
         /*let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", body.httpResponseCode + " - " + body.userMessage, null);
         let messages = [m1];
         cb(messages);*/
         cb(body.goal[0]);
       }
     }
   });
  },

  getExpenses: function(userId, cb) {
    request("https://irdva.etforge.com/vap/v1/user/" + userId + "/transactions/expenses/"+Math.random(),
    function (error, response, body) {
      if(error) {
        let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
        let messages = [m1];
        cb(messages);
      } else {
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', response && body);
        if(body == undefined) {
          let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
          let messages = [m1];
          cb(messages);
        }else {
          let result = JSON.parse(body);
          console.log("returning result");
          /*let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", result.httpResponseCode + " - " + result.userMessage, null);
          let messages = [m1];
          cb(messages);*/
          cb(result);
        }
      }
    });
  },

  getSubscriptions: function(userId, cb) {
    request("https://irdva.etforge.com/vap/v1/user/" + userId + "/subscriptions/" + Math.random(1,4),
    function (error, response, body) {
      if(error) {
        let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
        let messages = [m1];
        cb(messages);
      } else {
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', response && body);
        if(body == undefined) {
          let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
          let messages = [m1];
          cb(messages);
        }else {
          let result = JSON.parse(body);
          /*let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", result.httpResponseCode + " - " + result.userMessage, null);
          let messages = [m1];
          cb(messages);*/
          cb(result);
        }
      }
    });
  },

  cancelSubscriptions: function(userId, subscriptions, cb) {
    console.log("Cancelling subscriptions");
    var json = {
     "subscriptions" : subscriptions
    };
    console.log("JSON", json);
    var options = {
     url: "https://irdva.etforge.com/vap/v1/user/" + userId + "/subscriptions/cancel",
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     json: json
   };

    request(options,
    function (error, response, body) {
      if(error) {
        let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
        let messages = [m1];
        cb(messages);
      } else {
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', response && body);
        if(body == undefined) {
          let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
          let messages = [m1];
          cb(messages);
        }else {
          let result = body;
          console.log(result);
          /*let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", result.httpResponseCode + " - " + result.userMessage, null);
          let messages = [m1];
          cb(messages);*/
          cb(result);
        }
      }
    });
  },

  getTransactions: function(userId, cb) {
    request("https://irdva.etforge.com/vap/v1/user/" + userId + "/transactions",
    function (error, response, body) {
      if(error) {
        var errorDetails = ErrorHandler.createErrorDetails("WF Server Issue", error.code, error.message);
        cb(errorDetails);
      }
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', response && body);
      if(body == undefined) {
        console.log("Server connectivity issue");
        var errorDetails = ErrorHandler.createErrorDetails("WF Server connectivity issue", "500", "Could not get user's transactions");
        cb(errorDetails);
      }else {
        let result = JSON.parse(body);
        cb(result.TRANSACTIONS);
      }
    });
  },

  getTransactionsByCategory: function(userId, cb) {
    request("https://irdva.etforge.com/vap/v1/user/" + userId + "/transactions/splitup/" + Math.random(0,2),
    function (error, response, body) {
      if(error) {
        console.log("A WF Server error occurred", error);
        let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
        let messages = [m1];
        cb(messages);
      } else {
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', response && body);
        if(body == undefined) {
          let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
          let messages = [m1];
          cb(messages);
        }else {
          let result = [JSON.parse(body)];
          console.log("result: "+result);
          console.log("here. code: "+result.httpResponseCode);
          /*let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", result.httpResponseCode + " - " + result.userMessage, null);
          let messages = [m1];
          cb(messages);*/
          cb(result);
        }
      }

    });
  },

  getCreditCardOffers: function(userId, cb) {
    request("https://irdva.etforge.com/vap/v1/products",
    function (error, response, body) {
      if(error) {
        let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
        let messages = [m1];
        cb(messages);
      } else {
        console.log('statusCode:', response && response.statusCode);
        if(body == undefined) {
          let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", error.code + " - " + error.message, null);
          let messages = [m1];
          cb(messages);
        }else {
          let result = JSON.parse(body);
          /*let m1 = Message.formatMessageResponse("WF_SERVER_ISSUE", result.httpResponseCode + " - " + result.userMessage, null);
          let messages = [m1];
          cb(messages);*/
          cb(result.products);
        }
      }
    });
  }
}
