define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MatchesController', [
    '$scope', 'Config',
    function($scope, Config) {
      console.log('MatchesController');
      //ensure that status calls reference the current status
      $scope.Strings = Config.strings;
      
      $scope.swipeLeft = function(card, cardData) {
        console.log('122223swipeLeft: card', card, cardData, $scope, $scope.cards);
        card.returnCard();
      };
      
      $scope.swipeRight = function(card, cardData) {
        console.log('122223swipeRight: card', card, cardData, $scope, $scope.cards);
        card.returnCard();
      };
      
    }]);
});
