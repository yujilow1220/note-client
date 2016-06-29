var client = require('./lib/client');
var gulp = require('gulp');
var user = require('./user.json');
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));
var tag = 'root';

gulp.task('watch', function(){
	gulp.watch('write-your-note.md', ['post']);
});

gulp.task('post', function(){
	client.read('./write-your-note.md', function(text){
		var post = {text:text, author:user.name, postedAt:Date.now()};
		client.post(post, function(){
			client.erase('./write-your-note.md', function(){
				console.log("ok in " + tag);
			});
		});
	});
});

gulp.task('default', ['watch']);

gulp.task('tag', function() {
  tag = argv.t || 'root';
	gulp.watch('write-your-note.md',['post']);
});
