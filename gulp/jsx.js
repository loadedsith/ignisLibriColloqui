var gulp = require('gulp');
var react = require('gulp-react');

var rename = require('gulp-rename');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

gulp.task('jsx', function() {//requirejsBuild
  'use strict';

  return gulp.src('src/app/**/*.jsx')
    .pipe(react())
    .pipe(rename({extname:'.js'}))
    .pipe(gulp.dest('./.tmp/app'))
    .pipe($.size());

});
