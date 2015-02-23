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

      $scope.userId = 'default user id, did facebook login fail?';
      $scope.disconnectedStatus = {
        text:'🚫 Disconnected from server. Try reconnecting?', //[Optional] Label text
        class:'status status-disconnected', // CSS Class available to angular, not automatically applied
        action: function() {
          $scope.login();
        },
      };
      $scope.connectionEvent = function(event, value) {
        console.log('connectionEvent: event, value:', event, value);
        switch (event) {
        case 'disconnect':
          StatusService.setStatus($scope.disconnectedStatus);
          break;
        case 'timeout':
          StatusService.setStatus($scope.disconnectedStatus);
          break;
        case 'error':
          StatusService.setStatus($scope.disconnectedStatus);
          break;
        default:
          StatusService.setStatus(StatusService.ready);
          break;
        }

      }

      ILCServerService.connectTimeoutEvent = $scope.connectionEvent.bind(this, 'timeout');
      ILCServerService.connectErrorEvent = $scope.connectionEvent.bind(this, 'error');
      ILCServerService.disconnectEvent = $scope.connectionEvent.bind(this, 'disconnect');
      ILCServerService.connectedEvent = $scope.connectionEvent.bind(this, 'connected');

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

      $scope.disconnectMe = ILCServerService.disconnectMe;

      $scope.lastUserProfile;
      $scope.updateUserProfile = function(event, user) {
        $scope.user.profile = user.profile;
        if (!UserService.isProfileComplete()) {
          $scope.showProfile = true;
          StatusService.setStatus(profileIncomplete);
        }
        ILCServerService.setProfile(user).then(function() {
          $scope.updatingProfile = false;
          StatusService.setStatus(profileSaved);
          $scope.$broadcast('user profile updated');
        });
      };

      $scope.$on('ProfileController:UpdateUserProfile', function(event, user) {
        ILCServerService.setProfile(user).then(function() {
          $scope.updatingProfile = false;
          StatusService.setStatus(profileSaved);
          $scope.$broadcast('user profile updated');
        });
      });

      $scope.$on('UserService:UpdateUserProfile', $scope.updateUserProfile);

      $scope.$on('UserService:UpdateMatchProfiles', function(event, value) {
        $scope.profiles = UserService.profiles;
      });

      $scope.$on('UserService:FacebookLoggedIn', function() {
        $scope.loggedIn = true;
      });

      $scope.$on('UserService:FacebookLoggedOut', function() {
        ILCServerService.disconnectMe();
        $scope.loggedIn = false;
      });

      $scope.$on('StatusService:Update', function(event, status) {
        $scope.status = status;
      });

      $scope.$on('UserService:Update', function(event, user) {
        $scope.user = user;
        $scope.currentInterest = UserService.currentInterest;
      });

      $scope.$on('UserService:FacebookLoginSuccess', function(event, user) {
        $scope.login();
      });

      $scope.$on('MessagesService:CloseRoom', function(event, config) {
        ILCServerService.closeRoom(config);
      });

      $scope.$on('UserService:UpdateCurrentInterest',function(event, user) {
        $scope.updatingCurrentInterest = true;
        ILCServerService.setCurrentInterest(user).then(function() {
          $scope.updatingCurrentInterest = false;
          StatusService.setStatus(profileSaved);
          $scope.$broadcast('user profile updated');
        });
      });

      $scope.closeProfile = function() {
        var complete = UserService.isProfileComplete();
        if (complete === true) {
          $scope.toggleNavBar('profile', false);//false = hide
        } else {
          var missing = complete; //if complete is not a true, it is then a list of what is missing from a valid profile
          profileIncomplete.text = 'Please complete your profile before moving on. Missing: ' + missing.toString()
          console.log('incompleteProfile');
          StatusService.setStatus(profileIncomplete);
        }
      }

      $scope.show = [
        {
          name:'matches',
          value:false
        },
        {
          name:'messages',
          value:false
        },
        {
          name:'profile',
          value:false
        },
        {
          name:'interests',
          value:false
        },
      ];

      $scope.setViewState = function(name, state) {
        for (var i = $scope.show.length - 1; i >= 0; i--) {
          if($scope.show[i].name === name){
            $scope.show[i].value = state
          }
        }
      };

      $scope.shouldShowView = function(name) {
        for (var i = $scope.show.length - 1; i >= 0; i--) {
          if($scope.show[i].name === name){
            return $scope.show[i].value;
          }
        }
        return false;
      };

      $scope.hideAllViews  = function() {
        for (var i = $scope.show.length - 1; i >= 0; i--) {
          $scope.show[i].value = false;
        }
      };


      $scope.toggleNavBar = function(itemName, value) {
        if (value === undefined) {
          value = true;
        }
        $scope.hideAllViews();
        $scope.setViewState(itemName, value);

      };

      $scope.toggleNavBar(Config.baseView || 'profile', true);

      $scope.parseInt = parseInt;

      var connectedToFacebookStatus = {
        text: $scope.Strings.connectedToFacebook,
        class: 'status-facebook' // CSS Class available to angular, not automatically applied
      };

      $scope.login = function() {
        UserService.checkLoginState().then(function(response) {
          //logged in

          StatusService.setStatus(connectedToFacebookStatus);
          ILCServerService.login(response.authResponse.accessToken);

          $scope.userId = response.authResponse.userID;
        }, function(response) {
          StatusService.setStatus(StatusService.ready);
          console.log('maincontroller responding to facebook login fail', response);
        });
      }

      $scope.login();
      if (window.location.host !== 'example.com:3000' && window.location.host !== 'ignis-libri-colloqui.herokuapp.com') {
        var useRealHostToTestFacebook = {
          text:'You must use example.com:3000 or ignis-libri-colloqui.herokuapp.com to test Facebook integration',
          class:'status-error',
          action: function() {
            window.location.host = 'ignis-libri-colloqui.herokuapp.com';
          }
        };
        StatusService.setStatus(useRealHostToTestFacebook);
      }

    }]);
});
