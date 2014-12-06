'use strict';

var gulp = require('gulp');

gulp.task('watch', ['styles'] ,function () {
  console.log('Indigo Painted Hunting Dog');
  gulp.watch('src/{app,components}/**/*.scss', ['styles']);
  gulp.watch('src/{app,components}/**/*.js', ['scripts','jsx']);
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
