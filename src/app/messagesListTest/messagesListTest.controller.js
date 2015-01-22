define(['controllerModule'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesListTestController', ['$scope', '$timeout', 'Config', 'MessagesService',
    function($scope, $timeout, Config, MessagesService) {
      console.log('MessagesListTestController');
      $scope.Strings = Config.strings;
      $scope.testMode = true;

      $scope.username = 'username1234';
      $scope.currentRoom = 'testRoom';
      $scope.setCurrentRoom = function(room) {
        console.log('nervous Professor pig');
        $scope.currentRoom = room;
      };
      MessagesService.username = $scope.username;
      MessagesService.currentRoom = $scope.currentRoom;

      MessagesService.updateMessagesRef();

      $scope.messageInput = function() {
        console.log('send message: ', $scope.message);
        var successful = MessagesService.sendMessage($scope.message, $scope.currentRoom);
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
