define(['ignisLibriColloqui'], function(ignisLibriColloqui) {
  'use strict';
  return ignisLibriColloqui.config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      })
      .state('cardTest', {
        url: '/cardTest',
        templateUrl: 'app/cardTest/cardTest.html',
        controller: 'CardTestController'
      })
      .state('messagesTest', {
        url: '/messagesTest',
        templateUrl: 'app/messagesTest/messagesTest.html',
        controller: 'MessagesTestController'
      })
      .state('messagesListTest', {
        url: '/messagesListTest',
        templateUrl: 'app/messagesListTest/messagesListTest.html',
        controller: 'MessagesListTestController'
      })
      .state('ilcServerTest', {
        url: '/ilcServerTest',
        templateUrl: 'app/ilcServerTest/ilcServerTest.html',
        controller: 'ILCServerTestController'
      });

    $urlRouterProvider.when('', '/home');
    $urlRouterProvider.otherwise('/home');
  }]);
});
