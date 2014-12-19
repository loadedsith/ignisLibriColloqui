'use strict';

angular.module('ignisLibriColloqui')
  .controller('UserController', ['$scope','UserService', function ($scope, UserService) {

    console.log('UserController- UserService:', UserService);
    
    
    $scope.test = '123;';
    
    $scope.loggedIn = function () {
      console.log('grubby Barber sailfish');
      return UserService.loggedIn + 'test';
    };
    
    
  }]);
