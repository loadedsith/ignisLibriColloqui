define(['services/serviceModule','angular','firebase'], function (services, angular, Firebase) {
  'use strict';
  return services.service('FirebaseService', function () {
      var firebaseService = this;
      firebaseService.matchesRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/interests');
      firebaseService.messagesRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/messages');
      firebaseService.usersRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/users');
       
      return firebaseService;
    });  
});