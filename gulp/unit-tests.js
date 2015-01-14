'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('test',['myEnv'], function() {
  return gulp.src('noFile.dontCreateThisFile.gulp-karma-issue-7')
    .pipe($.karma({
      configFile: 'test/karma.conf.js',
      action: 'run',
      singleRun:false
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});
