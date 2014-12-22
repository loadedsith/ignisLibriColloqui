angular.module('ignisLibriColloqui.Firebase',[])
  .service('FirebaseService', function () {
    'use strict';
    var firebaseService = this;
    firebaseService.matchesRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/interests');
    firebaseService.dataRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/oldChat');
    firebaseService.usersRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/users');
    return firebaseService;
  });