var client = require('./lib/client');
var gulp = require('gulp');
var user = require('./user.json');
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));
var tag = 'root';

gulp.task('watch', function(){
	gulp.watch('write-your-note.md', ['save']);
});

gulp.task('post', function(){
	client.read('./write-your-note.md', function(text){
		var post = {text:text, tag:tag};
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
	gulp.watch('write-your-note.md',['save']);
});

gulp.task('save', function(){
	client.read('./write-your-note.md', function(text){
		var post = {text:text, tag:tag, postedAt: Date.now()};
		client.save(post, function(){
			client.erase('./write-your-note.md', function(){
				console.log("ok in " + tag);
			});
		});
	});
})

gulp.task('sync', function(){
	client.postStore(function(data){
		if(data === "ok"){
			client.reset();
		}
	});
});
