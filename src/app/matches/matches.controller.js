define(['controllerModule', 'angular', 'react/matchDisplay'], function(controllers, angular, MatchDisplay) {
  'use strict';
  return controllers.controller('MatchesController', [
    '$scope', 'Config', 'UserService',
    function($scope, Config, UserService) {

      $scope.Strings = Config.strings;

      $scope.currentTopic = UserService.currentTopic;
      
      $scope.$on('UserService:Update', function(event, user) {
        $scope.alreadyOpenCache = {};
        $scope.blacklistedCache = {};
      });
      
      $scope.alreadyOpenCache = {};
      $scope.alreadyOpenRoom = function(id) {
        if($scope.alreadyOpenRoom[id] !== undefined){
          return $scope.alreadyOpenRoom[id];
        }
        if ((($scope.user || {}).profile || {}).rooms !== undefined) {
          for (var i = $scope.user.profile.rooms.length - 1; i >= 0; i--) {
            var openRoom = $scope.user.profile.rooms[i];
            if (String(openRoom) === String(id)) {
              $scope.alreadyOpenCache[id] = true;
              return true;
            }
          }
        }
        $scope.alreadyOpenCache[id] = false;
        return false;
      };

      $scope.blacklistedCache = {};
      $scope.blacklisted = function(id) {
        if($scope.blacklisted[id] !== undefined){
          return $scope.blacklisted[id];
        }
        if ((($scope.user || {}).profile || {}).blacklist !== undefined) {
          for (var i = $scope.user.profile.blacklist.length - 1; i >= 0; i--) {
            var blacklisted = $scope.user.profile.blacklist[i];
            if (String(blacklisted.id) === String(id)) {
              $scope.blacklisted[id] = true;
              return true;
            }
          }
        }
        $scope.blacklisted[id] = false;
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
