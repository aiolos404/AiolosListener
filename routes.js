/*--------------------------------------------------------
1. Jialiang Chang / Mar 13, 2015:
2. Version log :1.written by Mar 13,2015
3. Precise examples / instructions to run this program:
> node ../bin/www (or supervisor ./bin/www if supervisor is intalled)
> type localhost:1024/pastebin/getpastes in broswer to test running
4. Aim: to manage different requests and distribute them into different handlers
5. Notes:
  a.This is the router settings file
----------------------------------------------------------*/
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



var pastebin = new PastebinAPI({
  'api_dev_key' : config.pastebin.api_dev_key,
  'api_user_name' : config.pastebin.api_user_name,
  'api_user_password' : config.pastebin.api_user_password
});

//import the pastebin handlers
var handlers = {
  pastebin: new pastebinHandler(),//handle pastebin related tasks
  // splunk: new splunkHandler(),//handle splunk related tasks
  // bot: new botHandler(),//handle bot related tasks like publish or update the report online. Sync the publication with twitter
};

//show the operation time
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})


//when requesting the localhost:1024/pastebin/getpastes, a handler is invoked and related opertions will be running.
router.get('/pastebin/getpastes',handlers.pastebin.getURLsFromPastebin);


module.exports = router;