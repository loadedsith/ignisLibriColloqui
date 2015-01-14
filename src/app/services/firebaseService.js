define(['services/serviceModule', 'angular', 'firebase'], function(services, angular, Firebase) {
  'use strict';
  return services.service('FirebaseService', function(Config) {
      var _this = this;

      if (Config.firebaseUrl) {
        _this.firebaseUrl = Config.firebaseUrl;
      } else {
        console.log('Strings.firebaseUrl was unset');
        _this.firebaseUrl = 'https://resplendent-fire-9421.firebaseIO.com';
      }

      _this.matchesRef = new Firebase(_this.firebaseUrl + '/interests');
      _this.messagesRef = new Firebase(_this.firebaseUrl + '/messages');
      _this.usersRef = new Firebase(_this.firebaseUrl + '/users');

      return _this;
    });
});
