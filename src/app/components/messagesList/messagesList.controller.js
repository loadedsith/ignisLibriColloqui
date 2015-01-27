define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesListController',
    ['$scope', '$timeout', 'Config', 'MessagesService', 'FirebaseService',
    function($scope, $timeout, Config, MessagesService, FirebaseService) {
      console.log('Hi everybody, im the MessagesListController');

      $scope.Strings = Config.strings;
      
      $scope.messages = {};
      $scope.rooms = [];

      $scope.glued = true;

      $scope.roomsReady = false;

      $scope.setCurrentRoom = function(name) {
        MessagesService.setCurrentRoom(name);
        $scope.currentRoom = name;
      };
   
      $scope.updateMessagesRef = function() {
        MessagesService.updateMessagesRef()
      };
      
      $scope.$on('MessagesService:MessageSent', function(event, message) {
        console.log('clearing message', message);
        $scope.message = '';
      });

      $scope.$on('MessagesService:MessageUpdate', function(event, message) {
        if ($scope.messages[message.room] === undefined) {
          $scope.messages[message.room] = [];
        }
        $scope.messages[message.room].push(message.snapshot);
      })
      $scope.$on('MessagesService:MessagesSet', function(event, messages) {
        console.log('updateMessages', messages);
        if (messages.snapshot !== null) {
          if (messages.snapshot[messages.room]) {
            $scope.messages[messages.room] = messages.snapshot[messages.room];
          }else{
            if( $scope.messages[messages.room] === undefined) {
              $scope.messages[messages.room]=[];
            }
            for(var messageKey in messages.snapshot){
              var message = messages.snapshot[messageKey];
              $scope.messages[messages.room].push(message);
            }
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
