const request = require('request');
const ErrorHandler = require('../ErrorHandler/ErrorHandler');
const Message = require('../Message');

const web_url = '';

module.exports = {
  getCityByZipCode: function(parameters, cb) {
    console.log("inside getCityByZipCode");
    console.log("zip code: "+parameters.zipcode);
    request("http://maps.googleapis.com/maps/api/geocode/json?address="+parameters.zipcode+"&sensor=true",
    //request("https://irdva.etforge.com/vap/v1/user/"+userId+"/transactions/credit/"+Math.random(),
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
          //console.log("result: " + result.results[0].address_components);
          cb(result);
          //console.log("averageCardPayment: "+result.averageCardPayment);

        }
      }
    });
  }
}
