'use strict';

module.exports = function(config) {

  config.set({
    basePath : '..',

    files : [
        {pattern: 'bower_components/**/*.js', included: false},
        {pattern: 'src/{app, components}/**/*.js', included: false},
        {pattern: '.tmp/{app, components}/**/*.js', included: false},
        {pattern: 'test/**/*spec.js', included: false},
        'test/require.config.test.js',
        'test/reactPolyfillForPhantomJS.js'
    ],
    exclude : [
      'src/app/env.pre.js',
      'src/app/main.js'
    ],
    autoWatch : false,
    // browserNoActivityTimeout: 100000,
    // logLevel: config.LOG_DEBUG,
    singleRun: false,

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
        'karma-requirejs',
        'karma-jasmine'
    ]
  });

};
