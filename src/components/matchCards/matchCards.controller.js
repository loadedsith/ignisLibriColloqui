
angular.module('ignisLibriColloqui')
  .controller('MatchCardsController', ['$scope', '$timeout', 'UserService','FacebookService', function ($scope, $timeout, UserService, FacebookService) {
    'use strict';
    $scope.matches = function () {
      if ( UserService.matches === undefined){
        return [];
      }
      return UserService.matches[UserService.currentTopic];
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
        FacebookService.getUserImageById(id, function (imageUrl) {
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
    
    $scope.swipeLeft = function (eventName, $event) {
      console.log('swipeLeft: eventName, $event', eventName, $event);
    };

    $scope.swipeRight = function (eventName, $event) {
      console.log('swipeRight: eventName, $event', eventName, $event);
    };
    
    $scope.date = new Date();
    
  }]);
