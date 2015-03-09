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

var textmateReporter = function(file) {
  if (!file.scsslint.success) {
    $.util.log(chalk.bgYellow('  ' + file.scsslint.issues.length + ' issues found in ' + file.path + '  '));
    for (var i = file.scsslint.issues.length - 1; i >= 0; i--) {
      var issue = file.scsslint.issues[i];

      var protocol = 'txmt://open?url=file://';
      var line = '&line=' + issue.line;
      var column = '&column=' + issue.column;

      var path = protocol + file.history + line + column;
      var reason = issue.reason;
      if (reason.indexOf('Properties should be ordered') !== -1) {
        reason = reason.replace('Properties should be ordered', chalk.yellow('Properties should be ordered'));
      }
      $.util.log(chalk.red(reason) + '\n' +
        chalk.underline(path) + '\n');
    }
  }
};

//load your custom env.json file,
var env;
var mode;
//use (process.env or {}) then .mode
if ((process.env || {}).mode !== 'heroku') {
  env = require('../env.json');
  mode = 'dev';
} else {
  mode = 'heroku';
}

gulp.task('styles', [],  function() {
  var scssLint = $.util.noop();
  if (mode !== 'heroku') {
    scssLint = $.scssLint({
      customReport: textmateReporter
    });
    $.util.log(chalk.red('dev styles'));
  } else {
    $.util.log(chalk.red('heroku styles'));
  }

  return gulp.src('src/app/**/*.scss')
    .pipe(scssLint)
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
  exec(command, function(error, stdout) { callback(stdout); });
}

notify.on('click', function(options) {
  var message = options.message;
  var lines = message.split('\n');
  var txmtUrl = lines[lines.length - 2];
  //-2 because there's an extra '\n' on the messages so we dont actually want the last line
  execute('open ' + txmtUrl, function() {
    // console.log('opening in TextMate');
  });
});

gulp.task('jscs', function() {
  return gulp.src([
    'src/app/**/*.js',
    'gulpfile.js',
    'gulp/**/*.js'
    ])
    .pipe($.jscs({
      'preset': 'google',
      'fileExtensions': [
        '.js',
        'jscs'
      ],

      'requireParenthesesAroundIIFE': true,
      'maximumLineLength': 120,
      'validateLineBreaks': null,
      'validateIndentation': 2,

      'disallowKeywords': ['with'],
      'disallowSpacesInsideObjectBrackets': null,
      'disallowImplicitTypeConversion': ['string'],

      'safeContextKeyword': '_this',

      'excludeFiles': [
        'test/data/**'
      ]
    })).on('error', function() {//args: e
        // $.util.log('jscs e: ', e);
      this.end();
    });
});

var jshintReporter = function(file, cb) {

  var message = '';
  if (!file.jshint.success) {
    var errors = file.jshint.results.map(function(data) {
      if (data.error) {

        var id;
        switch (data.error.id) {
          case '(error)':
            id = chalk.red('  🚫  ');
            break;
          default:
            id = chalk.yellow('  [' + data.error.id + ']');
            break;
        }

        var result = [];

        data.error.evidence = chalk.yellow(data.error.evidence);
        var evidence = data.error.evidence.replace(data.error.a, chalk.underline(data.error.a));

        if (evidence !== data.error.evidence) {
          result.push('  🔍  ' + chalk.reset(evidence));
        }

        result.push(id + chalk.reset(data.error.reason));

        var protocol = 'txmt://open?url=file://';
        var line = '&line=' + data.error.line;
        var column = '&column=' + data.error.character;

        var link = chalk.red(chalk.underline(protocol + file.path + line + column));

        result.push('  🔗  ' + link);

        return result.join('\n') + '\n';
      }
    }).join('\n');
    message = file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
  }
  //else {
    // $.util.log('👍  ' + chalk.dim(chalk.green(file.relative)));
  // }

  if (message !== '') {
    console.log('💾  ' + chalk.yellow(message));
  }

  cb(null, file);
};

gulp.task('scripts', ['jscs'], function() {//['jscs'] or ['test']
  var myHinter = $.util.noop();

  if (mode !== 'heroku') {
    $.util.log(chalk.red('dev scripts'));
    myHinter = $.jshint();
  }
  var one = gulp.src([
    './gulpfile.js',
    './gulp/**/*.js',
    './src/app/**/**/*.js',
    './src/vendor/**/**/*.js'
  ])
    .pipe(myHinter)
    // Use gulp-notify as jshint reporter
    // .pipe(notify('Found file: <%= file.relative %>!'))
    // .pipe($.jshint.reporter('default'));
    .pipe(map(jshintReporter));
  var two = gulp.src(['src/app/**/*.jsx'])
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
            var protocol = 'txmt://open?url=file://';
            var line = '&line=' + data.error.line;
            var column = '&column=' + data.error.character;
            return data.error.reason + '\n' +
              protocol + file.path + line + column + '\n';
          }
        }).join('\n');
        return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
      }, wait:true}
    ));
  return $.merge(one, two);
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
  .pipe($.copy('dist/assets/fonts', {prefix: 3}));
});

gulp.task('misc', function() {
  return gulp.src('src/**/*.ico')
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('myBower', function() {
  return gulp.src([
    'bower_components/**/*'
  ])
  .pipe($.copy('dist'));
});

gulp.task('copy', ['myBower', 'jsx', 'myEnv'], function() {
  return gulp.src([
    'src/app/**/*',
    'src/assets/**/*',
    'src/vendor/**/*.js',
    '.tmp/app/**/*.js'
  ])
    .pipe($.copy('dist', {prefix:1}));
});

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

gulp.task('build', ['html', 'fonts', 'misc', 'copy']);

gulp.task('dist', ['build', 'requirejsBuild']);
