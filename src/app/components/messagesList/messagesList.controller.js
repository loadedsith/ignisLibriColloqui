define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesListController', ['$scope', '$timeout', 'Config', 'MessagesService', 'FirebaseService',
    function($scope, $timeout, Config, MessagesService, FirebaseService) {//$scope
      console.log('Hi everybody, im the MessagesListController');

      $scope.Strings = Config.strings;

      $scope.messages = [];
      $scope.rooms = [];

      $scope.roomsReady = false;

      $scope.setCurrentRoom = function (name) {
        MessagesService.setCurrentRoom(name);
      }

      $scope.updateMessagesRef = function () {
        MessagesService.updateMessagesRef()
      }

      $scope.$on('MessagesService:UpdateMessages',function (event, messages) {
        console.log('updateMessages', messages);
        $scope.messages = messages;
      });

      $scope.$on('MessagesService:UpdateRooms',function (event, rooms) {
        console.log('updateRooms', rooms);
        $scope.rooms = rooms;
        $scope.roomsReady = true;
      });

    }]);
});
