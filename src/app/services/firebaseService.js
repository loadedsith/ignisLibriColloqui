define(['services/serviceModule', 'angular', 'firebase'], function (services, angular, Firebase) {
  'use strict';
  return services.service('FirebaseService', function (Config) {
      var firebaseService = this;

      if (Config.firebaseUrl) {
        firebaseService.firebaseUrl = Config.firebaseUrl;
      }else{
        console.log('Strings.firebaseUrl was unset');
        firebaseService.firebaseUrl = 'https://resplendent-fire-9421.firebaseIO.com';
      }

      firebaseService.matchesRef = new Firebase(firebaseService.firebaseUrl + '/interests');
      firebaseService.messagesRef = new Firebase(firebaseService.firebaseUrl + '/messages');
      firebaseService.usersRef = new Firebase(firebaseService.firebaseUrl + '/users');
       
      return firebaseService;
    });  
});