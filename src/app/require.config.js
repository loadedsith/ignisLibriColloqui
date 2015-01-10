require.config({
  shim: {
    firebase: {
      exports: 'Firebase'
    },
    facebook: {
      exports: 'FB'
    },
    angular: {
      exports: 'angular'
    },
    'angular-cookies': {
      exports: 'angular-cookies',
      deps: [
        'angular'
      ]
    },
    'angular-mocks': {
      exports: 'angular-mocks',
      deps: [
        'angular'
      ]
    },
    'angular-ui-router': {
      exports: 'angular-ui-router',
      deps: [
        'angular'
      ]
    }
  },
  deps: [
    './main'
  ],
  paths: {
    'bezier-easing': '../bower_components/bezier-easing/bezier-easing',
    facebook: '//connect.facebook.net/en_US/all',
    angular: '../bower_components/angular/angular',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    firebase: '../bower_components/firebase/firebase',
    foundation: '../bower_components/foundation/js/foundation',
    fastclick: '../bower_components/fastclick/lib/fastclick',
    modernizr: '../bower_components/modernizr/modernizr',
    react: '../bower_components/react/react',
    requirejs: '../bower_components/requirejs/require',
    'requirejs-domready': '../bower_components/requirejs-domready/domReady',
  },
  packages: [

  ]
});
require(['fb']);


