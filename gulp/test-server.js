var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('test-server', function() {
  'use strict';
  nodemon({
    script: './test/testServer.js',
    watch:['./test/testServer.js'],
    ext: 'html js',
    nodeArgs:['--debug'],
    ignore: ['bower_components', 'node_modules', 'gulp/*.js']
  })
  .on('restart', function() {
    console.log('restarted!');
  });
});
