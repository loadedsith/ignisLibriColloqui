define(['./ignisLibriColloqui'],function(ignisLibriColloqui){
  'use strict';
  
  return ignisLibriColloqui.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
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
      });

      $urlRouterProvider.when('', '/cardTest');

      
    $urlRouterProvider.otherwise('/cardTest');
  }]);
});
