var mongoose = require('mongoose');
// var Schema = mongoose.Schema;  



var pastesSchema = mongoose.Schema({     
	url: {type: String, required: true, index: {unique: true}},
	title: {type: String, required: true},
	content: {type: String},
	addedDate: {type: String, required: true},
});


var pastesModel = mongoose.model('se526', pastesSchema);

module.exports = pastesModel;