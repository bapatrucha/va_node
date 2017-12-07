const request = require('request');

module.exports = {

  getWeatherByZip: function(zip, cb) {
    request("http://api.wunderground.com/api/57b6d93938a5315d/forecast/geolookup/conditions/q/" +
    zip + ".json", function (error, response, body) {
      if(error) {
        console.log(error);
        cb("An error occurred", error);
      }
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      let result = JSON.parse(body);

      if(result.response.error) {
        cb("I'm sorry, I could not find a forecast for that zip code.");
      } else {
        let weather = result.forecast.txt_forecast.forecastday[0].fcttext;

        console.log('forecast', weather);
        cb(weather);
      }

    });
  },

  getWeatherByCity: function(city, cb) {

    if(city == undefined || city == '') {
      cb("Please add a californian city");
    } else {
      city = city.replace(' ', '_');

      request("http://api.wunderground.com/api/57b6d93938a5315d/forecast/geolookup/conditions/q/CA/" +
      city + ".json", function (error, response, body) {
        if(error) {
          console.log(error);
          cb("An error occurred", error);
        }
        console.log('statusCode:', response && response.statusCode);

        let result = JSON.parse(body);

        if(result.response.error) {
          cb("I'm sorry, I could not find a forecast for that city.");
        } else {
          let weather = result.forecast.txt_forecast.forecastday[0].fcttext;
          console.log('forecast', weather);
          cb(weather);
        }
      });
    }
}

};
