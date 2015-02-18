'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var karma = require('karma').server;
var karmaRunner = require('karma').runner;

// you could the 'test-server' task here, but I think its nicer to have in a seperate terminal
gulp.task('test', ['myEnv', 'karmaTeam'], function(done) {
  gulp.watch('src/{app,components}/**/*.js', ['karmaTeam']);
  // gulp.watch('src/{app,components}/**/*.spec.js', ['karmaRunner']);
});

gulp.task('karmaTeam', function(done) {
  karma.start({
    configFile: __dirname + '/../test/karma.conf.js',
    singleRun: true
  }, function() {
    console.log('restarted!')
    done();
  });
})
gulp.task('karmaRunner', function(done) {
  karma.start({
    configFile: __dirname + '/../test/karma.conf.js',
    singleRun: true,
    autoWatch:true
  }, done);
});