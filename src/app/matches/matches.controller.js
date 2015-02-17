define(['controllerModule', 'angular', 'react/matchDisplay'], function(controllers, angular, MatchDisplay) {
  'use strict';
  return controllers.controller('MatchesController', [
    '$scope', 'Config', 'UserService',
    function($scope, Config, UserService) {

      $scope.Strings = Config.strings;

      $scope.currentTopic = UserService.currentTopic;

      $scope.blacklisted = function(id) {
        console.log('hook up blacklisted function');
        var scope = $scope;
        if((($scope.user||{}).profile||{}).blacklist !== undefined){
          for (var i = $scope.user.profile.blacklist.length - 1; i >= 0; i--) {
            var blacklisted = $scope.user.profile.blacklist[i];
            if (String(blacklisted.id) === String(id)){
              return true;
            }
          }
        }
        return false;
      };
      $scope.MatchDisplay = MatchDisplay;
      $scope.swipeRight = function(card, cardData, cardControl) {
        card.fadeOut(function(card) {
          cardControl.removeCard(cardData);
        });
      };

      $scope.swipeLeft = function(card, cardData, cardControl) {
        // card.returnCard();
        card.fadeOut(function(card) {
          cardControl.removeCard(cardData);
        });
      };

    }]);
});
