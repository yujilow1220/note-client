var client = require('./lib/client');

client.read('./test.md', function(text){
	console.log(text);
});

