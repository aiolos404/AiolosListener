/*--------------------------------------------------------
1. Jialiang Chang / Mar 13, 2015:
2. Version log :1.written by Mar 13,2015
3. Precise examples / instructions to run this program:
> node ../bin/www (or supervisor ./bin/www if supervisor is intalled)
> type localhost:1024/pastebin/getpastes in broswer to test running
4. Aim: basic application settings
5. Notes:
  a.This is the "main" execution file of application
----------------------------------------------------------*/
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var PastebinAPI = require('pastebin-js');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var mongoose = require('mongoose');


var routes = require('./routes');
// var routes = require('./routes/index');
// var users = require('./routes/users');
var config = require('./config/config');


app.use('/', routes);

mongoose.connect(config.db.mongodb);

app.listen('1024')
console.log('pastebin downloader listening on port 1024');
exports = module.exports = app;

