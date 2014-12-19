angular.module('ignisLibriColloqui.User', ['ngCookies'])
  .service('UserService', ['$cookies','FacebookService', function ($cookies, FacebookService) {
    'use strict';
    var User = this;
    
    User.loggedIn = false;
    
    console.log('User service test $cookies:', $cookies);
  
    User.checkLoginState = FacebookService.checkLoginState;
    
    User.loginToFacebook = FacebookService.login;
    
  
    return User;
  }]);