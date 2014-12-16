'use strict';

angular.module('ignisLibriColloqui', ['ui.router', 'ignisLibriColloqui.Facebook', 'ignisLibriColloqui.Firebase', 'ignisLibriColloqui.Directives'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
