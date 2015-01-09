'use strict';
define(['controllerModule','angular'],function (controllers) {
  return controllers
  .controller('NavbarController', ['$scope', function ($scope) {

    $scope.date = new Date();
  }]);

});
