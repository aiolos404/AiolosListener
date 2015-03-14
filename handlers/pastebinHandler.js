/*--------------------------------------------------------
1. Jialiang Chang / Mar 13, 2015:
2. Version log :1.written by Mar 13,2015
3. Precise examples / instructions to run this program:
> node ../bin/www (or supervisor ./bin/www if supervisor is intalled)
> type localhost:1024/pastebin/getpastes in broswer to test running
4. Aim: store all the logical functions and functional programs 
5. Notes:
----------------------------------------------------------*/
var config = require('../config/config');
var PastebinAPI = require('pastebin-js');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var sleep = require('sleep');
var http = require('http');  

var pastesModel = require('../models/pastesModel');



var pastebinHandler = function() {
	
	this.getURLsFromPastebin= handleGetURLsRequest;

};

var pastebin = new PastebinAPI({
  'api_dev_key' : config.pastebin.api_dev_key,
  'api_user_name' : config.pastebin.api_user_name,
  'api_user_password' : config.pastebin.api_user_password
});
 

//this is the screen scrapping tool to get urls of the most recent posts in pastebin
function handleGetURLsRequest() {
	request(config.pastebin.url, function (error, response, html) {
  		if (!error && response.statusCode == 200) {
   			 var $ = cheerio.load(html);
    
		    $('.i_p0').each(function(i, element){

		    	var title, url, content,addedDate;
		    	var arr = [];
		    	var a = $(this).next();//get <a>
		        title = a.text();
		        url = a.attr('href').substring(1);//get rid of '/' simbol
		        addedDate = new Date();
		        var json = { title : "", url : "", content : "", addedDate : ""};

		        json.title = title;
		        json.url = url;
		        // json.content = content;
		        json.addedDate = addedDate;   
		        
		        // console.log(url);		        
		        // setTimeout(5000);//polite time for safety purpose

		        console.log("flag");
				getContentofURL(json);
		        // sleep.sleep(5)//blocking 5 secs polite time for safety purpose
	    	});			
	  	};
	});	
}


function getContentofURL(json) {
    var foo = "http://pastebin.com/raw.php?i="+json.url;
    request(foo, function(err, resp, body) {
        console.log(body);
        json.content = body;
        console.log(json);
        // Asynchronously append data to a file, creating the file if it not yet exists. data can be a string or a buffer.		        
        // fs.appendFile('output.json',JSON.stringify(json, null, 4));
        var paste = new pastesModel({
			title: json.title,
			// user.generateHash(password)
			url: json.url,
			content: json.content,
			addedDate: json.addedDate,
		});
		paste.save();
    });
}


module.exports = pastebinHandler;