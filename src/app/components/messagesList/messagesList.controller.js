define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesListController',
    ['$scope', '$timeout', 'Config', 'MessagesService', 'FirebaseService',
    function($scope, $timeout, Config, MessagesService, FirebaseService) {
      console.log('Hi everybody, im the MessagesListController');

      $scope.Strings = Config.strings;
      
      $scope.messages = {};
      $scope.rooms = [];

      $scope.roomsReady = false;

      $scope.setCurrentRoom = function(name) {
        MessagesService.setCurrentRoom(name);
        $scope.currentRoom = name;
      }

      $scope.updateMessagesRef = function() {
        MessagesService.updateMessagesRef()
      }

      $scope.$on('MessagesService:UpdateMessages', function(event, messages) {
        console.log('updateMessages', messages);
        if (messages.snapshot !== null) {
          if (messages.snapshot[messages.room]) {
            $scope.messages[messages.room] = messages.snapshot[messages.room];
          }else{
            $scope.messages[messages.room] = {};
          }
        } else {
          $scope.messages[messages.room] = {};
        }
        console.log('$scope.messages', $scope.messages);
      });

      $scope.$on('MessagesService:UpdateRooms', function(event, rooms) {
        console.log('updateRooms', rooms);
        $scope.rooms = rooms;
        $scope.roomsReady = true;
      });

    }]);
});
