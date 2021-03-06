define(['controllerModule', 'angular', 'react/matchDisplay', 'react/topCard'],
  function(controllers, angular, MatchDisplay, TopCard) {
  'use strict';
  return controllers.controller('MatchesController', [
    '$scope', 'Config', 'UserService',
    function($scope, Config, UserService) {

      $scope.Strings = Config.strings;

      $scope.currentInterest = UserService.currentInterest;

      $scope.MatchDisplay = MatchDisplay;
      $scope.TopCard = TopCard;

      $scope.$on('UserService:Update', function() {
        $scope.alreadyOpenCache = {};
        $scope.blacklistedCache = {};
      });

      $scope.alreadyOpenCache = {};
      $scope.alreadyOpenRoom = function(id) {
        if ($scope.alreadyOpenRoom[id] !== undefined) {
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
        if ($scope.blacklisted[id] !== undefined) {
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

      $scope.swipeRight = function(card, cardData, cardControl) {
        UserService.userFoundAMatch(cardData.id);
        card.fadeOut(function() {//arg: card
          cardControl.removeCard(cardData);
        });
      };

      $scope.swipeLeft = function(card, cardData, cardControl) {
        // card.returnCard();
        card.fadeOut(function() {//arg: card
          cardControl.removeCard(cardData);
        });
      };

    }]);
});
