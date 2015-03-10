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
      $scope.connectionEvent = function(value) {
        switch (value) {
        case 'disconnect':
          StatusService.setStatus($scope.disconnectedStatus);
          break;
        case 'timeout':
          StatusService.setStatus($scope.disconnectedStatus);
          break;
        case 'error':
          StatusService.setStatus($scope.disconnectedStatus);
          break;
        case 'connect':
          $scope.login();
          break;
        default:
          StatusService.setStatus(StatusService.ready);
          break;
        }

      };

      ILCServerService.connectTimeoutEvent = $scope.connectionEvent.bind(this, 'timeout');
      ILCServerService.connectErrorEvent = $scope.connectionEvent.bind(this, 'error');
      ILCServerService.disconnectEvent = $scope.connectionEvent.bind(this, 'disconnect');
      ILCServerService.connectEvent = $scope.connectionEvent.bind(this, 'connect');

      StatusService.setStatus(StatusService.loading);

      var profileIncomplete = {
        text:$scope.Strings.incompleteProfile, //[Optional] Label text
        class:'status-profile-incomplete' // CSS Class available to angular, not automatically applied
      };

      var profileSaved = {
        text:'Profile updated.', //[Optional] Label text
        class:'status-profile-saved', // CSS Class available to angular, not automatically applied
        callback: function() {
          setTimeout(function() {
            StatusService.setStatus(StatusService.ready);
          }, 1000);
        }
      };

      $scope.disconnectMe = ILCServerService.disconnectMe;

      $scope.updateUserProfile = function(event, user) {
        $scope.user.profile = user.profile;
        if (UserService.isProfileComplete() !== true) {
          $scope.toggleNavBar('profile');
          StatusService.setStatus(profileIncomplete);
        } else {
          ILCServerService.setProfile(user).then(function() {
            $scope.updatingProfile = false;
            StatusService.setStatus(profileSaved);
            $scope.$broadcast('user profile updated');
          });
        }
      };

      $scope.$on('ProfileController:UpdateUserProfile', function(event, user) {
        if (UserService.isProfileComplete() === true) {
          ILCServerService.setProfile(user).then(function() {
            $scope.updatingProfile = false;
            StatusService.setStatus(profileSaved);
            $scope.$broadcast('user profile updated');
          });
        }
      });

      $scope.$on('UserService:Loading', function() {
        StatusService.setStatus(StatusService.loading);
      });

      $scope.$on('UserService:UpdateUserProfile', $scope.updateUserProfile);

      $scope.$on('UserService:UpdateMatchProfiles', function() {
        $scope.profiles = UserService.profiles;
      });

      $scope.$on('UserService:ILCLoggedIn', function() {
        StatusService.setStatus(StatusService.ready);
        requestAnimationFrame(function() {
          $timeout(function() {
            $scope.toggleNavBar(Config.baseView || 'profile', true);
          }, 0);
        })

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

      $scope.$on('UserService:FacebookLoginSuccess', function() {
        $scope.login();
      });

      $scope.$on('MessagesService:CloseRoom', function(event, config) {
        ILCServerService.closeRoom(config);
      });

      $scope.$on('UserService:UpdateCurrentInterest', function(event, user) {
        $scope.updatingCurrentInterest = true;
        ILCServerService.setCurrentInterest(user).then(function() {
          $scope.updatingCurrentInterest = false;
          StatusService.setStatus(profileSaved);
          $scope.$broadcast('user profile updated');
        });
      });

      $scope.getMissingProfileText = function(missing) {
        var missingTextCSV = '';
        if (missing.length > 1) {
          missingTextCSV = missing.join(', ');
        } else {
          missingTextCSV = missing[0];
        }
        return $scope.Strings.incompleteProfile + ' ' + $scope.Strings.missing + ': ' + missingTextCSV;
      };

      $scope.closeProfile = function() {
        var complete = UserService.isProfileComplete();
        if (complete === true) {
          $scope.setViewState('profile', false);//false = hide
          return true;
        }
        $scope.setViewState('profile', true);//false = hide
        //if complete is not a true, it is then a list of what is missing from a valid profile
        var missingText = $scope.getMissingProfileText(complete);
        profileIncomplete.text = missingText;
        StatusService.setStatus(profileIncomplete);
        return false;
      };

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
          if ($scope.show[i].name === name) {
            $scope.show[i].value = state;
          }
        }
      };

      $scope.shouldShowView = function(name) {
        for (var i = $scope.show.length - 1; i >= 0; i--) {
          if ($scope.show[i].name === name) {
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
        if ($scope.closeProfile() === true) {
          $scope.setViewState(itemName, value);
        }
        if ($scope.shouldShowView('messages') === true) {
          window.requestAnimationFrame(function() {
            $scope.$broadcast('messagesVisible', true);
          });
        }
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
          console.log('user was not logged in', response);
        });
      };

      $scope.login();
      $scope.$on('open room', function(event, card) {
        // we should look at card.id and ensure the room opens,
        // however adding the room causes the user to be updated, so it happens automagically.
        // if thats so, just open the display!
        $scope.toggleNavBar('messages', true);
        $scope.$broadcast('set current room', card.id);
      });
      var hostedAtExampleDotCom = window.location.host === 'example.com:3000';
      var hostedAtHeroku = window.location.host === 'ignis-libri-colloqui.herokuapp.com';
      if (!hostedAtExampleDotCom && !hostedAtHeroku) {
        var useRealHostToTestFacebook = {
          text:'You must use example.com:3000 or ignis-libri-colloqui.herokuapp.com' +
               ' to test Facebook integration',
          class:'status-error',
          action: function() {
            window.location.host = 'ignis-libri-colloqui.herokuapp.com';
          }
        };
        StatusService.setStatus(useRealHostToTestFacebook);
      }

    }]);
});
