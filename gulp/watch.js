'use strict';

var gulp = require('gulp');

gulp.task('watch', ['scripts', 'styles'] , function() {
  gulp.watch('src/app/**/*.scss', ['styles']);
  gulp.watch([
    'src/app/**/*.js',
    'src/app/profile/*.js',
    'src/vendor/**/*.js',
    './gulp/**/*.js',
    './gulpfile.js'
    ], [
      'scripts',
      'jscs'
    ]);
  gulp.watch(['src/app/**/*.jsx'], ['jsx', 'scripts']);
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch('src/app/index.html', ['requireJSScript']);
  gulp.watch(['env.json', 'src/app/env.pre.js'], ['myEnv']);
});
