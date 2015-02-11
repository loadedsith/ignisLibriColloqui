define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesListController',
    ['$scope', '$timeout', 'Config', 'MessagesService',
    function($scope, $timeout, Config, MessagesService) {

      $scope.Strings = Config.strings;

      $scope.messages = {};
      $scope.rooms = [];

      $scope.glued = true;

      $scope.roomsReady = false;

      $scope.setCurrentRoom = function(name) {
        MessagesService.setCurrentRoom(name);
        $scope.currentRoom = name;
      };

      $scope.roomNames = {};

      $scope.getRoomName = function(room) {
        if ($scope.currentTopic !== undefined) {
          if ($scope.user.matches !== undefined) {
            var matches = $scope.user.matches[$scope.currentTopic];
            for (var i = matches.length - 1; i >= 0; i--) {
              var match = matches[i];
              if (String(match.id) === String(room)){
                return match.profile.name;
              }
            }
          }
        }
        return room;
      }

      $scope.$on('MessagesService:MessageSent', function(event, message) {
        $scope.message = '';
      });

      $scope.$on('MessagesService:MessageUpdate', function(event, message) {
        if ($scope.messages[message.room] === undefined) {
          $scope.messages[message.room] = [];
        }
        $scope.messages[message.room].push(message.snapshot);
      })
      $scope.$on('MessagesService:MessagesSet', function(event, messages) {
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
      });

      $scope.$on('MessagesService:UpdateRooms', function(event, rooms) {
        $scope.rooms = rooms;
        $scope.roomsReady = true;
        for (var i = rooms.length - 1; i >= 0; i--) {
          var room = rooms[i];
          $scope.roomNames[room] = $scope.getRoomName(room);
        }
      });

    }]);
});
