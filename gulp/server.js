'use strict';

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

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
      port: process.env.PORT||3000,
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
function execute(command, callback) {
  var exec = require('child_process').exec;
  exec(command, function(error, stdout, stderr) { callback(stdout); });
};

gulp.task('serve', ['myEnv', 'bower', 'jsx', 'scripts', 'watch'], function() {
  browserSyncInit([
    'src',
    '.tmp'
  ], [
    '.tmp/{app,components}/**/*.css',
    '.tmp/{app,components}/**/*.js',
    'src/assets/images/**/*',
    'src/*.html',
    'src/{app,components}/**/*.html',
    'src/{app,components}/**/*.js',
    '!src/{app,components}/**/*spec.js'
  ]);
  // execute('open http://example.com:3000', function() {
  //   console.log('Opened example.com resource. If it didn\'t use /etc/hosts to map example.com to localhost');
  // });
});

gulp.task('serve:dist', ['build'], function() {
  browserSyncInit('dist');
});

gulp.task('serve:e2e', function() {
  browserSyncInit(['src', '.tmp'], null, []);
});

gulp.task('serve:e2e-dist', ['watch'], function() {
  browserSyncInit('dist', null, []);
});
