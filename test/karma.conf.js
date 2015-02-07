'use strict';

module.exports = function(config) {

  config.set({
    basePath : '..',

    files : [
        {pattern: 'bower_components/**/*.js', included: false},
        {pattern: 'src/components/**/*.js', included: false,watched: true},
        {pattern: 'src/app/**/*.js', included: false,watched: true},
        {pattern: '.tmp/components/**/*.js', included: false},
        {pattern: '.tmp/app/**/*.js', included: false},
        {pattern: 'test/**/*spec.js', included: false,watched: true},
        {pattern: 'test/vendor/*.js',included: false},
        {pattern: 'test/mock/*.js',included: false},
        'test/require.config.test.js',
        'test/reactPolyfillForPhantomJS.js'
    ],
    exclude : [
      'src/app/env.pre.js',
      'src/app/main.js'
    ],
    // autoWatch : false,
    // browserNoActivityTimeout: 100000,
    // logLevel: config.LOG_DEBUG,
    // singleRun: false,
    // background:true,

    reporters: ['mocha'],

    // mochaReporter: {
   //    output: 'autowatch'
   //  },
   //
   frameworks: ['jasmine', 'requirejs'],

    preprocessors: {
      '**/*.jsx': ['react']
    },
    // you can define custom flags
    /* customLaunchers: {
       Chrome_without_security: {
         base: 'Chrome',
         flags: ['--disable-web-security']
       }
     },*/
    browsers: ['PhantomJS'], //'Chrome', 'Chrome_without_security'

    //example.com has been added to etc/hosts as the localhost,
    //it is also registered with the app on the Facebook API
    hostname:'example.com',

    plugins : [
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-mocha-reporter',
        'karma-requirejs',
        'karma-jasmine'
    ]
  });

};
