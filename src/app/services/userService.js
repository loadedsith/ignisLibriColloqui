define(['services/serviceModule', 'angular', 'firebase'], function(services, angular, Firebase) {
  'use strict';
  return services.service('UserService', ['$rootScope', '$cookies', '$q', 'FacebookService', 'UserManagementService',
  function($rootScope, $cookies, $q, FacebookService, UserManagementService) {
    'use strict';
    var _this = this;

    _this.currentTopic = 0;

    _this.profiles = {};

    _this.user = {
      profilePicture : null,
      loggedIn : false
    }

    _this.checkLoginState = function() {
      var deferred = $q.defer();
      FacebookService.checkLoginState(deferred);
      deferred.promise.then(_this.loginSuccess, _this.loginFailure)
      return deferred.promise;
    };

    _this.loginFailure = function(response) {
      if (response.status === 'not_authorized') {
        // the user is logged in to Facebook,
        // but has not authenticated your app
        _this.loggedIn = false;
        _this.loginStatus = '🚫 App was not authorized. Please allow access via Facebook.';
      } else {
        // the user isn't logged in to Facebook.
        _this.loggedIn = false;
        _this.loginStatus = '🚫 You are not logged into Facebook. Please login.';
      }
    };

    _this.loginSuccess = function(response) {
      _this.loginStatus = '👍 Logged In!';
      FacebookService.getUserInfo(_this.userInfoCallback);
      _this.loggedIn = true;
      _this.auth = response.authResponse;
      if (_this.auth !== $cookies.userAuth) {
        $cookies.userAuth = JSON.stringify(_this.auth);
      }
    };

    _this.loginToFacebook = function() {
      FacebookService.login(_this.loginCallback);
    };

    _this.updateUserImage = function(response) {
      console.log('updateUserImage', response);
      if (response && !response.error) {
        _this.user.profilePicture = response;
      }
    };
    _this.isProfileComplete = function() {
      var missing = [];
      if (!_this.user.profile) {
        _this.user.profile = {}
      }
      if (_this.user.profile.name===undefined || _this.user.profile.name === '') {
        missing.push('name');
      }
      if (_this.user.profile.interests === undefined) {
        _this.user.profile.interests = []
      }
      if (_this.user.profile.interests.length === 0){
        missing.push('an interest');
      }

      if (!_this.user.profile.blacklist) {
        missing.push('blacklist');
        _this.user.profile = []
      }

      return (missing.length === 0) ? true : missing;
    };
    _this.attachProfileToLocalUser = function(response) {
      if (_this.user.profiles===undefined){
        if (_this.profiles[response.id] !== undefined) {
          _this.user.profile = _this.profiles[response.id]
        }
      }
    }

    _this.userInfoCallback = function(response) {
      // console.log('_this Info Found: ', response);
      _this.user.info = response;
      var imageConfig = {
        redirect: false,
        height: 320,
        width: 160,
        type: 'normal'
      };
      FacebookService.getUserImage(imageConfig, _this.updateUserImage);
      _this.attachProfileToLocalUser(response);
      UserManagementService.userExists(_this.user.info, _this.userExists, _this.userDoesntExist);
    };

    _this.userExists = function(user) {
      console.log('User service User Exists');

      var kiis = Object.keys(user);

      var u = user[kiis[0]];

      _this.topics = u.topics ? u.topics : [];
      _this.currentTopic = _this.topics ? _this.topics[0] : '-1';
      _this.blacklist = u.blacklist ? u.blacklist : [];

      UserManagementService.getBlacklist(_this.user.info.id, _this.gotBlacklist);
    };

    _this.gotBlacklist = function(blacklist) {
      _this.blacklist = blacklist;
      //add the current user to the blacklist
      UserManagementService.getMatches(_this.user.info.id, _this.blacklist, _this.topics, _this.gotMatches);
    };

    _this.setUserProfile = function(user) {
      _this.profiles[user.data['user_id']] = user.profile;
      if (_this.user.info !== undefined) {
         if (_this.user.info.id === user.data.user_id){

           if (!angular.equals(_this.user.profile, user.profile) && _this.user.profile !== undefined) {
             $rootScope.$broadcast('UserService:UpdateUserProfile', user);
           }else{
             //skip update because the profiles were equal, or perhaps this.user.profile === undefined
           }
           _this.user.profile = user.profile;
         }else{
           $rootScope.$broadcast('UserService:UpdateMatchProfile', user);
         }
      }else{
        $rootScope.$broadcast('UserService:UpdateMatchProfile', user);
      }

    };

    _this.gotMatches = function(matches) {
      _this.user.matches = matches;
    };

    _this.setMatchList = function(matchList) {
      _this.user.matches = matchList;
    };

    _this.userDoesntExist = function() {
      console.log('User service User DOESNT Exists');
    };

    _this.loginCallback = function(response) {
      if (response.authResponse === undefined) {
        _this.user.loggedIn = false;
        _this.loginStatus = '🚫 Try Again Later';
        return;
      }

      FacebookService.getUserInfo(_this.userInfoCallback);

      _this.auth = response.authResponse;

      _this.user.loggedIn = true;
      _this.loginStatus = '👍 Logged In!';

      $cookies.userAuth = JSON.stringify(_this.auth);
    };

    _this.getUser = function() {return _this.user}

    _this.skipFirstProfile = true;
    $rootScope.$watch(_this.getUser, function(newUser, oldUser) {
      if(!angular.equals(newUser.profile, oldUser.profile)){
        //profile change
        if(oldUser.profile !== undefined){
          //if oldUser.profile exists we arent setting the initial profile
          $rootScope.$broadcast('UserService:UpdateUserProfile', newUser);
        }else{
          console.log('ignoring user update because old user was undefined');
        }
      }
      $rootScope.$broadcast('UserService:Update', _this.user);
    }, true);

    return _this;
  }]);
});
