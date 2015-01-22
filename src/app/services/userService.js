define(['services/serviceModule', 'angular', 'firebase'], function(services, angular, Firebase) {
  'use strict';
  return services.service('UserService', ['$rootScope', '$cookies', '$q', 'FacebookService', 'UserManagementService',
  function($rootScope, $cookies, $q, FacebookService, UserManagementService) {
    'use strict';
    var _this = this;

    _this.currentTopic = 0;

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

    _this.userInfoCallback = function(response) {
      // console.log('_this Info Found: ', response);
      _this.user.info = response;
      FacebookService.getUserImage(_this.updateUserImage);
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
      console.log('UserService.GotBlacklist: ', blacklist);

      _this.blacklist = blacklist;
      //add the current user to the blacklist
      UserManagementService.getMatches(_this.user.info.id, _this.blacklist, _this.topics, _this.gotMatches);
    };

    _this.gotMatches = function(matches) {
      console.log('UserService.gotMatches: ', matches);
      _this.user.matches = matches;
    };
    
    _this.setMatchList = function(matchList) {
      console.log('UserService.setMatchList: ', matchList);
      _this.user.matches = matchList;
    };
    
    _this.userDoesntExist = function() {
      console.log('User service User DOESNT Exists');
    };

    _this.loginCallback = function(response) {
      console.log('user.loginCallback', response);
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

    //Watch for changes, and like a boss, update any listeners.
    $rootScope.$watch(_this.getUser, function() {
      $rootScope.$broadcast('UserService:Update', _this.user);
    }, true)

    return _this;
  }]);
});
