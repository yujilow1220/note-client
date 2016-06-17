var client = require('./lib/client');
var gulp = require('gulp');
var user = require('./user.json');

gulp.task('watch', function(){
	gulp.watch('write-your-note.md', ['post']);
});

gulp.task('post', function(){
	client.read('./write-your-note.md', function(text){
		var post = {text:text, author:user.name, postedAt:Date.now()};
		client.post(post, function(){
			client.erase('./write-your-note.md', function(){
				console.log("ok");
			});
		});
	});
});

gulp.task('default', ['watch']);