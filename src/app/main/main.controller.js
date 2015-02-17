define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MainController', [
    '$scope', '$timeout', 'FacebookService', 'StatusService', 'UserService', 'ILCServerService', 'Config',
    function($scope, $timeout, FacebookService, StatusService, UserService, ILCServerService, Config) {
      //ensure that status calls reference the current status
      $scope.loginWithFacebook = UserService.loginToFacebook;

      $scope.Strings = Config.strings;
      $scope.Config = Config;
      $scope.user = {};

      $scope.loggedIn = false;

      $scope.userId = "default user id, did facebook login fail?";

      StatusService.setStatus(StatusService.loading);

      var profileIncomplete = {
        text:'Please complete your profile before moving on.', //[Optional] Label text
        class:'status-profile-incomplete status-ready' // CSS Class available to angular, not automatically applied
      };

      var profileSaved = {
        text:'Profile updated.', //[Optional] Label text
        class:'status-profile-saved status-ready', // CSS Class available to angular, not automatically applied
        callback: function() {
          setTimeout(function() {
            StatusService.setStatus(StatusService.ready);
          }, 1000);
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
        if (!UserService.isProfileComplete()) {
          $scope.showProfile = true;
          StatusService.setStatus(profileIncomplete);
        }
      };
      $scope.$on('UserService:UpdateUserProfile', $scope.updateUserProfile);

      $scope.$on('UserService:UpdateMatchProfiles', function(event, value) {
        $scope.profiles = UserService.profiles;
      });

      $scope.$on('UserService:FacebookLoggedIn', function() {
        var userLoginState = UserService.checkLoginState();
        ILCServerService.login(UserService.auth);
        $scope.loggedIn=true;
      });

      $scope.$on('UserService:FacebookLoggedOut', function() {
        $scope.loggedIn=false;
      });

      $scope.$watch('showProfile',function(newValue, oldValue) {
        var complete = UserService.isProfileComplete();
        if (newValue === false) {
          if (complete !== true) {
            $scope.showProfile = true;
            var missing = complete;//if complete is not a true, it is then a list of what is missing from a valid profile
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
        $scope.currentTopic = UserService.currentTopic;
      });

      $scope.$on('UserService:FacebookLoginSuccess', function(event, user) {
        $scope.login();
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

      $scope.toggleNavBar = function(itemName, value) {
        var complete = UserService.isProfileComplete()
        if (complete === true) {
          if (itemName === 'matches'){
            $scope.toggleMatches(value);
          }
          if (itemName === 'messages') {
            $scope.toggleMessages(value);
          }
          if (itemName === 'profile'){
            $scope.toggleProfile(value);
          }
        }else{
          var missing = complete; //if complete is not a true, it is then a list of what is missing from a valid profile
          profileIncomplete.text = 'Please complete your profile before moving on. Missing: ' + missing.toString()
          StatusService.setStatus(profileIncomplete);
          $scope.toggleProfile(true);
        }
        if ($scope.showProfile  === false &&
            $scope.showMatches  === false &&
            $scope.showMessages === false
        ){
          $scope.toggleNavBar(Config.defaultView || 'profile',true);
        }
      };

      $scope.toggleNavBar(Config.defaultView || 'profile',true);

      console.log('Config.defaultView', Config.defaultView);

      $scope.parseInt = parseInt;

      $scope.login = function() {
        var userLoginState = UserService.checkLoginState();
        userLoginState.then(function(response) {
          //logged in
          StatusService.setStatus(StatusService.ready);// TODO: set status to  "connected to facebook, trying ILC server"
          ILCServerService.login(response.authResponse.accessToken);
          $scope.userId = response.authResponse.userID;
        }, function(response) {
          StatusService.setStatus(StatusService.ready);
          console.log('maincontroller responding to facebook login fail', response);
        });
      }

      $scope.login();
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
