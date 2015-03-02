require.config({
  shim: {
    facebook: {
      exports: 'FB'
    },
    'angular': {
      exports: 'angular'
    },
    'angularCookies': {
      exports: 'angularCookies',
      deps: [
        'angular'
      ]
    },
    'ng-socket-gph': {
      deps: [
        './startSocketIo',
        'angular'
      ]
    },
    'angular-xeditable': {
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
    'angularUiRouter': {
      exports: 'angularUiRouter',
      deps: [
        'angular'
      ]
    }
  },
  deps: [
    './main'
  ],
  paths: {
    'directives/directiveModule': 'directives/directiveModule',
    'components/componentModule': 'components/componentModule',
    'react/card': 'react/card',
    'react/cards': 'react/cards',
    'react/messages': 'react/messages',
    'react/matchDisplay': 'react/matchDisplay',
    'react/topCard': 'react/topCard',
    strings: 'strings',
    'services/serviceModule': 'services/serviceModule',
    'bezierEasing': '../bower_components/bezier-easing/index',
    requestAnimationFrame: '../bower_components/requestAnimationFrame/app/requestAnimationFrame',
    facebook: '//connect.facebook.net/en_US/all',
    // facebook: '//connect.facebook.net/en_US/all/debug',
    angular: '../bower_components/angular/angular',
    'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
    'angularUiRouter': '../bower_components/angular-ui-router/release/angular-ui-router',
    foundation: '../bower_components/foundation/js/foundation',
    fastclick: '../bower_components/fastclick/lib/fastclick',
    modernizr: '../bower_components/modernizr/modernizr',
    react: '../bower_components/react/react',
    requirejs: '../bower_components/requirejs/require',
    'requirejs-domready': '../bower_components/requirejs-domready/domReady',
    jquery: '../bower_components/jquery/dist/jquery',
    'jquery-placeholder': '../bower_components/jquery-placeholder/jquery.placeholder',
    'jquery.cookie': '../bower_components/jquery.cookie/jquery.cookie',
    'angularCookies': '../bower_components/angular-cookies/angular-cookies',
    'socket.io-client': '../bower_components/socket.io-client/socket.io',
    'ng-socket-gph': '../vendor/ng-socket-gph',
    'angular-xeditable': '../bower_components/angular-xeditable/dist/js/xeditable'
  },
  packages: [

  ]
});
require(['fb']);
