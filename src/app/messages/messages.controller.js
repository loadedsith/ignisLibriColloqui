define(['controllerModule'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesController', ['$scope', 'Config',
    function($scope, Config) {
      console.log('Messages Controller');
      $scope.Strings = Config.strings;

    }]);
});
