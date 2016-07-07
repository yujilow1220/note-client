var rest = require('restler');
var fs = require('fs');
var API_URL = "http://localhost:3000/";
var STORE_PATH = './store.json';
var ENDPOINT_USER = "user";
var ENDPOINT_POST = "post";
var ENDPOINT_TAG = "tag";
var ENDPOINT_STORE = "store";

module.exports.read = function(file_path, callback){
	fs.readFile(file_path, 'utf8', function (err, text) {
	    callback(text);
	});
};

module.exports.post = function(data, callback){
	rest.postJson(API_URL+ENDPOINT_POST, data)
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


module.exports.save = function(data, callback){
	var json = require('../store.json');
	json.posts.push(data);
	console.log(JSON.stringify(json));
	fs.writeFile(STORE_PATH, JSON.stringify(json), function (err) {
	    if(err) console.log(err);
	    callback();
	});
}

module.exports.postStore = function(callback){
	var data = require('../store.json');
	rest.postJson(API_URL+ENDPOINT_STORE, data)
	.on('success', function(data, res){
		callback(data);
	});
}

module.exports.reset = function(){
	var json = {posts:[], tags:[]};
	fs.writeFile(STORE_PATH, JSON.stringify(json), function (err) {
	    if(err) console.log(err);
	});
}
