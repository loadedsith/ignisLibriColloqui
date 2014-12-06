var gulp = require('gulp');
var react = require('gulp-react');

var rename = require('gulp-rename');

gulp.task('jsx', function() {
  return gulp.src('./src/app/react/messages.js')
    .pipe(react())
    .pipe(rename('messages.post.js'))
    .pipe(gulp.dest('./src/app/react'));
});