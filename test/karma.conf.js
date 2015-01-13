'use strict';

module.exports = function(config) {

  config.set({
    basePath : '..', //!\\ Ignored through gulp-karma //!\\

    files : [ //!\\ Ignored through gulp-karma //!\\
        // 'src/bower_components/angular/angular.js',
        // 'src/bower_components/angular/angular-route.js',
        // 'src/bower_components/angular-mocks/angular-mocks.js',
        // {pattern: 'node_modules/**/*.js', included: false},
        {pattern: 'bower_components/**/*.js', included: false},
        {pattern: 'src/{app,components}/**/*.js', included: false},
        {pattern: '.tmp/{app,components}/**/*.js', included: false},
        {pattern: 'test/**/*spec.js', included: false},
        // 'src/{app,components}/** /*.js',
        // 'test/unit/** /*.js',
        'test/require.config.test.js'
    ],
    exclude : [
      // 'node_modules/**/*.js',
      'src/app/env.pre.js',
      'src/app/main.js'
    ],
    autoWatch : false,
    browserNoActivityTimeout: 100000,
    logLevel: config.LOG_DEBUG,

    frameworks: ['jasmine','requirejs'],

    preprocessors: {
      '**/*.jsx': ['react']
    },
// you can define custom flags
    // customLaunchers: {
      // Chrome_without_security: {
      //   base: 'Chrome',
      //   flags: ['--disable-web-security']
      // }
    // },
    browsers: ['Chrome'],//'Chrome_without_security'

    hostname:'example.com',//example.com has been added to etc/hosts as the localhost, it is also registered with the app on the Facebook API 

    plugins : [
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-requirejs',
        'karma-jasmine'
    ]
  });

};
