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
      
      $scope.$on('UserService:Update', function(event, user) {
        var username = (((user || {}).info || {}).id || 'no username');
        if (username !== 'no username') {
          $scope.username = username;
          $scope.updateMessagesRef();
        }
      });

      $scope.messageInput = function(message) {
        console.log('mc send message: ', message);
        var successful = MessagesService.sendMessage(message, $scope.currentRoom);
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
