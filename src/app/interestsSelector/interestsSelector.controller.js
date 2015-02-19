'use strict';
define(['controllerModule', 'angular'], function(controllers) {
  controllers
    .controller('InterestsSelectorController', ['$scope','UserService', function($scope, UserService) {
      $scope.interestOpen = false;
      $scope.setCurrentInterest = UserService.setCurrentInterest;
    }]);
});
