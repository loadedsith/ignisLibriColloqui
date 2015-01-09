define(['/app/services/serviceModule.js','angular','firebase'], function (services, angular, Firebase) {
  'use strict';
  return services.service('UserService', ['$cookies','FacebookService', 'StatusService', 'UserManagementService', function ($cookies, FacebookService, StatusService, UserManagementService) {
    'use strict';
    var User = this;

    User.currentTopic = 0;
    
    User.loggedIn = false;
    
    User.profilePicture = null;
    
    console.log('User service test $cookies:', $cookies);
    
    StatusService.ready.callback = function () {
      User.checkLoginState();
    };

    User.checkLoginState = function () {
      FacebookService.checkLoginState(User.updateLoginStateCallback);
    };
    
    User.loginToFacebook = function () {
      FacebookService.login(User.loginCallback);
    };
    
    User.updateUserImage = function (response) {
      console.log('updateUserImage', response);
      if (response && !response.error) {
        User.profilePicture = response;
      }
    };
    
    User.userInfoCallback = function (response) {
      // console.log('User Info Found: ', response);
      User.info = response;
      FacebookService.getUserImage(User.updateUserImage);
      UserManagementService.userExists(User.info, User.userExists, User.userDoesntExist);
    };

    User.userExists = function (user) {
      console.log('User service User Exists');

      var kiis = Object.keys(user);

      var u = user[kiis[0]];

      User.topics = u.topics ? u.topics : [];
      User.currentTopic = User.topics ? User.topics[0] : '-1';
      User.blacklist = u.blacklist ? u.blacklist : [];

      UserManagementService.getBlacklist(User.info.id, User.gotBlacklist);
    };
    
    User.gotBlacklist = function (blacklist) {
      console.log('UserService.GotBlacklist: ', blacklist);
      
      User.blacklist = blacklist;
      //add the current user to the blacklist
      User.blacklist.push(String(User.info.id));
      UserManagementService.getMatches(User.info.id, User.blacklist, User.topics, User.gotMatches);
    };
    
    User.gotMatches = function (matches) {
      console.log('UserService.gotMatches: ', matches);
      User.matches = matches;
    };
    
    User.userDoesntExist = function () {
      console.log('User service User DOESNT Exists');
    };
    
    User.loginCallback = function (response) {
      console.log('user.loginCallback', response);
      if(response.authResponse === undefined){
        User.loggedIn = false;
        User.loginStatus = '🚫 Try Again Later';
        return;
      }

      FacebookService.getUserInfo(User.userInfoCallback);

      User.auth = response.authResponse;

      User.loggedIn = true;
      User.loginStatus = '👍 Logged In!';

      $cookies.userAuth = JSON.stringify(User.auth);

    };
    
    
    User.updateLoginStateCallback = function (response) {
      
      StatusService.setStatus(StatusService.ready);
      
      if (response.status === 'connected') {
        User.loginStatus = '👍 Logged In!';
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook, 
        // but has not authenticated your app
        User.loggedIn = false;
        User.loginStatus = '🚫 App was not authorized. Please allow access via Facebook.';
        return;// dont set cookies
      } else {
        // the user isn't logged in to Facebook.
        User.loggedIn = false;
        User.loginStatus = '🚫 You are not logged into Facebook. Please login.';
        return;// dont set cookies
      }
      FacebookService.getUserInfo(User.userInfoCallback);
      
      User.loggedIn = true;
      User.auth = response.authResponse;
      if (User.auth !== $cookies.userAuth){
        $cookies.userAuth = JSON.stringify(User.auth);
      }
    };
    
    
      
    return User;
  }]);
});