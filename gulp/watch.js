'use strict';

var gulp = require('gulp');

gulp.task('watch', ['styles'] , function() {
  gulp.watch('src/{app,components}/**/*.scss', ['styles']);
  gulp.watch(['src/{app,components}/**/*.js', '!src/{app,components}/**/*.spec.js'], ['scripts']);//'jscs'
  gulp.watch(['src/{app,components}/**/*.jsx'], ['jsx', 'scripts']);//'jscs'
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch(['env.json', 'src/app/env.pre.js'], ['myEnv']);
});
