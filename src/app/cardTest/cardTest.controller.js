define(['controllerModule', 'angular'],function (controllers) {
'use strict';
return controllers
  .controller('CardTestController', ['$scope','$timeout', function ($scope, $timeout) {
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
    $scope.swipeLeft = function (card) {
      console.log('swipeLeft: card', card, $scope, $scope.cards);
      card.returnCard();
    };
    $scope.removeCard = function (card) {
      console.log('removeCard');
      $timeout(function () {
        $scope.cards.splice($scope.cards.indexOf(card),1);
      },0);
    };
    $scope.swipeRight = function (card) {
      console.log('swipeRight: card', card, $scope, $scope.cards);
      card.fadeOut(function (card) {
        console.log('Green wooden Blue Whale');
        $scope.removeCard(card.getDOMNode().innerHTML);
      });

    };
  }]);  
});
