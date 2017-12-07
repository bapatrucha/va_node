const request = require('request');

module.exports = {
  getBartInformation: function(station, cb) {
    request("http://api.bart.gov/api/bsa.aspx?cmd=bsa&key=Q9ZL-PEIU-98JT-DWE9&json=y&orig=" + station,
    function (error, response, body) {
      if(error) {
        console.log(error);
        cb("An error occurred", error);
      }
      console.log('statusCode:', response && response.statusCode);
      let result = JSON.parse(body);
      let status = result.root.bsa[0].description['#cdata-section'];
      cb(status);
    });
  }
};
