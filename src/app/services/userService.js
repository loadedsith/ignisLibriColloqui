angular.module('ignisLibriColloqui.User', ['ngCookies'])
  .service('UserService', ['$cookies','FacebookService', 'StatusService', function ($cookies, FacebookService, StatusService) {
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
      $cookies.userAuth = User.auth;
      User.loginStatus = '👍 Logged In!';
      User.loggedIn = true;
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
        $cookies.userAuth = User.auth;
      }
    };
    
    
      
    return User;
  }]);