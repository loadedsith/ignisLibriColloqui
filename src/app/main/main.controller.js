define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MainController', [
    '$scope', '$timeout', 'FacebookService', 'StatusService', 'FirebaseService', 'UserService', 'ILCServerService', 'Config',
    function($scope, $timeout, FacebookService, StatusService, FirebaseService, UserService, ILCServerService, Config) {
      //ensure that status calls reference the current status
      $scope.Strings = Config.strings;
      $scope.user = {};

      $scope.userId = "default user id, did facebook login fail?";

      StatusService.setStatus(StatusService.loading);

      var profileIncomplete = {
        text:'Please complete your profile before moving on.', //[Optional] Label text
        class:'status-profile-incomplete' // CSS Class available to angular, not automatically applied
      };

      var profileSaved = {
        text:'Profile saved.', //[Optional] Label text
        class:'status-profile-saved', // CSS Class available to angular, not automatically applied
        callback: function() {
          setTimeout(function() {
            StatusService.setStatus(StatusService.ready);
          }, 250);
        }
      };

      $scope.updateUserProfile = function(event, user) {
        $scope.updatingProfile = true;
        StatusService.setStatus(StatusService.loading);

        ILCServerService.setProfile(user).then(function() {
          $scope.updatingProfile = false;
          StatusService.setStatus(profileSaved);
          $scope.$broadcast('user profile updated');
        });

        $scope.user.profile = user.profile;
        if ((user.profile.interests||[]).length === 0){
          $scope.showProfile = true;
          StatusService.setStatus(profileIncomplete);
        }
      };

      $scope.$on('UserService:UpdateUserProfile', $scope.updateUserProfile);

      $scope.$watch('showProfile',function(newValue, oldValue) {
        var complete = UserService.isProfileComplete();
        if (newValue === false) {
          if (complete !== true) {
            $scope.showProfile = true;
            var missing = complete;
            profileIncomplete.text = 'Please complete your profile before moving on. Missing: ' + missing.toString()
            StatusService.setStatus(profileIncomplete);
          }
        }
      });

      $scope.$on('StatusService:Update', function(event, status) {
        $scope.status = status;
      });

      $scope.$on('UserService:Update', function(event, user) {
        $scope.user = user;
      });

      $scope.showMatches = (Config.showMatches || false);

      $scope.showMessages = (Config.showMessages || false);

      $scope.showProfile = (Config.showProfile || false);

      $scope.toggleProfile = function(value) {
        if (value === undefined) {
          $scope.showProfile = !$scope.showProfile;
        } else {
          $scope.showProfile = !!value;
        }
        if ($scope.showProfile) {
          $scope.showMessages = false;
          $scope.showMatches = false;
        }
      };

      $scope.toggleMatches = function(value) {
        if (value === undefined) {
          $scope.showMatches = !$scope.showMatches;
        } else {
          $scope.showMatches = !!value;
        }
        if ($scope.showMatches) {
          $scope.showMessages = false;
          $scope.showProfile = false;
        }
      };

      $scope.useIlcServer = true;

      $scope.toggleMessages = function(value) {
        if (value === undefined) {
          $scope.showMessages = !$scope.showMessages;
        } else {
          $scope.showMessages = !!value;
        }
        if ($scope.showMessages) {
          $scope.showMatches = false;
          $scope.showProfile = false;
        }
      };

      $scope.$on('MatchCard:AvailableForProcessing', function(event, match) {
        ILCServerService.getProfile(match.facebookId);
      });

      $scope.parseInt = parseInt;

      var userLoginState = UserService.checkLoginState();

      userLoginState.then(function(response) {
        StatusService.setStatus(StatusService.ready);// TODO: set status to  "connected to facebook, trying ILC server"
        ILCServerService.login(response.authResponse.accessToken);
        $scope.userId = response.authResponse.userID;
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
