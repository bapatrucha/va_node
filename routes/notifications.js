const express = require('express');

const Notification = require('../models/Notification');

const router = express.Router();

router.get('/hello', function(req, res) {
  res.send("Hi David");
});

router.get('/send/basic', function (req, res) {
  var token = req.query.token
  console.log('token = ' + token);
  Notification.sendPush(token, function(result) {
    res.send(result);
  });
});

router.post('/send', function (req, res) {
  var token = req.body.token;
  var message = req.body.message;

  console.log('token = ' + token, "message = " + message.body);
  Notification.sendPushNotification(token, message, function(result) {
    res.send(result);
  });
});

module.exports = router;
