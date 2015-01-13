define(['controllerModule', 'angular'],function (controllers) {
  'use strict';
  return controllers.controller('MessagesListController', ['$scope', '$timeout','Strings', function ($scope, $timeout, Strings) {//$scope
    console.log('Hi everybody, im the MessagesListController');
    
    $scope.Strings = Strings;
    
    $scope.username = 'newUser';
    $scope.currentRoom = 'newRoom';

    $scope.messages = [];
    $scope.rooms= [];
    
    $scope.roomsReady = false;
    
    $scope.$watch('room',function () {
      console.log('roomChange');
      $scope.updateChatRef();
    });
    
    var currentRoomRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/messages/' + $scope.username + '/' + $scope.currentRoom);
    
    $scope.messageInput = function () {//extra attr; e
      currentRoomRef.push({
        name: $scope.username,
        message: $scope.message
      });
      $scope.message = '';
    };
      var roomListRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/messages/' + $scope.username);
    $scope.updateChatRef = function () {
      roomListRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/messages/' + $scope.username);
      roomListRef.on('child_added', function(snapshot) {
        //receive new message
        // will be called for each new message
        $timeout(function () {
          var room = snapshot.val();
          room.key = snapshot.key();
          $scope.rooms.push(room);
        }, 0);
      });
      roomListRef.on('value', function(snapshot) {
        //Initialize messages
        $scope.roomsReady = false;
        $timeout(function () {
          var rooms = snapshot.val();
          $scope.rooms = [];
          angular.forEach(rooms, function(value, key){
            value.key = key;
            $scope.rooms.push(value);
          });
          $scope.roomsReady = true;
        }, 0);
      });
      
      currentRoomRef = new Firebase('https://resplendent-fire-9421.firebaseIO.com/messages/' + $scope.username + '/' + $scope.currentRoom);
      
      currentRoomRef.on('child_added', function(snapshot) {
        //receive new message
        // will be called for each new message
        $timeout(function () {
          var message = snapshot.val();
          currentRoomRef.key = snapshot.key();
          $scope.messages.push(message);
        }, 0);
      });
  
      currentRoomRef.on('value', function(snapshot) {
        //Initialize messages
        $timeout(function () {
          var messages = snapshot.val();
        
          $scope.messages = [];
        
          angular.forEach(messages, function(value, key){
            value.key = key;
            $scope.messages.push(value);
          });

        }, 0);
      
      });
    };
    
    $scope.updateChatRef();

  }]);
});
