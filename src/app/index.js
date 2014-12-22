'use strict';

angular.module('ignisLibriColloqui', ['ui.router','ngCookies','gajus.swing', 'ignisLibriColloqui.Facebook','ignisLibriColloqui.User','ignisLibriColloqui.UserManagement', 'ignisLibriColloqui.Firebase', 'ignisLibriColloqui.Status', 'ignisLibriColloqui.Directives', 'ignisLibriColloqui.MatchMaker'])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      });

    $urlRouterProvider.otherwise('/');
  });
