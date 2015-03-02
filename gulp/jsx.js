var gulp = require('gulp');
var react = require('gulp-react');

var rename = require('gulp-rename');

gulp.task('jsx',['requirejsBuild'], function() {
  return gulp.src('src/app/**/*.jsx')
    .pipe(react())
    .pipe(rename({extname:'.js'}))
    .pipe(gulp.dest('./.tmp'));
});