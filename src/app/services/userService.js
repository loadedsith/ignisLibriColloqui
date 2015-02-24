define(['services/serviceModule', 'angular'], function(services, angular) {
  'use strict';
  return services.service('UserService', ['$rootScope', '$cookies', '$q', 'FacebookService', 'Config',
  function($rootScope, $cookies, $q, FacebookService, Config) {
    'use strict';
    var _this = this;

    _this.currentInterest = 'Gold mining';//TODO: This needs to be an updatable state varible, or array of variables

    _this.profiles = {};

    _this.user = {
      profilePicture : null,
      loggedIn : false
    }

    _this.setCurrentInterest = function(interest) {
      _this.user.profile.currentInterest = interest;
      $rootScope.$broadcast('UserService:UpdateCurrentInterest', _this.user);
    }

    _this.checkLoginState = function() {
      var deferred = $q.defer();
      FacebookService.checkLoginState(deferred);
      return deferred.promise;
    };

    _this.userFoundAMatch = function(match) {
      if (_this.user.profile !== undefined) {
        if (_this.user.profile.rooms !== undefined) {
          if (_this.user.profile.rooms.indexOf(match) === -1) {
            _this.user.profile.rooms.push(match);
          }
        } else {
          _this.user.profile.rooms = [match];
        }
      } else {
        console.log('ignoring user match because profile undefined');
      }
      console.log('UserService.user', _this.user, match);
      $rootScope.$broadcast('UserService:UpdateUserProfile', _this.user);
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
      $rootScope.$broadcast('UserService:FacebookLoggedIn', true);
    };

    _this.loginToFacebook = function() {
      _this.loggedIn = false;
      _this.user = {};
      _this.auth = '';
      _this.profilePicture = undefined;
      FacebookService.login(_this.loginCallback);
    };

    _this.logoutOfFacebook = function() {
      var deferred = $q.defer();
      FacebookService.logout(deferred);
      deferred.promise.then(function() {
        console.log('Facebook logout successful');
        $rootScope.$broadcast('UserService:FacebookLoggedOut', true);
        _this.loggedIn = false;
        _this.user = {};
        _this.auth = '';
        _this.profilePicture = undefined;
      });
    };

    _this.updateUserImage = function(response) {
      console.log('updateUserImage', response);
      if (response && !response.error) {
        _this.user.profilePicture = response;
        _this.imageMatchLookup(_this.user.info.id, response);
      }
    };
    _this.isProfileComplete = function() {
      var missing = [];
      if (!_this.user.profile) {
        _this.user.profile = {}
      }
      if (_this.user.profile.name === undefined || _this.user.profile.name === '') {
        missing.push('name');
      }
      if (_this.user.profile.interests === undefined) {
        _this.user.profile.interests = []
      }
      if (_this.user.profile.interests.length === 0) {
        missing.push('an interest');
      }
      return (missing.length === 0) ? true : missing;
    };

    _this.setUser = function(user) {
      _this.user = user;
    };

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
    };

    _this.setUserProfile = function(user) {
      if (user === undefined || angular.equals(user, {})) {
        console.log('not sure why set user was called with undefined, but it was');
        return;
      }
      _this.profiles[user.data['user_id']] = user.profile;
      if (_this.user.data !== undefined) {
        if (_this.user.data['user_id'] === user.data['user_id']) {

          if (!angular.equals(_this.user.profile, user.profile) && _this.user.profile !== undefined) {
            $rootScope.$broadcast('UserService:UpdateUserProfile', user);
          } else {
            //skip update because the profiles were equal, or perhaps this.user.profile === undefined
          }
          _this.user.profile = user.profile;
        } else {
          $rootScope.$broadcast('UserService:UpdateMatchProfile', user);
        }
      } else {
        $rootScope.$broadcast('UserService:UpdateMatchProfile', user);
      }

    };

    _this.gotMatches = function(matches) {
      _this.user.matches = matches;
    };

    _this.setMatchList = function(matchList) {
      _this.user.matches = matchList;
    };

    _this.loginCallback = function(response) {
      // $rootScope.$broadcast('UserService:FacebookLoggedIn', true);
      if (response.authResponse === undefined) {
        _this.user.loggedIn = false;
        _this.loginStatus = '🚫 Try Again Later';
        return;
      }
      FacebookService.getUserInfo(_this.userInfoCallback);
      _this.loginSuccess(response);
      $rootScope.$broadcast('UserService:FacebookLoginSuccess', response);
    };

    _this.matchList = {};

    _this.processMatches = function(matches) {
      var w = (Config.cardSize.width || 400) / 2;
      var h =  (Config.cardSize.height || 558) / 2;
      var facebookImageConfig = {
        width: w,
        height: h
      };
      if (matches === undefined) {
        return undefined;
      }
      matches = matches[_this.currentInterest];
      if (matches === undefined) {
        return _this.matchList;
      }
      for (var i = matches.length - 1; i >= 0; i--) {
        var match = matches[i];
        if (_this.profiles[match.id] === undefined) {
          _this.profiles[match.id] = {};
        }
        if (_this.profiles[match.id].fetching === undefined) {
          _this.profiles[match.id].fetching = true;
          _this.profiles[match.id].image = FacebookService.getUserImageById(match.id,
            facebookImageConfig, _this.imageMatchLookup);
        }

      }
      return _this.matchList;
    };

    _this.imageMatchLookup = function(id, image) {
      var matches = _this.user.matches;
      debugger;
      if (matches === undefined) {
        // This is triggered for the user image, but it is already set at this point (it was gotten earlier);
        return;
      }
      var matchesKeys = Object.keys(matches);
      for (var i = matchesKeys.length - 1; i >= 0; i--) {
        var interest = matchesKeys[i];
        for (var ii = matches[interest].length - 1; ii >= 0; ii--) {
          var interestedUser = matches[interest][ii];
          _this.profiles[id].image = image;
          _this.profiles[id].fetching = 'done';

          if (interestedUser.id === id) {
            interestedUser.image = image;
            interestedUser.fetching = 'done';
          }
        }
      }
      $rootScope.$broadcast('UserService:UpdateMatchProfiles', true);
    };

    _this.getUser = function() {return _this.user}

    $rootScope.$watch(_this.getUser, function(newUser, oldUser) {
      if (newUser.matches !== undefined) {
        _this.processMatches(newUser.matches);
      }
      if (!angular.equals(newUser.profile, oldUser.profile)) {
        //profile change
        if (oldUser.profile !== undefined && oldUser.info !== undefined) {
          //if oldUser.profile exists we arent setting the initial profile
          $rootScope.$broadcast('UserService:UpdateUserProfile', newUser);
        } else {
          console.log('ignoring user update because old user was undefined');
        }
      }
      $rootScope.$broadcast('UserService:Update', _this.user);
    }, true);

    return _this;
  }]);
});
