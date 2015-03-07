var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var PastebinAPI = require('pastebin-js');
var cheerio = require('cheerio');
var request = require('request');

var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config/config');


var app = express();

var pastebin = new PastebinAPI({
  'api_dev_key' : config.pastebin.api_dev_key,
  'api_user_name' : config.pastebin.api_user_name,
  'api_user_password' : config.pastebin.api_user_password
});
 

// view engine setup
app.get('/scrape', function(req, res){

url = 'http://pastebin.com/archive';

request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('.i_p0').each(function(i, element){
      var a = $(this).next();
      var url = a.attr('href').substring(1);

      console.log(url);

      pastebin
          .getPaste(url)
          .then(function (data) {
            // data contains the raw paste 
            console.log(data);
          })
          .fail(function (err) {
            // Something went wrong 
            console.log(err);
          })
    });
  }
});

// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

//     console.log('File successfully written! - Check your project directory for the output.json file');

// })


// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')}) ;



app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;


// var pastebin = new PastebinAPI({
//   'api_dev_key' : config.pastebin.api_dev_key,
//   'api_user_name' : config.pastebin.api_user_name,
//   'api_user_password' : config.pastebin.api_user_password
// });
 
// pastebin
//   .getPaste('Rr0ffS8C')
//   .then(function (data) {
//     // data contains the raw paste 
//     console.log(data);
//   })
//   .fail(function (err) {
//     // Something went wrong 
//     console.log(err);
//   })


// module.exports = app;
