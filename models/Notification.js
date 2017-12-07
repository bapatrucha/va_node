const apn = require('apn');

var apnProvider = new apn.Provider();

module.exports = {
  sendPush: function(deviceToken, cb) {
  	var note = new apn.Notification();
  	note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  	note.badge = 10;
  	note.alert = "\uD83D\uDCE7 \u2709 BREAKING: David is incredibly talented";
  	note.payload = {'messageFrom': 'Virtual Assistant'};
    note.action = "View";
  	note.topic = 'com.wells.virtualAssistantProject';
  	apnProvider.send(note, deviceToken).then( (result) => {
        console.log(result);
    		// see documentation for an explanation of result
    		cb('sendPush --> result: ' + JSON.stringify(result))
  	});
  },

  sendPushNotification: function(deviceToken, message, cb) {
    var note = new apn.Notification();
    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = message.priority;
    note.contentAvailable = 1;
    note.title = message.title;
    note.body = message.body;
    note.payload = {'messageFrom': 'Virtual Assistant'};
    note.action = message.buttons[0].action;
    note.topic = 'com.wells.virtualAssistantProject';
    apnProvider.send(note, deviceToken).then( (result) => {
        console.log(result);
        //console.log(result.failed[0].response);
        if(result.failed.length === 0) {
          cb({result: "notification sent successfully", error: null});
        } else {
          cb({result: "", error: "an error occurred: " + result.failed[0].status});
        }
        // see documentation for an explanation of result
        //cb('sendPush --> result: ' + JSON.stringify(result))
    });
  }
}
