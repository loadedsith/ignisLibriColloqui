angular.module("ignisLibriColloqui.Firebase",[])
  .service('FirebaseService', function () {
    var firebaseService = this;
    firebaseService.dataRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/');
    return firebaseService;
  });