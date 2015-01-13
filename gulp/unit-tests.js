'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

// var wiredep = require('wiredep');

gulp.task('test',['myEnv'], function() {
  // var bowerDeps = wiredep({
  //   directory: 'bower_components',
  //   exclude: ['bootstrap-sass-official'],
  //   dependencies: true,
  //   devDependencies: true
  // });
  // 
  // var testFiles = bowerDeps.js.concat([
  //   'src/{app,components}/**/*.js',
  //   'test/unit/**/*.js'
  // ]);

  return gulp.src('noFile.dontCreateThisFile.gulp-karma-issue-7')
    .pipe($.karma({
      configFile: 'test/karma.conf.js',
      action: 'run',
      singleRun:false
    }))
});
