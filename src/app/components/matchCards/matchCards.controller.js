define(['controllerModule', 'angular', 'react/matchDisplay'], function(controllers, angular, MatchDisplay) {
  'use strict';
  return controllers.controller('MatchCardsController',
  ['$scope', '$timeout', 'UserService', 'FacebookService',
  function($scope, $timeout, UserService, facebookService) {
    console.log('Hi everybody, im the MatchCardsController');
    $scope.matchlist = {};
    $scope.MatchDisplay = MatchDisplay;

    var imageMatchLookup = function(id, image) {
      var matches = $scope.matchlist;
      var matchesKeys = Object.keys($scope.matchlist);
      for (var i = matchesKeys.length - 1; i >= 0; i--) {
        var match = matchesKeys[i];
        if (matches[match].facebookId === id) {
          matches[match].image = image;
          matches[match].fetching = 'fetched';//lol
          return;
        }
      }
    };
    $scope.matches = function() {
      if (UserService.matches === undefined) {
        return undefined;
      }

      var matches = UserService.matches[UserService.currentTopic];

      for (var i = matches.length - 1; i >= 0; i--) {
        var match = matches[i];
        if ($scope.matchlist[match] === undefined) {
          $scope.matchlist[match] = {
            facebookId:match
          };
        }

        if ($scope.matchlist[match].fetching === undefined) {
          $scope.matchlist[match].fetching = true;
          $scope.matchlist[match].image = facebookService.getUserImageById(match, imageMatchLookup);
        }

      }
      return $scope.matchlist;
    };

    $scope.getUserImageById = function(id) {

      if ($scope.images === undefined) {
        $scope.images = {};
        return '';
      }

      if ($scope.images[id] === undefined) {
        //set a loading image, prevents this from getting called while the image is being loaded
        $scope.images[id] = 'http://placehold.it/50x50';
        //get the actual image, will be set when callback is fired
        facebookService.getUserImageById(id, function(imageUrl) {
          if (imageUrl.error === undefined) {
            $timeout(function() {
              $scope.images[id] = imageUrl.data.url;
            }, 0);
          } else {
            console.log('imageUrl.error', id, imageUrl.error);
          }
        });
      }
      return $scope.images[id];
    };
    
    $scope.removeCard = function(card) {
      console.log('removeCard');
      $timeout(function() {
        delete $scope.matchlist[card.facebookId];
      }, 0);
    };
    
    if($scope.swipeLeft === undefined){
      $scope.swipeLeft = function(card, cardData) {
        console.log('swipeLeft: card', card, cardData, $scope, $scope.cards);
        card.returnCard();
      };
    }
    
    if($scope.swipeRight === undefined){
      $scope.swipeRight = function(card, cardData) {
        console.log('swipeRight: card', card, $scope, $scope.cards);
        card.fadeOut(function(card) {
          console.log('Green wooden Blue Whale', card);
          $scope.removeCard(cardData);
        });
      };
    }
    
    
    $scope.date = new Date();
  }]);
});
