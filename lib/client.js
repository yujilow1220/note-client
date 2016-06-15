var rest = require('restler');
var fs = require('fs');
var API_URL = "http://localhost:3000/data";

module.exports.read = function(file_path, callback){
	fs.readFile(file_path, 'utf8', function (err, text) {
	    callback(text);
	});
};

module.exports.post = function(data, callback){
	rest.postJson(API_URL, data)
	.on('success', function(data, res){
		callback();
	});
};

module.exports.erase = function(file_path, callback){
	fs.writeFile(file_path, '', function (err) {
	    if(err) console.log(err);
	    callback();
	});
};