define(['controllerModule'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesListTestController', ['$scope', '$timeout', 'Config', 'MessagesService',
    function($scope, $timeout, Config, MessagesService) {
      $scope.Strings = Config.strings;
      $scope.testMode = true;

      $scope.username = 'username1234';
      $scope.currentRoom = 'testRoom';
      $scope.setCurrentRoom = function(room) {
        $scope.currentRoom = room;
      };
      MessagesService.username = $scope.username;
      MessagesService.currentRoom = $scope.currentRoom;

      $scope.messageInput = function() {
        var successful = MessagesService.sendMessage($scope.message, $scope.currentRoom);
        if (successful) {
          $scope.message = '';
        }
      }
    }]);
});
