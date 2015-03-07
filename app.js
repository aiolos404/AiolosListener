var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var PastebinAPI = require('pastebin-js');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

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
        var title, url, content,addedDate;
        var json = { title : "", url : "", content : "", addedDate : ""};
        var a = $(this).next();//get <a>
        title = a.text();
        url = a.attr('href').substring(1);//get rid of '/' simbol
        content = pastebin.getPaste(url).data;
        addedDate = new Date();


        // pastebin
        //   .getPaste(url)
        //   .then(function (data) {
        //     // data contains the raw paste 
        //     content = data;
        //     console.log(content);
        //   })
        //   .fail(function (err) {
        //     // Something went wrong 
        //     console.log(err);
        //   })


        json.title = title;
        json.url = url;
        json.content = content;
        json.addedDate = addedDate;

        console.log(title);
        console.log(url);
        console.log(addedDate);
        console.log(content);


        // Asynchronously append data to a file, creating the file if it not yet exists. data can be a string or a buffer.
        fs.appendFile('output.json',JSON.stringify(json, null, 4));

        // console.log(url);

        setTimeout(function(){ console.log(Date.now() - start); }, 5000);

    });
  }
});



// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')}) ;


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

