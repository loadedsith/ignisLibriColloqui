define(['controllerModule'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesController', ['$scope', 'Config', 'MessagesService',
    function($scope, Config, MessagesService) {
      console.log('Messages Controller');
      $scope.Strings = Config.strings;

      $scope.$on('MessagesService:UpdateRooms', function(event, rooms) {
        console.log('updateRooms', rooms);
        $scope.rooms = rooms;
        $scope.roomsReady = true;
        if ($scope.currentRoom === undefined) {
          if (rooms[0] !== undefined) {
            $scope.currentRoom = rooms[0];
          }
        }
      });
      
      
      $scope.$on('MessagesService:MessageSent', function(event, message) {
        console.log('clearing message', message);
        $scope.message = '';
      });
      
      $scope.$on('MessagesService:SetCurrentRoom', function(event, room) {
        $scope.currentRoom = room;
      });
      
      $scope.$on('UserService:Update', function(event, user) {
        var username = (((user || {}).info || {}).id || 'no username');
        if (username !== 'no username') {
          $scope.username = username;
          $scope.updateMessagesRef();
        }
      });

      $scope.messageInput = function(message, currentRoom) {
        console.log('mc send message: ', message, currentRoom);
        
        var successful = MessagesService.sendMessage(message, currentRoom);
        if (successful) {
          $scope.message = '';
        }
      }

      $scope.updateMessagesRef = function(event) {
        MessagesService.username = $scope.username;
        MessagesService.currentRoom = $scope.currentRoom;
        console.log('$scope.currentRoom', $scope.currentRoom);
        MessagesService.updateMessagesRef();
      }

    }]);
});
