define(['controllerModule'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesListTestController', ['$scope', '$timeout', 'Config', 'MessagesService',
    function($scope, $timeout, Config, MessagesService) {
      console.log('MessagesListTestController');
      $scope.Strings = Config.strings;
      $scope.testMode = true;
      
      $scope.username = 'username1234';
      $scope.currentRoom = 'testRoom';
      
      MessagesService.username = $scope.username;
      MessagesService.currentRoom = $scope.currentRoom;
      
      MessagesService.updateChatRef();
      
      $scope.messageInput = function () {
        console.log('send message: ', $scope.message);
        var successful = MessagesService.sendMessage($scope.message);
        if (successful) {
          $scope.message = '';
        }
      }
      
      $scope.updateChatRef = function (event) {
        MessagesService.username = $scope.username;
        MessagesService.currentRoom = $scope.currentRoom;
        console.log('$scope.currentRoom', $scope.currentRoom);
        MessagesService.updateChatRef();
      }
    }]);
});
