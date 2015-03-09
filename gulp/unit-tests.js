'use strict';

var gulp = require('gulp');

var karma = require('karma').server;
// var karmaRunner = require('karma').runner;

// you could add the 'test-server' task here, but I think its nicer to have in a seperate terminal
gulp.task('test', ['myEnv', 'karmaTeam'], function() {
  gulp.watch('src/app/**/*.js', ['karmaTeam']);
  // gulp.watch('src/app/**/*.spec.js', ['karmaRunner']);
});

gulp.task('karmaTeam', function(done) {
  karma.start({
    configFile: __dirname + '/../test/karma.conf.js',
    singleRun: true
  }, function() {
    console.log('restarted!');
    done();
  });
});

gulp.task('karmaRunner', function(done) {
  karma.start({
    configFile: __dirname + '/../test/karma.conf.js',
    singleRun: true,
    autoWatch: true
  }, done);
});