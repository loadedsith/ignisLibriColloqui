define(['controllerModule', 'angular'],function (controllers) {
  'use strict';
  return controllers.controller('CardsController', ['$scope', function ($scope) {
    console.log('Hi everybody, im the CardsController');
    
    $scope.swipeLeft = function (eventName, $event) {
      console.log('swipeLeft: eventName, $event', eventName, $event);
    };

    $scope.swipeRight = function (eventName, $event) {
      console.log('swipeRight: eventName, $event', eventName, $event);
    };

  }]);
});
