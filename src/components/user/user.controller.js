'use strict';

angular.module('ignisLibriColloqui')
  .controller('UserController', ['$scope','UserService', function ($scope, UserService) {

    console.log('UserController- UserService:', UserService);
    
    $scope.checkLoginState = UserService.checkLoginState;
    
    $scope.loginToFacebook = UserService.loginToFacebook;
    
    $scope.loggedIn = function () {
      return UserService.loggedIn;
    };
    
    $scope.loginStatus = function () {
      return UserService.loginStatus;
    };
    
    $scope.user = function () {
      return UserService.info;
    };
    
    $scope.profilePicture = function () {
      return UserService.profilePicture;
    };
    
  }]);
