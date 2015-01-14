var tests = [];
for (var file in window.__karma__.files) {
    if (/spec\.js$/.test(file)) {
        tests.push(file);
    }
}
require.config({
  baseUrl:'/base',
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
    react:{
      deps:[
      'test/reactPolyfillForPhantomJS'
      ]
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
  deps: tests,
  paths: {
    'env': '.tmp/app/env',
    'fb': 'src/app/fb',
    'config': 'src/app/config',
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
    'navbar.controller': 'src/app/components/navbar/navbar.controller',
    'matchCards.controller': 'src/app/components/matchCards/matchCards.controller',
    'user.controller': 'src/app/components/user/user.controller',
    'cards.controller': 'src/app/components/cards/cards.controller',
    'user.controller': 'src/app/components/user/user.controller',
    'navbar.controller': 'src/app/components/navbar/navbar.controller',
    '../components/navbar/navbar.controller': 'src/components/navbar/navbar.controller',
    '../components/matchCards/matchCards.controller': 'src/components/matchCards/matchCards.controller',
    '../components/user/user.controller': 'src/components/user/user.controller',
    '../components/cards/cards.controller': 'src/components/cards/cards.controller',
    '../components/messages/messages.controller': 'src/components/messages/messages.controller',
    '../components/messagesList/messagesList.controller': 'src/components/messagesList/messagesList.controller',
    'userManagement.controller': 'src/components/userManagement/userManagement.controller',
    'services/serviceModule': '/base/src/app/services/serviceModule',
    'services/serviceIndex': 'src/app/services/serviceIndex',
    'services/userService':'src/app/services/userService',
    'services/userManagementService':'src/app/services/userManagementService',
    'services/firebaseService':'src/app/services/firebaseService',
    'services/facebookService':'src/app/services/facebookService',
    'services/statusService':'src/app/services/statusService',
    'services/matchMakerService':'src/app/services/matchMakerService',
    'fastRepeat': 'src/app/directives/fastRepeat',
    'directives/fastRepeat': 'src/app/directives/fastRepeat',
    'directives/cards-gph': 'src/app/directives/cards-gph',
    'directives/card-gph': 'src/app/directives/card-gph',
    'directiveModule': 'src/app/directives/directiveModule',
    'directives/directiveModule': 'src/app/directives/directiveModule',
    'directiveIndex': 'src/app/directives/directiveIndex',
    'directives/directiveIndex': 'src/app/directives/directiveIndex',
    'react/matchDisplay': '.tmp/app/react/matchDisplay',
    'react/card': '.tmp/app/react/card',
    'react/cards': '.tmp/app/react/cards',
    'react/messages': '.tmp/app/react/messages',
    'ignisLibriColloqui': 'src/app/ignisLibriColloqui',
    'main': 'src/app/main',
    
    'bezier-easing': 'bower_components/bezier-easing/bezier-easing',
    facebook: '//connect.facebook.net/en_US/all',
    angular: 'bower_components/angular/angular',
    'angular-cookies': 'bower_components/angular-cookies/angular-cookies',
    'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
    'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
    firebase: 'bower_components/firebase/firebase',
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