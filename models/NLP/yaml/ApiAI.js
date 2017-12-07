const apiai = require('apiai');
const uuid = require('node-uuid');

const ResponseHandler = require('../../MessageHandlers/yaml/ResponseHandler');
const Message = require('../../Message');

var apiAiService = apiai("79688efcfd5643d193e429052f2007e7");

const sessionIds = new Map();

const processTextMessage = function(message, cb) {
  if(!sessionIds.has("TEST")) {
    sessionIds.set("TEST", uuid.v1());
  }

  let request = apiAiService.textRequest(message.message, {
    sessionId: sessionIds.get("TEST")
  });

  request.on('response', function(response) {
    let intent      = response.result.metadata.intentName;
    let fulfillment = response.result.metadata.fulfillment;
    let parameters  = response.result.parameters;
    let speechResponse = response.result.fulfillment.speech;

    console.log("parameters", parameters);

    // check to see if parameters are required
    if(speechResponse != '') {
      let options = {
        intent: intent,
        parameters: parameters,
        userId: message.userId
      }

      ResponseHandler.processIntent(options, function(result) {
        cb(result);
      });
      // console.log("Parsing Message for ", intent);
      // Message.parseMessage(intent, speechResponse, function(result) {
      //   cb(result);
      // });
      return;
    } else {

      let options = {
        intent: intent,
        parameters: parameters,
        userId: message.userId
      }

      ResponseHandler.processIntent(options, function(result) {
        cb(result);
      });
    }
  });

  request.on('error', function(error) {
    cb("An error occurred");
  });

  request.end();
}


exports.processTextMessage = processTextMessage;
