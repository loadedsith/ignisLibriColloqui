'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var karma = require('karma').server;
var karmaRunner = require('karma').runner;

gulp.task('test', ['myEnv','karmaTeam'], function(done) {
  gulp.watch('src/{app,components}/**/*.spec.js', ['karmaTeam']);
  // gulp.watch('src/{app,components}/**/*.spec.js', ['karmaRunner']);
});

gulp.task('karmaTeam', function(done) {
  karma.start({
    configFile: __dirname + '/../test/karma.conf.js',
    singleRun: true,
    autoWatch:false
  },done);
})
gulp.task('karmaRunner', function(done) {
  karma.start({
    configFile: __dirname + '/../test/karma.conf.js',
    singleRun: false,
    autoWatch:true
  });
});