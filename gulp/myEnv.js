var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var rename = require('gulp-rename');

//load your custom env.json file,
var env;

//use (process.env or {}) then .mode
if (((process.env || {}).mode !== 'heroku') {
  env = require('../env.json');
}

//inject env var
gulp.task('myEnv', function() {
  return gulp.src('./src/app/env.pre.js')
    .pipe(rename('env.js'))
    .pipe(preprocess(
      {
        context: {
          FB_API_KEY: process.env.fbAppSecret || env.FB_API_KEY
        }
      }
    ))
    .pipe(gulp.dest('.tmp/app'));
});

