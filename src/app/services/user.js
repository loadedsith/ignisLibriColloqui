angular.module('ignisLibriColloqui.User', ['ngCookies'])
  .service('UserService', ['$cookies', function ($cookies) {
    'use strict';
    var User = this;
    
    console.log('$cookies', $cookies);
  
    return User;
  }]);