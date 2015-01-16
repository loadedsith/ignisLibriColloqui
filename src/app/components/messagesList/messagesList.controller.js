define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesListController', ['$scope', '$timeout', 'Config', 'FirebaseService',
    function($scope, $timeout, Config, FirebaseService) {//$scope
      console.log('Hi everybody, im the MessagesListController');

      $scope.Strings = Config.strings;

      $scope.username = 'newUser';
      $scope.currentRoom = 'newRoom';

      $scope.messages = [];
      $scope.rooms = [];

      $scope.roomsReady = false;

      $scope.setCurrentRoom = function (name) {
        $scope.currentRoom = name;
        $scope.updateChatRef();
      }

      var messagesRoot = FirebaseService.firebaseUrl + '/messages';
      var userMessages = messagesRoot + '/' + $scope.username;
      var userRoomMessages = userMessages + '/' + $scope.currentRoom;
      var currentRoomRef = new Firebase(userRoomMessages);

      //FirebaseService.firebaseUrl+'/messages/' + $scope.username + '/' + $scope.currentRoom
      $scope.messageInput = function() {//extra attr; e
        currentRoomRef.push({
          name: $scope.username,
          message: $scope.message
        });
        $scope.message = '';
      };

      var roomListRef = new Firebase(userMessages);
      $scope.updateChatRef = function() {
        var messagesRoot = FirebaseService.firebaseUrl + '/messages';
        var userMessages = messagesRoot + '/' + $scope.username;
        var userRoomMessages = userMessages + '/' + $scope.currentRoom;
        var currentRoomRef = new Firebase(userRoomMessages);

        roomListRef = new Firebase(userMessages);
        roomListRef.on('child_added', function(snapshot) {
          //receive new message
          // will be called for each new message
          $timeout(function() {
            var room = snapshot.val();
            room.key = snapshot.key();
            $scope.rooms.push(room);
          }, 0);
        });
        roomListRef.on('value', function(snapshot) {
          //Initialize messages
          $scope.roomsReady = false;
          $timeout(function() {
            var rooms = snapshot.val();
            $scope.rooms = [];
            angular.forEach(rooms, function(value, key) {
              value.key = key;
              $scope.rooms.push(value);
            });
            $scope.roomsReady = true;
          }, 0);
        });

        var messagesRoot = FirebaseService.firebaseUrl + '/messages';
        var userMessages = messagesRoot + '/' + $scope.username;
        var userRoomMessages = userMessages + '/' + $scope.currentRoom;

        currentRoomRef = new Firebase(userRoomMessages);

        currentRoomRef.on('child_added', function(snapshot) {
          //receive new message
          // will be called for each new message
          $timeout(function() {
            var message = snapshot.val();
            currentRoomRef.key = snapshot.key();
            $scope.messages.push(message);
          }, 0);
        });

        currentRoomRef.on('value', function(snapshot) {
          //Initialize messages
          $timeout(function() {
            var messages = snapshot.val();

            $scope.messages = [];

            angular.forEach(messages, function(value, key) {
              value.key = key;
              $scope.messages.push(value);
            });

          }, 0);

        });
      };

      $scope.updateChatRef();

    }]);
});
