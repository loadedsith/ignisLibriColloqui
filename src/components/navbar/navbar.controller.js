'use strict';
define(['controllerModule','angular'],function (controllers) {
  return controllers
  .controller('NavbarController', ['$scope','Strings', function ($scope, Strings) {
    $scope.Strings = Strings;
    
    $scope.date = new Date();
  }]);

});
