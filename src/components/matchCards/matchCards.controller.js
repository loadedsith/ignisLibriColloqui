define(['controllerModule', 'angular','/app/react/matchDisplay.js'],function (controllers, angular, MatchDisplay) {
  'use strict';
  return controllers.controller('MatchCardsController', ['$scope', '$timeout', 'UserService','FacebookService', function ($scope, $timeout, UserService, facebookService) {
    console.log('Hi everybody, im the MatchCardsController');
    $scope.matchlist = {};
    $scope.MatchDisplay = MatchDisplay;
    $scope.matches = function () {
      if ( UserService.matches === undefined){
        return undefined;
      }
      
      var matches = UserService.matches[UserService.currentTopic];
      
      for (var i = matches.length - 1; i >= 0; i--) {
        var match = matches[i];
        if($scope.matchlist[match] === undefined) {
          $scope.matchlist[match] = {
            facebookId:match
          }
        }
        
        if($scope.matchlist[match].fetching === undefined) {
          $scope.matchlist[match].fetching = true;
          $scope.matchlist[match].image = facebookService.getUserImageById(match, function(image){
            $scope.matchlist[match].fetching = 'fetched';//lol
            $scope.matchlist[match].image=image;
          });
        }
        /*
        {
        userId:match,
        image:
        }
        */

      }
      // return undefined;
      return $scope.matchlist;
    };
    
    $scope.getUserImageById = function (id) {
      if ($scope.images === undefined) {
        $scope.images = {};
        return '';
      }
      
      if ($scope.images[id] === undefined){
        //set a loading image, prevents this from getting called while the image is being loaded
        $scope.images[id]='http://placehold.it/50x50';
        //get the actual image, will be set when callback is fired
        facebookService.getUserImageById(id, function (imageUrl) {
          if (imageUrl.error === undefined){
            $timeout(function () {
              $scope.images[id] = imageUrl.data.url;
            },0);
          }else{
            console.log('imageUrl.error', id, imageUrl.error);
          }
        });
      }

      return $scope.images[id];

    };
    
    $scope.swipeLeft = function (card) {
       console.log('swipeLeft: card', card, $scope, $scope.cards);
       var myScope = $scope;
       card.returnCard();

     };
     $scope.removeCard = function (card) {
       console.log('removeCard');
       $timeout(function () {
         $scope.matches.splice($scope.matches.indexOf(card),1);
       },0);
     };
     $scope.swipeRight = function (card) {
       console.log('swipeRight: card', card, $scope, $scope.cards);
       var myScope = $scope;
       card.fadeOut(function (card) {
         console.log('Green wooden Blue Whale');
         myScope.removeCard(card.getDOMNode().innerHTML);
       });
     };
    
    $scope.date = new Date();
    
  }]);
});
