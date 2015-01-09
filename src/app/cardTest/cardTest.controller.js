define(['controllerModule', 'angular'],function (controllers) {
'use strict';
return controllers
  .controller('CardTestController', ['$scope', function ($scope) {//,
    console.log('CardTestController');
    //ensure that status calls reference the current status
    //TODO: Create a constant module and a
    $scope.cards = [
      'new Dentist Galapagos tortoise',
      'silk-lined Airline pilot pigeon',
      'Orange Southern Dart frog',
      'Red loud mallard',
      'Industrial Engineer elk',
      'Orange curved red-tailed hawk'
    ];

  }]);  
});
