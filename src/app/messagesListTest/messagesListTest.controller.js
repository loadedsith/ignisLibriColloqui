define(['controllerModule'], function(controllers) {
  'use strict';
  return controllers.controller('MessagesListTestController', ['$scope', '$timeout', 'Config',
    function($scope, $timeout, Config) {
      console.log('MessagesListTestController');
      $scope.Strings = Config.strings;
    }]);
});
