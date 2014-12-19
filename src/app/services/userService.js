angular.module('ignisLibriColloqui.User', ['ngCookies'])
  .service('UserService', ['$cookies','FacebookService', 'StatusService', 'UserManagementService', function ($cookies, FacebookService, StatusService, UserManagementService) {
    'use strict';
    var User = this;
    
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
      console.log('average barracuda', response);
      User.info = response;
      
      FacebookService.getUserImage(User.updateUserImage);
      UserManagementService.userExists(User.info, User.userExists, User.userDoesntExist);
    };

    User.userExists = function () {
      console.log('User service User Exists');
      UserManagementService.getBlacklist(User.info.id, User.gotBlacklist);
    };
    
    User.gotBlacklist = function (blacklist) {
      console.log('User Service Got Blacklist:', blacklist);
    }
    
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

      var auth = response.authResponse;
      User.auth = response.authResponse;
      $cookies.userAuth = JSON.stringify(User.auth);
      User.loginStatus = '👍 Logged In!';
      User.loggedIn = true;
      UserManagementService
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