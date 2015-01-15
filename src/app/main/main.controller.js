define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MainController', [
    '$scope', '$timeout', 'FacebookService', 'StatusService', 'FirebaseService', 'UserService', 'Config',
    function($scope, $timeout, FacebookService, StatusService, FirebaseService, UserService, Config) {
      console.log('MainController');
      //ensure that status calls reference the current status
      $scope.Strings = Config.strings;

      StatusService.setStatus(StatusService.loading);

      $scope.status = function() {
        return StatusService.status;
      };

      $scope.userUpdate = function (user) {
        $scope.user = user;
      }
      
      UserService.addListener('update', $scope.userUpdate)

      UserService.checkLoginState();

      if (window.location.host === 'localhost:3000') {
        var useRealHostToTestFacebook = {
          text:'You must use example.com:3000 to test Facebook integration',
          class:'status-error',
          action: function() {
            window.location.host = 'example.com:3000';
          }
        };
        StatusService.setStatus(useRealHostToTestFacebook);
      }

      $scope.messageInput = function() {//extra attr; e
        FirebaseService.chatRef.push({
          name: $scope.name,
          message: $scope.message
        });
        $scope.message = '';
      };
    }]);
});
