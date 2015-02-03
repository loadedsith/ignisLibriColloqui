define(['controllerModule'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesTestController', ['$scope', 'Config',
    function($scope, Config) {
      $scope.Strings = Config.strings;
      $scope.test = true;
    }]);
});
