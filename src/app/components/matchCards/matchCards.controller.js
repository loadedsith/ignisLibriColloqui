define(['controllerModule', 'angular'], function(controllers, angular) {
  'use strict';
  return controllers.controller('MatchCardsController',
  ['$scope', '$timeout', 'UserService', 'FacebookService', 'Config',
  function($scope, $timeout, UserService, facebookService, Config) {
    $scope.matchList = {};
    $scope.profiles = {};

    $scope.decks = [];

    $scope.$on('UserService:Update', function(event, user) {
      $scope.profiles = UserService.profiles;
      if ($scope.deckInterest === undefined && user.profile !== undefined) {
        if (user.profile.currentInterest !== undefined) {
          $scope.deckInterest = user.profile.currentInterest;
        }
      }
      if (user.matches) {
        $scope.matchList = user.matches;
        $scope.makeDecksFromMatchList($scope.matchList);
      } else {
        console.debug('got service update for match controller, but no matches!')
      }
    });

    $scope.swipeRightTopCard = function(card, cardData) {
      $scope.removeTopCard(card, cardData);
    };
    $scope.swipeLeftTopCard = function(card, cardData) {
      var deckIndex;
      for (var i = $scope.decks.length - 1; i >= 0; i--) {
        var deck = $scope.decks[i];
        if (deck.topCard.name !== undefined) {
          var name = deck.topCard.name;
          if (name === cardData.name) {
            deckIndex = i;
            continue;
          }
        }
      }

      if (deckIndex !== undefined) {
        $scope.decks.splice(deckIndex, 1);
      }
    };

    $scope.makeDecksFromMatchList = function(matchList) {
      if (matchList === undefined) {
        matchList === $scope.matchList;
      }
      $scope.decks = [];
      angular.forEach(matchList, function(value, key) {
        $scope.decks.push({
          name:key,
          cards:value,
          topCard:{
            name:key,
            size:value.length
          }
        });
      })
    }

    $scope.removeTopCard = function(card, cardData) {
      for (var i = $scope.decks.length - 1; i >= 0; i--) {
        var deck = $scope.decks[i];
        if (deck.topCard.name !== undefined) {
          card.fadeOut(function(card) {
            if (deck.topCard.name!==undefined){
              //check again, because stuff can change during a fade
              var name = deck.topCard.name;
              if (name === cardData.name) {
                deck.topCard = undefined
              }
            }
          })
          continue;
        }
      }
    }
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
