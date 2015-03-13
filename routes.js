var express = require('express');
var router = express.Router();
var pastebinHandler = require('./handlers/pastebinHandler');
var PastebinAPI = require('pastebin-js');
var config = require('./config/config');
var request = require('request');
var http = require('http'); 
var fs = require('fs');
// var splunkHandler = require('./handlers/splunkHandler');
// var botHandler = require('./handlers/botHandler');


// var userProfileModel = require('./models/testModel');
var pastebin = new PastebinAPI({
  'api_dev_key' : config.pastebin.api_dev_key,
  'api_user_name' : config.pastebin.api_user_name,
  'api_user_password' : config.pastebin.api_user_password
});


var handlers = {
  pastebin: new pastebinHandler(),//handle pastebin related tasks
  // splunk: new splunkHandler(),//handle splunk related tasks
  // bot: new botHandler(),//handle bot related tasks like publish or update the report online. Sync the publication with twitter
};


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})

// router.get('/', 


router.get('/pastebin/geturl',handlers.pastebin.getURLsFromPastebin);




module.exports = router;