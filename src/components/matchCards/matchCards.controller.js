
angular.module('ignisLibriColloqui')
  .controller('MatchCardsController', ['$scope', 'UserService', function ($scope, UserService) {
    'use strict';
    $scope.matches = function () {
      return UserService.matches;
    };
    
    $scope.swipeLeft = function (eventName, $event) {
      console.log('swipeLeft: eventName, $event', eventName, $event);
    };

    $scope.swipeRight = function (eventName, $event) {
      console.log('swipeRight: eventName, $event', eventName, $event);
    };
    
    $scope.date = new Date();
    
  }]);
