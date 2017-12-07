module.exports = {
  parseMessage: function(intent, text, cb) {
    let messages = [];
    let responseObject = null;
    console.log("parsing");
    if(intent == "GET_PRE_APPROVAL") {
      responseObject = {
        type: "Widget",
        data: {
          type: "PreApprovalForm"
        }
      }
    }


    if(text.indexOf('\\n') > -1) {
      let messageArray = text.split("\\n");

      for(m in messageArray) {
        console.log("Substring: " + messageArray[m]);
        if(messageArray[m]) {
          messages.push({
            intent : intent,
            textResponse: messageArray[m],
            responseObj: responseObject
          });
        }
      }
    } else {
      messages.push({
        intent : intent,
        textResponse: text,
        responseObj: responseObject
      });
    }

    cb(messages);
  },

  formatMessageResponse: function(intent, text, dataObj) {
    //let result = {};

    let message = {
      intent : intent,
      textResponse : text,
      responseObj : dataObj
    };

    //result.push(message);

    return message;
  }
}
