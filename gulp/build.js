'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('styles', [],  function () {
  return gulp.src('src/{app,components}/**/*.scss')
    .pipe($.sass({style: 'expanded'}))
    .on('error', handleError)
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp'))
    .pipe($.size());
});
var notify = require('gulp-notify');

function execute(command, callback){
  var exec = require('child_process').exec;
  exec(command, function(error, stdout, stderr){ callback(stdout); });
};

notify.on('click', function (options) {
  var message = options.message;
  var lines = message.split('\n');
  var txmtUrl = lines[lines.length-2];//-2 because there's an extra '\n' on the messages so we dont actually want the last line
  execute("open "+ txmtUrl, function(){
    // console.log('opening in TextMate');
  });
});

gulp.task('scripts', function() {
  gulp.src(['src/{app,components}/**/*.js'])
    .pipe($.jshint())
    // Use gulp-notify as jshint reporter
    .pipe(notify({
      title: 'JSHint',
      message:function (file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }
      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason+'\n'+
             'txmt://open?url=file://' + file.path + '&line='+data.error.line + '&column=' + data.error.character+'\n';
        }
      }).join('\n');
      return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
    },wait:true}));
  gulp.src(['src/{app,components}/**/*.jsx'])
    .pipe($.jshint())
    // Use gulp-notify as jshint reporter
    .pipe(notify({
      title: 'JSHint',
      message:function (file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }
      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason+'\n'+
             'txmt://open?url=file://' + file.path + '&line='+data.error.line + '&column=' + data.error.character+'\n';
        }
      }).join('\n');
      return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
    },wait:true}));
});

gulp.task('partials', function () {
  return gulp.src('src/{app,components}/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: 'ignisLibriColloqui'
    }))
    .pipe(gulp.dest('.tmp'))
    .pipe($.size());
});

gulp.task('html', ['styles', 'scripts', 'partials'], function () {
  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src('src/*.html')
    .pipe($.inject(gulp.src('.tmp/{app,components}/**/*.js'), {
      read: false,
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('src/assets/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('misc', function () {
  return gulp.src('src/**/*.ico')
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('clean', function (done) {
  $.del(['.tmp', 'dist'], done);
});

gulp.task('build', ['html', 'images', 'fonts', 'require', 'misc']);
