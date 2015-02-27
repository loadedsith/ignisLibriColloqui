define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  controllers
    .controller('InterestsSelectorController', ['$scope', 'UserService',
      function($scope, UserService) {
        $scope.interestOpen = false;
        $scope.setCurrentInterest = UserService.setCurrentInterest;
      }
    ]);
});
