var pastesModel = require('../models/pastesModel');
// var userProfileModel = require('../models/testModel');
var Q = require('q');
var config = require('../config/config');
var request = require('request');

//this one is not necessary


function pasteRepo() {
	this.test = testFunction;
	this.savePaste = savePaste;
	this.getPasteList = getURLsList;
	// this.addShoppingListToUser = addShoppingListToUser;
	// this.removeShoppingListFromUser = removeShoppingListFromUser;
	
	// this.findUserByUsername = findAccountByUsername;
	// this.updateAccount = updateAccount;
	// this.updateLastLoginDate = updateLastLoginDate;
	// this.disableAccount = disableAccount;
	// this.findOrCreateAccount = findOrCreateAccount;
}

function testFunction(){
	console.log("this is a testing function");
}

function getURLsList(url) {
	var deferred = Q.defer();
	request(url, function (err, html) {
		if (err) {
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(html);
		}
	});
	return deferred.promise;
}

// function getURLsList(url) {
// 	var deferred = Q.defer();
// 	request(url, function (err, html) {
// 		if (err) {
// 			deferred.reject(new Error(err));
// 		}
// 		else {
// 			deferred.resolve(html);
// 		}
// 	});
// 	return deferred.promise;
// }

function savePaste(title, url, addedDate) {
	var deferred = Q.defer();
	var content = "";
	request("http://pastebin.com/raw.php?i=" + "4uc15RtD", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			consloe.log(body); // Show the HTML for the Google homepage. 
		}
	})

	var paste = new pastesModel({
		"title": title,
		// user.generateHash(password)
		"url": url,
		"content": content,
		"addedDate": addedDate,
	});
	paste.save(function(err, p) {
		if (err) {
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(p);
		}
	});
	return deferred.promise;
}





module.exports = pasteRepo;