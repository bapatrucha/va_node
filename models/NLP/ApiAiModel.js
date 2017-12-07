const apiai = require('apiai');
const uuid = require('node-uuid');

const Intents = require('../Intents');
const IntentHandler = require('../IntentMapper');

const Message = require('../Message');

//var apiAiService = apiai("ace60c3e1c1941b39845d332aac48ede"); // PROD Key
//var apiAiService = apiai("66c14863c858470cb306d2ae279c5726"); // DEV Key
var apiAiService = apiai("ace60c3e1c1941b39845d332aac48ede"); // TEST Key

const sessionIds = new Map();

const processTextMessage = function(userId, message, sessionId, cb) {

  if(!sessionId) {
    console.log("Session ID not sent");
    sessionId = "test";
  }

  if(!sessionIds.has(sessionId)) {
    sessionIds.set(sessionId, uuid.v1());
  }

  let request = apiAiService.textRequest(message, {
    sessionId: sessionIds.get(sessionId)
  });

  request.on('response', function(response) {
    //console.log(response);
    let intent      = response.result.metadata.intentName;
    let fulfillment = response.result.metadata.fulfillment;
    let parameters  = response.result.parameters;
    let speechResponse = response.result.fulfillment.speech;
    let context = null;

    if(response.result.contexts[0]) {
      context = response.result.contexts[0].parameters;
    }

    console.log("parameters", parameters);

    let options = {
      userId : userId,
      intent : intent,
      parameters : parameters,
      context : context
    };

    console.log("Msg Options", options);
    // check to see if parameters are required
    if(speechResponse != '') {
      console.log("Parsing Message for ", intent);
      Message.parseMessage(intent, speechResponse, function(result) {
        cb(result);
      });
      return;
    } else {
      IntentHandler.processIntent(userId, intent, parameters, context, function(result) {
        cb(result);
      });
    }
  });

  request.on('error', function(error) {
    console.log("API.ai error", error);
    cb("An error occurred", error);
  });

  request.end();
}


exports.processTextMessage = processTextMessage;
