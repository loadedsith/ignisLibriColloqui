var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')

gulp.task('test-server', function() {
  nodemon({
    script: './test/testServer.js',
    watch:['./test/testServer.js'],
    ext: 'html js',
    nodeArgs:['--debug'],
    ignore: ['bower_components', 'node_modules', 'gulp/*.js']
  })
   .on('restart', function() {
     console.log('restarted!')
   });
 });
