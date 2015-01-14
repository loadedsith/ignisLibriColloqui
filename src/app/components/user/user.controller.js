'use strict';
define(['controllerModule', 'angular'], function(controllers) {
  controllers
    .controller('UserController', ['$scope', 'UserService', function($scope, UserService) {

      console.log('UserController- UserService:', UserService);
      $scope.debugUser = false;
      $scope.checkLoginState = UserService.checkLoginState;

      $scope.userInitialized = function() {
        if ($scope.user() === undefined) {
          return false;
        }
        if ($scope.user().id === undefined) {
          return false;
        }
        return true;
      };

      $scope.loginToFacebook = UserService.loginToFacebook;

      $scope.loggedIn = function() {
        return UserService.loggedIn;
      };

      $scope.loginStatus = function() {
        return UserService.loginStatus;
      };

      $scope.user = function() {
        return UserService.info;
      };

      $scope.profilePicture = function() {
        return UserService.user.profilePicture;
      };

    }]);
});
