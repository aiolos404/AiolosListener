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



var routes = require('./routes');
// var routes = require('./routes/index');
// var users = require('./routes/users');
var config = require('./config/config');


app.use('/', routes);



app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

