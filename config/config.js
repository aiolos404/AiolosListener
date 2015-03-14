/*--------------------------------------------------------
1. Jialiang Chang / Mar 13, 2015:
2. Version log :1.written by Mar 13,2015
3. Precise examples / instructions to run this program:
> node ../bin/www (or supervisor ./bin/www if supervisor is intalled)
> type localhost:1024/pastebin/getpastes in broswer to test running
4. Aim: save configurations.
5. Notes:
----------------------------------------------------------*/
'use strict';

module.exports = {
    "pastebin" : {
    	"url" : 'http://pastebin.com/archive',
        "api_dev_key" : "5cae169fb42133ac971afa40e0bffd0e",
        "api_user_key" : null,
    },
    "db": {
        // "mongodb": "mongodb://localhost/se526"  // for local testing purpose
		"mongodb": "mongodb://jchang:admin@ds053877.mongolab.com:53877/se526"     // used mongolab as remote server to store the data
	},    
};


