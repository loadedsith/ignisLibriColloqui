define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers
  .controller('NavbarController', ['$scope', 'Config', function($scope, Config) {
    $scope.Strings = Config.strings;
    $scope.devLinks = Config.devLinks;
    $scope.showMobileNav = false;
  }]);
});
