'use strict';

var gulp = require('gulp');
var map = require('map-stream');
var chalk = require('chalk');
var notify = require('gulp-notify');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}
var fs = require('fs'),
    path = require('path');

var textmateReporter = function(file) {
  if (!file.scsslint.success) {
    $.util.log(chalk.bgYellow('  ' + file.scsslint.issues.length + ' issues found in ' + file.path + '  '));
    for (var i = file.scsslint.issues.length - 1; i >= 0; i--) {
      var issue = file.scsslint.issues[i];
      var path = 'txmt://open?url=file://'+file.history+'&line='+issue.line+'&column='+issue.column;
      $.util.log(chalk.red(issue.reason)+'\n'+
        chalk.underline(path)+'\n');
    }
  }
}

gulp.task('styles', [],  function() {
  return gulp.src('src/app/**/*.scss')
    .pipe($.scssLint({
      customReport: textmateReporter
    }))
    .pipe($.sass({
      style: 'expanded',
      includePaths:[
        './src/bower_components/foundation/scss',
        './src/bower_components/angular-xeditable/dist/css'
      ]
    }))
    .on('error', handleError)
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp'))
    .pipe($.size());
});


function execute(command, callback) {
  var exec = require('child_process').exec;
  exec(command, function(error, stdout, stderr) { callback(stdout); });
};

notify.on('click', function(options) {
  var message = options.message;
  var lines = message.split('\n');
  var txmtUrl = lines[lines.length-2];//-2 because there's an extra '\n' on the messages so we dont actually want the last line
  execute("open "+ txmtUrl, function() {
    // console.log('opening in TextMate');
  });
});

gulp.task('jscs', function() {
  return  gulp.src([
    'src/app/**/*.js'
    ])
    .pipe($.jscs({
      "preset": "google",
      "fileExtensions": [
        ".js",
        "jscs"
      ],

      "requireParenthesesAroundIIFE": true,
      "maximumLineLength": 120,
      "validateLineBreaks": null,
      "validateIndentation": 2,

      "disallowKeywords": ["with"],
      "disallowSpacesInsideObjectBrackets": null,
      "disallowImplicitTypeConversion": ["string"],

      "safeContextKeyword": "_this",

      "excludeFiles": [
        "test/data/**"
      ]
    })).on('error', function(e) {
      this.end();
    })
})
gulp.task('scripts', function() {//['jscs'] or ['test']
  gulp.src([
    './src/app/**/**/*.js',
    './src/vendor/**/**/*.js'
  ])
    .pipe($.jshint())
    // Use gulp-notify as jshint reporter
    // .pipe(notify("Found file: <%= file.relative %>!"))
    // .pipe($.jshint.reporter('default'));

    .pipe(map(function(file, cb) {
      // console.log('file.jshint', JSON.stringify(file.jshint,2));
      var message = '';
      if (!file.jshint.success) {
        var errors = file.jshint.results.map(function(data) {
          if (data.error) {
            return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason + '\n' +
              chalk.red('txmt://open?url=file://' + file.path + '&line='+data.error.line + '&column=' + data.error.character + '\n');
          }
        }).join('\n');
        message = file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
      }
      if(message!=='')
        console.log('message', message);
      cb(null, file);
    })
    );
  gulp.src(['src/app/**/*.jsx'])
    .pipe($.jshint())
    // Use gulp-notify as jshint reporter
    .pipe(notify({
      title: 'JSHint',
      message: function(file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }
      var errors = file.jshint.results.map(function(data) {
        if (data.error) {
          return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason + '\n' +
            'txmt://open?url=file://' + file.path + '&line='+data.error.line + '&column=' + data.error.character + '\n';
        }
      }).join('\n');
      return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
      }, wait:true
    }));
});

gulp.task('partials', function() {
  return gulp.src('src/{app, components}/**/*.html')
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

gulp.task('html', ['styles', 'scripts', 'partials'], function() {
  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src('src/*.html')
    .pipe($.preprocess({
      context: {
        ENV:'dist'
      }
    }))
    .pipe($.inject(gulp.src('.tmp/{app, components}/**/*.js'), {
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

gulp.task('fonts', function() {
  return gulp.src('src/assets/fonts/**/*')
  .pipe($.copy('dist/assets/fonts',{prefix:3}));
});

gulp.task('misc', function() {
  return gulp.src('src/**/*.ico')
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('myBower',function() {
  return gulp.src([
    'bower_components/**/*'
  ])
  .pipe($.copy('dist'));
});
gulp.task('copy', ['myBower','jsx', 'myEnv'],function() {
  return gulp.src([
    'src/app/**/*',
    'src/assets/**/*',
    'src/vendor/**/*.js',
    '.tmp/app/**/*.js'
  ])
    .pipe($.copy('dist', {prefix:1}));
});

var exec = require('child_process').exec;
gulp.task('requirejsBuild', ['jsx'], function() {
  $.requirejs({
    mainConfigFile: 'src/app/require.config.js',
    baseUrl: 'src/app',
    out: 'rjsBuild.js',
    name: 'require.config',
    build: true,
    include:['requireLib'],
    findNestedDependencies: true,
    generateSourceMaps:true,
    preserveLicenseComments:false,
    removeCombined: true,
    paths:{
      'requireLib':'../bower_components/requirejs/require',
      'env':'../../.tmp/app/env',
      'react/card': '../../.tmp/app/react/card',
      'react/cards': '../../.tmp/app/react/cards',
      'react/messages': '../../.tmp/app/react/messages',
      'react/matchDisplay': '../../.tmp/app/react/matchDisplay',
      'react/topCard': '../../.tmp/app/react/topCard'
    }
  })
  .pipe($.ngAnnotate({
    remove: false
  }))
  .pipe($.uglify({
    mangle: false,
    preserveComments: true
  }))
  .pipe(gulp.dest('./.tmp/app/')) // pipe it to the output DIR
  .pipe(gulp.dest('./dist/app/')); // pipe it to the output DIR
});

gulp.task('clean', function(done) {
  $.del(['.tmp', 'dist'], done);
});

gulp.task('build', [ 'html', 'fonts', 'misc', 'copy']);

gulp.task('dist', [ 'build', 'requirejsBuild']);
