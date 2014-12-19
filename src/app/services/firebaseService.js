angular.module('ignisLibriColloqui.Firebase',[])
  .service('FirebaseService', function () {
    'use strict';
    var firebaseService = this;
    firebaseService.dataRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/');
    return firebaseService;
  });