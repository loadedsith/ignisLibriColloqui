define(['controllerModule', 'angular'], function(controllers, angular) {
  'use strict';
  return controllers.controller('MatchCardsController',
  ['$scope', '$timeout', 'UserService', 'FacebookService','Config',
  function($scope, $timeout, UserService, facebookService, Config) {
    $scope.matchList = {};
    $scope.profiles = {};

    $scope.$on('UserService:Update', function(event, user) {
      $scope.profiles = UserService.profiles;
      if (user.matches) {
        $scope.matchList = user.matches;
        console.log('user.matches[\'Gold mining\'][0]', user.matches['Gold mining'][0]);
      } else {
        console.debug('got service update for match controller, but no matches!')
      }
    });


    $scope.removeCard = function(card) {
      console.log('removeCard');
      $timeout(function() {
        delete $scope.matchList[card.facebookId];
      }, 0);
    };

    $scope.cardControl = {
      removeCard: $scope.removeCard
    }

    $scope.swipeLeft = function(card, cardData) {
      console.log('swipeLeft: card', card, cardData, $scope, $scope.cards);
      if (typeof $scope.$parent.swipeLeft === 'function') {
        card.removeCard = $scope.removeCard;
        $scope.$parent.swipeLeft(card, cardData, $scope.cardControl)
      } else {
        card.returnCard();
      }
    };

    $scope.swipeRight = function(card, cardData) {
      console.log('swipeRight: card', card, $scope, $scope.cards);
      UserService.userFoundAMatch(cardData.id)
      if (typeof $scope.$parent.swipeRight === 'function') {
        card.removeCard = $scope.removeCard;
        $scope.$parent.swipeRight(card, cardData, $scope.cardControl)
      } else {
        card.fadeOut(function(card) {
          console.log('fade out card callback, card: ', card);
          $scope.removeCard(cardData);
        });
      }
    };

    $scope.date = new Date();
  }]);
});
