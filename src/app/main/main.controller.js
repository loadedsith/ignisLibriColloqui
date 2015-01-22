define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MainController', [
    '$scope', '$timeout', 'FacebookService', 'StatusService', 'FirebaseService', 'UserService', 'ILCServerService', 'Config',
    function($scope, $timeout, FacebookService, StatusService, FirebaseService, UserService, ILCServerService, Config) {
      console.log('MainController');
      //ensure that status calls reference the current status
      $scope.Strings = Config.strings;
      $scope.user = {};
      
      $scope.userId = "default user id, did facebook login fail?";
      
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
      
      $scope.messageInput = function(message, successCallback) {
        console.log('send message: ', message);
        if(typeof successCallback === 'function'){
          successCallback();
        }
      }
      
      $scope.useIlcServer = true;
      
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

      $scope.parseInt = parseInt;

      var userLoginState = UserService.checkLoginState();

      userLoginState.then(function(response) {
        StatusService.setStatus(StatusService.ready);// TODO: set status to  "connected to facebook, trying ILC server"
        ILCServerService.login(response.authResponse.accessToken);
        $scope.userId = response.authResponse.userID;
        console.log('maincontroller responding to facebook login succcess, sending request to ILC Server');
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
