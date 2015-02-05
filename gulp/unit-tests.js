'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var karma = require('karma').server;
var karmaRunner = require('karma').runner;

gulp.task('test', ['myEnv','test-server'], function(done) {
  karmaRunner.run({
    configFile: __dirname + '/../test/karma.conf.js',
  },function() {
    karma.start({
      configFile: __dirname + '/../test/karma.conf.js',
      singleRun: false,
      autoWatch:true
    });
  });
});
