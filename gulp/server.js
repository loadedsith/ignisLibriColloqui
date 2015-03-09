'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if (baseDir === 'src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1)) {
    routes = {
      // Should be '/bower_components': '../bower_components'
      // Waiting for https://github.com/shakyShane/browser-sync/issues/308
      '/bower_components': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/index.html',
    server: {
      port: process.env.PORT || 3000,
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    notify:false,
    ghostMode: false,
    open:false,
    browser: browser,
  });
}

gulp.task('requireJSScript', function() {
  gulp.src(__dirname + '/../src/index.html')
  .pipe($.preprocess({
    context: {
      ENV:'dev'
    }
  }))
  .pipe(gulp.dest('.tmp'));
});

gulp.task('serve', ['requireJSScript', 'myEnv', 'jsx', 'scripts', 'watch'], function() {// 'requirejsBuild'
  browserSyncInit([
    '.tmp',
    'src'
  ], [
    '.tmp/index.css',
    '.tmp/vendor.css',
    '.tmp/app/**/*.css',
    '.tmp/app/**/*.js',
    'src/assets/images/**/*',
    'src/*.html',
    'src/app/**/*.html',
    'src/app/**/*.js',
    '!src/app/**/*spec.js'
  ]);
  // function execute(command, callback) {
  //   var exec = require('child_process').exec;
  //   exec(command, function(error, stdout) { callback(stdout); });
  // };
  // execute('open http://example.com:3000', function() {
  //   console.log('Opened example.com resource. If it didn\'t use /etc/hosts to map example.com to localhost');
  // });
});

gulp.task('serve:dist', ['dist'], function() {
  browserSyncInit('dist');
});

gulp.task('serve:e2e', function() {
  browserSyncInit(['src', '.tmp'], null, []);
});

gulp.task('serve:e2e-dist', ['watch'], function() {
  browserSyncInit('dist', null, []);
});
