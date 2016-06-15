var assert = require('assert');
var client = require('../lib/client');

describe('client', function () {
    it('ファイルを読み込める', function (done) {
    	
        client.read('./test.md', function(text){
        	assert.equal(text, 'test');
        	done();
        });
    });
    it('erase', function(done){
    	client.erase('./test.md', function(){
    		client.read('./test.md', function(text){
    			assert.equal(text, '');
    			done();
    		});
    	});
    });
});