define(['controllerModule'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesController', ['$scope', 'Config', 'MessagesService',
    function($scope, Config, MessagesService) {
      console.log('Messages Controller');
      $scope.Strings = Config.strings;
      
      $scope.$on('UserService:Update',function (event, user) {
        var username = (((user||{}).info||{}).id||'no username');
        if (username !== 'no username'){
          MessagesService.username = username;
          MessagesService.updateChatRef();
        }
      });
    }]);
});
