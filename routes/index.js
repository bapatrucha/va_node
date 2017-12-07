const express = require('express');

const ApiAiModel = require('../models/NLP/ApiAiModel');
const ApiAI = require('../models/NLP/yaml/ApiAI'); // v2 -> yaml
const Weather = require('../models/Weather');
const Traffic = require('../models/Traffic');

const router = express.Router();

router.get('/hello', function(req, res) {
  res.send("Hi David");
});

router.post('/api/chat', function(req, res) {
  let message = req.body.message;
  let userId = req.body.userId;
  let sessionId = req.body.sessionId;
  //console.log(message);

  ApiAiModel.processTextMessage(userId, message, sessionId, function(result) {
    //return res.send(result, 200);
     res.json({ messages: result });
  });
});

// v2 => yaml response
router.post('/api/v2/chat', function(req, res) {
  let message = req.body;

  res.set('Content-Type', 'text/plain');

  ApiAI.processTextMessage(message, function(result) {
     res.send(result);
  });
});

router.get('/api/notifications/weather', function(req, res) {
  let city = req.query.city;
  let zip  = req.query.zip;
  let time = req.query.time;

  let messages = [];

  let response = {
    intent: "",
    textResponse: "",
    responseObj: null
  };

  if(zip != undefined) {
    console.log("Getting weather for zip: " + zip);
    Weather.getWeatherByZip(zip, function(result) {
      response.textResponse = result;
      messages.push(response);
      res.json({messages: messages});
    });
  } else if(city != undefined) {
    console.log("Getting weather for city: " + city);
    Weather.getWeatherByCity(city, function(result) {
      response.textResponse = result;
      messages.push(response);
      res.json({messages: messages});
    });
  } else {
    response.textResponse = "Invalid request format";
    messages.push(response);
    res.json({messages: messages});
  }

});

router.get('/api/device/register', function(req, res) {
  res.send("Hello World");
});

router.get('/api/notifications/bart-status', function(req, res) {
  let station = req.query.station;

  if(station == undefined  || station == '') {
    station = "all";
  }

  let result = [];

  let message = {
    intent: "",
    textResponse: "",
    responseObj: null
  };

  Traffic.getBartInformation(station, function(response) {
    message.textResponse = response;
    result.push(message);
    res.json({messages: result});
  });
});

router.post('/api/submit-dummy-form', function(req, res) {
  let result = [
    {
      intent: "",
      textResponse: "Your application has been successfully submitted. Let me know if I can help you with anything else.",
      responseObj: null
    }
  ];

  res.json({messages: result});
});

module.exports = router;
