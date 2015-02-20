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
    'angular-scroll-glue': {
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
    'directives/directiveModule': 'directives/directiveModule',
    'components/componentModule': 'components/componentModule',
    'react/card': '/app/react/card',
    'react/cards': '/app/react/cards',
    'react/messages': '/app/react/messages',
    'react/matchDisplay': '/app/react/matchDisplay',
    'react/topCard': '/app/react/topCard',
    strings: '/app/strings',
    'services/serviceModule': '/app/services/serviceModule',
    'bezier-easing': '../bower_components/bezier-easing/bezier-easing',
    requestAnimationFrame: '../bower_components/requestAnimationFrame/app/requestAnimationFrame',
    facebook: '//connect.facebook.net/en_US/all',
    angular: '../bower_components/angular/angular',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    foundation: '../bower_components/foundation/js/foundation',
    fastclick: '../bower_components/fastclick/lib/fastclick',
    modernizr: '../bower_components/modernizr/modernizr',
    react: '../bower_components/react/react',
    requirejs: '../bower_components/requirejs/require',
    'requirejs-domready': '../bower_components/requirejs-domready/domReady',
    jquery: '../bower_components/jquery/dist/jquery',
    'jquery-placeholder': '../bower_components/jquery-placeholder/jquery.placeholder',
    'jquery.cookie': '../bower_components/jquery.cookie/jquery.cookie',
    'socket.io-client': '../bower_components/socket.io-client/socket.io',
    'ng-socket-gph': '/vendor/ng-socket-gph',
    'angular-scroll-glue': '../bower_components/angular-scroll-glue/src/scrollglue',
    'angular-xeditable': '../bower_components/angular-xeditable/dist/js/xeditable'
  },
  packages: [

  ]
});
require(['fb']);
