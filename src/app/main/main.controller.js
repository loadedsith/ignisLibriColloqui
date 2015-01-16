define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MainController', [
    '$scope', '$timeout', 'FacebookService', 'StatusService', 'FirebaseService', 'UserService', 'Config',
    function($scope, $timeout, FacebookService, StatusService, FirebaseService, UserService, Config) {
      console.log('MainController');
      //ensure that status calls reference the current status
      $scope.Strings = Config.strings;
      $scope.user = {};

      StatusService.setStatus(StatusService.loading);

      $scope.$on('StatusService:Update', function(event, status) {
        $scope.status = status;
      });
      $scope.$on('UserService:Update', function(event, user) {
        $scope.user = user;
      });

      $scope.showMatches = (Config.showMatches || false);

      $scope.showMessages = (Config.showMessages || false);

      $scope.toggleMatches = function(value) {
        if (value === undefined) {
          $scope.showMatches = !$scope.showMatches;
        } else {
          $scope.showMatches = !!value;
        }
        if ($scope.showMatches) {
          $scope.showMessages = false;
        }
      };

      $scope.toggleMessages = function(value) {
        if (value === undefined) {
          $scope.showMessages = !$scope.showMessages;
        } else {
          $scope.showMessages = !!value;
        }
        if ($scope.showMessages) {
          $scope.showMatches = false;
        }
      };

      var userLoginState = UserService.checkLoginState();

      userLoginState.then(function(response) {
        StatusService.setStatus(StatusService.ready);
        console.log('maincontroller responding to facebook login succcess', response);
      }, function(response) {
        StatusService.setStatus(StatusService.ready);
        console.log('maincontroller responding to facebook login fail', response);
      });

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

    }]);
});
