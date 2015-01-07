require.config({
  shim: {
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
    'angular-swing': {
      exports: 'angular-swing',
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
    './fb',
    './main'
  ],
  paths: {
    facebook: '//connect.facebook.net/en_US/all',
    angular: '../bower_components/angular/angular',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
    'angular-swing': '../bower_components/angular-swing/dist/angular-swing.min',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    firebase: '../bower_components/firebase/firebase',
    foundation: '../bower_components/foundation/js/foundation',
    fastclick: '../bower_components/fastclick/lib/fastclick',
    jquery: '../bower_components/jquery/dist/jquery',
    'jquery-placeholder': '../bower_components/jquery-placeholder/jquery.placeholder',
    'jquery.cookie': '../bower_components/jquery.cookie/jquery.cookie',
    modernizr: '../bower_components/modernizr/modernizr',
    react: '../bower_components/react/react',
    require: '../bower_components/require/build/require.min',
    requirejs: '../bower_components/requirejs/require',
    'requirejs-domready': '../bower_components/requirejs-domready/domReady'
  },
  packages: [

  ]
});

