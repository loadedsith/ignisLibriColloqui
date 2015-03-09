var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var rename = require('gulp-rename');

//load your custom env.json file,
var env;
var mode;
//use (process.env or {}) then .mode
if ((process.env || {}).mode !== 'heroku') {
  env = require('../env.json');
  mode = 'dev';
} else {
  mode = 'heroku';
}

//inject env var
gulp.task('myEnv', function() {
  'use strict';
  return gulp.src('./src/app/env.pre.js')
    .pipe(rename('env.js'))
    .pipe(preprocess(
      {
        context: {
          FB_API_KEY: (process.env.fbAppSecret || env.FB_API_KEY),
          ILC_SERVER: (process.env.ilcServer || env.ILC_SERVER)
        }
      }
    ))
    .pipe(gulp.dest('.tmp/app'));
});
