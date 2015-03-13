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

