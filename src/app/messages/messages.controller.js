define(['controllerModule'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesController', [
    '$scope', 'Config', 'MessagesService', 'UserService', '$timeout',
    function($scope, Config, MessagesService, UserService, $timeout) {

      $scope.Strings = Config.strings;

      $scope.$on('MessagesService:UpdateRooms', function(event, rooms) {
        $scope.rooms = rooms;
        $scope.roomsReady = true;
        if ($scope.currentRoom === undefined) {
          if (rooms[0] !== undefined) {
            $scope.currentRoom = rooms[0];
          }
        }
      });

      $scope.$on('MessagesService:MessageSent', function() {
        $scope.message = '';
      });

      $scope.$on('MessagesService:SetCurrentRoom', function(event, room) {
        $timeout(function() {
          $scope.currentRoom = room;
          $scope.rooms = MessagesService.rooms;
        }, 0);
      });

      $scope.$on('UserService:Update', function(event, user) {
        $scope.profiles = UserService.profiles;
        var username = (((user || {}).info || {}).id || 'no username');
        if (username !== 'no username') {
          $scope.username = username;
        }
      });

      $scope.messageInput = function(message, currentRoom) {
        var successful = MessagesService.sendMessage(message, currentRoom);
        if (successful) {
          $scope.message = '';
        }
      };

    }]);
});
