define(['services/serviceModule', 'angular', 'firebase'], function(services, angular, Firebase) {
  'use strict';
  return services.service('UserService', ['$cookies', 'FacebookService', 'StatusService', 'UserManagementService',
  function($cookies, FacebookService, StatusService, UserManagementService) {
    'use strict';
    var _this = this;

    _this.events = {
      "update":[]
    };
    
    _this.addListener = function (condition, callback) {


      if (condition in _this.events){
        if (typeof callback === 'function') {
          _this.events[condition].push(callback)
        }else{
          console.log('UserService Event not a function. Condition: ', condition, ", callback: ", callback);
        }
      }else{
        console.log('UserService Event doesn\'t exist: condition: ',condition);
      }
    }

    _this.triggerListeners = function(condition) {
      if (_this.events[condition].length > 0){
        for (var i = _this.events[condition].length - 1; i >= 0; i--) {
          var callback = _this.events[condition][i]
          if (typeof callback === 'function'){
            callback(_this.user);
          }
        }
      }
    }

    _this.currentTopic = 0;

    _this.user = {
      profilePicture : null,
      loggedIn : false
    }

    console.log('User service test $cookies:', $cookies);

    _this.checkLoginState = function() {
      FacebookService.checkLoginState(_this.updateLoginStateCallback);
    };

    _this.loginToFacebook = function() {
      FacebookService.login(_this.loginCallback);
    };

    _this.updateUserImage = function(response) {
      console.log('updateUserImage', response);
      if (response && !response.error) {
        _this.user.profilePicture = response;
      }
      _this.triggerListeners('update');
    };

    _this.userInfoCallback = function(response) {
      // console.log('_this Info Found: ', response);
      StatusService.setStatus(StatusService.ready);
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
      _this.triggerListeners('update');
    };

    _this.gotBlacklist = function(blacklist) {
      console.log('UserService.GotBlacklist: ', blacklist);

      _this.blacklist = blacklist;
      //add the current user to the blacklist
      UserManagementService.getMatches(_this.user.info.id, _this.blacklist, _this.topics, _this.gotMatches);
    };

    _this.gotMatches = function(matches) {
      console.log('UserService.gotMatches: ', matches);
      _this.matches = matches;
    };

    _this.userDoesntExist = function() {
      console.log('User service User DOESNT Exists');
      _this.triggerListeners('update');
    };

    _this.loginCallback = function(response) {
      console.log('user.loginCallback', response);
      if (response.authResponse === undefined) {
        _this.user.loggedIn = false;
        _this.loginStatus = '🚫 Try Again Later';
        _this.triggerListeners('update');
        return;
      }

      FacebookService.getUserInfo(_this.userInfoCallback);

      _this.auth = response.authResponse;

      _this.user.loggedIn = true;
      _this.loginStatus = '👍 Logged In!';

      $cookies.userAuth = JSON.stringify(_this.auth);
    };

    _this.updateLoginStateCallback = function(response) {
      StatusService.setStatus(StatusService.ready);
      if (response.status === 'connected') {
        _this.loginStatus = '👍 Logged In!';
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook,
        // but has not authenticated your app
        _this.loggedIn = false;
        _this.loginStatus = '🚫 App was not authorized. Please allow access via Facebook.';
        return;// dont set cookies
      } else {
        // the user isn't logged in to Facebook.
        _this.loggedIn = false;
        _this.loginStatus = '🚫 You are not logged into Facebook. Please login.';
        return;// dont set cookies
      }
      FacebookService.getUserInfo(_this.userInfoCallback);

      _this.loggedIn = true;
      _this.auth = response.authResponse;
      if (_this.auth !== $cookies.userAuth) {
        $cookies.userAuth = JSON.stringify(_this.auth);
      }
    };

    return _this;
  }]);
});
