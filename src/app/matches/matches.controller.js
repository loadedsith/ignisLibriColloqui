define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MatchesController', [
    '$scope', 'Config',
    function($scope, Config) {
      console.log('MatchesController');
      $scope.Strings = Config.strings;

      $scope.swipeLeft = function(card, cardData) {
        card.returnCard();
        var scope = $scope;
      };
      
      $scope.$on('set matchList', function(matchList) {
        console.log('set matchList', matchList);
        $scope.matchList = matchList;
      });
      
      $scope.swipeRight = function(card, cardData, cardControl) {
        card.fadeOut(function(card) {
          console.log('fade out card callback, card: ', card);
          cardControl.removeCard(cardData);
        });
      };

      $scope.swipeLeft = function(card, cardData, cardControl) {
        card.returnCard();
      };

    }]);
});
