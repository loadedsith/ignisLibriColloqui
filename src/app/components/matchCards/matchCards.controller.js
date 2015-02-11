define(['controllerModule', 'angular', 'react/matchDisplay'], function(controllers, angular, MatchDisplay) {
  'use strict';
  return controllers.controller('MatchCardsController',
  ['$scope', '$timeout', 'UserService', 'FacebookService',
  function($scope, $timeout, UserService, facebookService) {
    $scope.matchList = {};
    $scope.MatchDisplay = MatchDisplay;

    var imageMatchLookup = function(id, image) {
      var matches = $scope.matchList;
      var matchesKeys = Object.keys($scope.matchList);
      for (var i = matchesKeys.length - 1; i >= 0; i--) {
        var interest = matchesKeys[i];
        for (var ii = matches[interest].length - 1; ii >= 0; ii--) {
          var interestedUser = matches[interest][ii];
         if (interestedUser.id === id) {
           interestedUser.image = image;
           interestedUser.fetching = 'done';
          }
        }
      }
    };
    $scope.profiles = {};

    $scope.$on('UserService:UpdateMatchProfile', function(event, user) {
      var userId = user.data['user_id'];
      if ($scope.profiles[userId] !== undefined) {
        $scope.profiles[userId].profile = user.profile;
      }else{
        $scope.profiles[userId] = {
          profile : user.profile
        }
      }
    });

    // $scope.$watch('profiles',function(newValue, oldValue) {
    //// because profiles come from ILC, and the rest from FB
    //// they can show up out of sync, if the matchlist is an object of this type
    //// it has already been processed, if not, it hasn't.
    //// if ($scope.matchList[UserService.currentTopic] !== undefined){
    ////   $scope.attachProfilesToMatchList();
    //// }
    // })
    $scope.$on('UserService:Update', function(event, user) {
      if (user.matches) {
        $scope.processMatches(user.matches);
        $scope.matchList = user.matches;
      } else {
        console.debug('got service update for match controller, but no matches!')
      }
    })
    var w = 400 / 2;
    var h = 558 / 2;
    var facebookImageConfig = {
      width: w,
      height: h
    };
    $scope.currentTopic = UserService.currentTopic;
    $scope.processMatches = function(matches) {
      if (matches === undefined) {
        return undefined;
      }
      matches = matches[UserService.currentTopic];
      $scope.currentTopic = UserService.currentTopic;
      if(matches === undefined){
        return $scope.matchList;
      }
      for (var i = matches.length - 1; i >= 0; i--) {
        var match = matches[i];
        if ($scope.profiles[match.id] === undefined) {
          $scope.profiles[match.id] = {};
        }
        if ($scope.profiles[match.id].fetching === undefined) {
          $scope.profiles[match.id].fetching = true;
          $scope.profiles[match.id].image =
            facebookService.getUserImageById(match.id, facebookImageConfig, imageMatchLookup);
          $scope.$emit('MatchCard:AvailableForProcessing', $scope.profiles[match.id]);
        }

      }
      return $scope.matchList;
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

        facebookService.getUserImageById(id, facebookImageConfig, function(imageUrl) {
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
