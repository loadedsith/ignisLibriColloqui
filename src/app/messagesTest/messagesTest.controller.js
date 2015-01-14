define(['controllerModule'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesTestController', ['$scope', 'Config',
    function($scope, Config) {
      console.log('MessagesTestController');
      $scope.Strings = Config.strings;
    }]);
});
