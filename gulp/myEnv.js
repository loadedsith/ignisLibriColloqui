var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var rename = require('gulp-rename');

//load your custom env.json file, 
var env = require('../env.json');


//inject env var
gulp.task('myEnv', function () {
  return gulp.src('./src/app/env.pre.js')
    .pipe(rename('env.post.js'))
    .pipe(preprocess({context: {FP_API_KEY: env.FP_API_KEY}}))
    .pipe(gulp.dest('src/app'));
});

