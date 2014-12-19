'use strict';

angular.module('ignisLibriColloqui', ['ui.router','ngCookies', 'ignisLibriColloqui.Facebook','ignisLibriColloqui.User','ignisLibriColloqui.UserManagement', 'ignisLibriColloqui.Firebase', 'ignisLibriColloqui.Status', 'ignisLibriColloqui.Directives'])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      });

    $urlRouterProvider.otherwise('/');
  });
