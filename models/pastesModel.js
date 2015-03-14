/*--------------------------------------------------------
1. Jialiang Chang / Mar 13, 2015:
2. Version log :1.written by Mar 13,2015
3. Precise examples / instructions to run this program:
> node ../bin/www (or supervisor ./bin/www if supervisor is intalled)
> type localhost:1024/pastebin/getpastes in broswer to test running
4. Aim: store schema and model of JSON of paste
5. Notes:
----------------------------------------------------------*/
var mongoose = require('mongoose');
// var Schema = mongoose.Schema;  


var pastesSchema = mongoose.Schema({     
	url: {type: String, required: true, index: {unique: true}},
	title: {type: String, required: true},
	content: {type: String,required: true},
	addedDate: {type: String, required: true},
});


var pastesModel = mongoose.model('se526', pastesSchema);

module.exports = pastesModel;