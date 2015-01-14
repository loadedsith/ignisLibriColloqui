'use strict';
define(['controllerModule', 'angular'], function(controllers) {
  return controllers
  .controller('NavbarController', ['$scope', 'Config', function($scope, Config) {
    $scope.Strings = Config.strings;
    
    $scope.date = new Date();
  }]);

});
