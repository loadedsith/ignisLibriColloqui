define(['controllerModule', 'react/matchDisplay'], function(controllers, MatchDisplay) {
  'use strict';
  return controllers
    .controller('CardTestController', ['$scope', '$timeout', function($scope, $timeout) {
      $scope.CardTemplate = MatchDisplay;
      $scope.cards = [
        'new Dentist Galapagos tortoise',
        'silk-lined Airline pilot pigeon',
        'Orange Southern Dart frog',
        'Red loud mallard',
        'Industrial Engineer elk',
        'Orange curved red-tailed hawk'
      ];
      $scope.swipeLeft = function(card) {
        console.log('swipeLeft: card', card, $scope, $scope.cards);
        card.returnCard();
      };
      $scope.removeCard = function(card) {
        console.log('removeCard');
        $timeout(function() {
          $scope.cards.splice($scope.cards.indexOf(card), 1);
        }, 0);
      };
      $scope.swipeRight = function(card) {
        console.log('swipeRight: card', card, $scope, $scope.cards);
        card.fadeOut(function(card) {
          $scope.removeCard(card.getDOMNode().innerHTML);
        });

      };
    }]);
});
