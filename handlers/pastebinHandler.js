// var userRepository = require('../repositories/userRepository');
// var SecurityToken = require('../infrastructure/securityToken');
// var logger = require('../utils/logger');
// var winston = require('winston');
var config = require('../config/config');
var PastebinAPI = require('pastebin-js');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var sleep = require('sleep');
var http = require('http');  
var mongoose = require('mongoose');

mongoose.connect(config.db.mongodb);

var pastesModel = require('../models/pastesModel');

var pastebinHandler = function() {
	
	this.getURLsFromPastebin= handleGetURLsRequest;
	// this.getContentFromPastebin= handleGetContentsRequest;

};

var pastebin = new PastebinAPI({
  'api_dev_key' : config.pastebin.api_dev_key,
  'api_user_name' : config.pastebin.api_user_name,
  'api_user_password' : config.pastebin.api_user_password
});
 

//this is the screen scrapping tool to get urls of the most recent posts in pastebin
function handleGetURLsRequest(req, res) {
	request(config.pastebin.url, function (error, response, html) {
  		if (!error && response.statusCode == 200) {
   			 var $ = cheerio.load(html);
    
		    $('.i_p0').each(function(i, element){
		    	var title, url, content,addedDate;
		    	var a = $(this).next();//get <a>
		        title = a.text();
		        url = a.attr('href').substring(1);//get rid of '/' simbol
		        // content = suburl.html();
		        addedDate = new Date();

		    	var paste = new pastesModel({
					title: title,
					// user.generateHash(password)
					url: url,
					addedDate: addedDate,
				});
		       
		     	paste.save();
		        // var json = { title : "", url : "", content : "", addedDate : ""};
		        

		        console.log(title);
		        console.log(url);
		        // console.log(content);
		        // console.log(" " + pastebin.getPaste('76b2yNRt'));
				// console.log( pastebin.getPaste('76b2yNRt'));

		        // console.log(addedDate);
		        // json.title = title;
		        // json.url = suburl;
		        // // json.content = content;
		        // json.addedDate = addedDate;
		        
		        // Asynchronously append data to a file, creating the file if it not yet exists. data can be a string or a buffer.
		        // fs.appendFile('output.json',JSON.stringify(json, null, 4));
		        
		        // console.log(url);		        
		        // setTimeout(5000);//polite time for safety purpose
		        sleep.sleep(5)//blocking 5 secs polite time for safety purpose
	    	});
	  	}

	});
	
	res.send("download urls and contents successfully");
}

function handleGetContentsRequest(req, res) {
	pastesModel.find(function(err, pastes){
		pastes.forEach( function (paste){
				request("http://pastebin.com/raw.php?i=" + paste.url, function (error, response, paste) {
				  if (!error && response.statusCode == 200) {

		       
				    res.send(paste) // Show the HTML for the Google homepage. 
				  }
			})

		});

	});
}


module.exports = pastebinHandler;