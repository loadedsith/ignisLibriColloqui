angular.module('ignisLibriColloqui.User', ['ngCookies'])
  .service('UserService', ['$cookies', function ($cookies) {
    'use strict';
    var User = this;
    
    User.loggedIn = 'Testolia';
    
    console.log('User service test $cookies:', $cookies);
  
    return User;
  }]);