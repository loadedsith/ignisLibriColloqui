var skips = ['/base/src/app/services/facebookService.spec.js'];
var tests = [];
for (var file in window.__karma__.files) {
    if (/spec\.js$/.test(file)) {
      console.log('file', file);
      for (var i = skips.length - 1; i >= 0; i--) {
        var skip = skips[i];
        if (file !== skip) {
          tests.push(file);
        }
      }
    }
}

require.config({
  baseUrl:'/base',
  shim: {
    facebook: {
      exports: 'FB'
    },
    angular: {
      exports: 'angular'
    },
    'angular-xeditable': {
      deps: [
        'angular'
      ]
    },
    'ng-socket-gph': {
      deps: [
        'angular',
        'src/app/startSocketIo'
      ]
    },
    react:{
      deps:[
      'test/reactPolyfillForPhantomJS'
      ]
    },
    'angularCookies': {
      exports: 'angularCookies',
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
      exports: 'angular-ui-router432',
      deps: [
        'angular'
      ]
    },
    'mockUserProfile': {
      exports: 'mockUserProfile'
    }
  },
  deps: tests,
  paths: {
    'mockUserProfile':'test/mock/userProfile',

    'env': '.tmp/app/env',
    'fb': 'src/app/fb',
    'config': 'src/app/config',
    'strings': 'src/app/strings',

    'messages/messages.controller': 'src/app/messages/messages.controller',
    'profile/profile.controller': 'src/app/profile/profile.controller',
    'interestsSelector/interestsSelector.controller': 'src/app/interestsSelector/interestsSelector.controller',
    'matches/matches.controller': 'src/app/matches/matches.controller',
    'ilcServerTest/ilcServerTest.controller': 'src/app/ilcServerTest/ilcServerTest.controller',

    'controllerModule': 'src/app/controllerModule',
    'controllerIndex': 'src/app/controllerIndex',
    'main.controller': 'src/app/main.controller',
    'messagesList.controller': 'src/app/components/messagesList/messagesList.controller',
    'messagesTest.controller': 'src/app/messagesTest/messagesTest.controller',
    'cardTest.controller': 'src/app/cardTest/cardTest.controller',
    'cardTest/cardTest.controller': 'src/app/cardTest/cardTest.controller',
    'messagesTest/messagesTest.controller': 'src/app/messagesTest/messagesTest.controller',
    'messagesListTest/messagesListTest.controller': 'src/app/messagesListTest/messagesListTest.controller',
    'messagesListTest.controller': 'src/app/messagesListTest/messagesListTest.controller',

    'components/componentIndex': 'src/app/components/componentIndex',
    'components/componentModule': 'src/app/components/componentModule',
    'components/navbar/navbar.controller': 'src/app/components/navbar/navbar.controller',
    'components/matchCards/matchCards.controller': 'src/app/components/matchCards/matchCards.controller',
    'components/user/user.controller': 'src/app/components/user/user.controller',
    'components/cards/cards.controller': 'src/app/components/cards/cards.controller',
    'components/messages/messages.controller': 'src/app/components/messages/messages.controller',
    'components/messagesList/messagesList.controller': 'src/app/components/messagesList/messagesList.controller',

    'services/serviceModule': '/base/src/app/services/serviceModule',
    'services/serviceIndex': 'src/app/services/serviceIndex',
    'services/userService':'src/app/services/userService',
    'services/facebookService':'src/app/services/facebookService',
    'services/messagesService':'src/app/services/messagesService',
    'services/ilcServerService':'src/app/services/ilcServerService',
    'services/statusService':'src/app/services/statusService',

    'messages-gph': 'src/app/directives/fastRepeat',

    'directives/messages-gph': 'src/app/directives/messages-gph',
    'directives/cards-gph': 'src/app/directives/cards-gph',
    'directives/card-gph': 'src/app/directives/card-gph',
    'directiveModule': 'src/app/directives/directiveModule',
    'directives/directiveModule': 'src/app/directives/directiveModule',
    'directiveIndex': 'src/app/directives/directiveIndex',
    'directives/directiveIndex': 'src/app/directives/directiveIndex',

    'react/topCard': '.tmp/app/react/topCard',
    'react/matchDisplay': '.tmp/app/react/matchDisplay',
    'react/card': '.tmp/app/react/card',
    'react/cards': '.tmp/app/react/cards',
    'react/messages': '.tmp/app/react/messages',

    'ignisLibriColloqui': 'src/app/ignisLibriColloqui',
    'main': 'src/app/main',

    'socket.io-client': 'bower_components/socket.io-client/socket.io',
    'angular-xeditable': 'bower_components/angular-xeditable/dist/js/xeditable',
    'ng-socket-gph': 'src/vendor/ng-socket-gph',
    // 'ng-socket': 'bower_components/ng-socket/ngSocket',
    'bezierEasing': 'bower_components/bezier-easing/bezier-easing',
    facebook: 'test/vendor/mockFb',
    // facebook: '//connect.facebook.net/en_US/all',
    angular: 'bower_components/angular/angular',
    'angularCookies': 'bower_components/angular-cookies/angular-cookies',
    'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
    'angularUiRouter': 'bower_components/angular-ui-router/release/angular-ui-router',
    foundation: 'bower_components/foundation/js/foundation',
    requestAnimationFrame: 'bower_components/requestAnimationFrame/app/requestAnimationFrame',
    fastclick: 'bower_components/fastclick/lib/fastclick',
    modernizr: 'bower_components/modernizr/modernizr',
    react: 'bower_components/react/react',
    requirejs: 'bower_components/requirejs/require',
    'requirejs-domready': 'bower_components/requirejs-domready/domReady',
    jquery: 'bower_components/jquery/dist/jquery',
    'jquery-placeholder': 'bower_components/jquery-placeholder/jquery.placeholder',
    'jquery.cookie': 'bower_components/jquery.cookie/jquery.cookie'
  },
  packages: [

  ],
  callback: window.__karma__.start

});
require(['fb']);