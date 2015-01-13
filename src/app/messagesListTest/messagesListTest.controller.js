define(['controllerModule'],function (controllers) {
'use strict';
return controllers
  .controller('MessagesListTestController', ['$scope','$timeout','Strings', function ($scope, $timeout, Strings) {
    console.log('MessagesListTestController');
    $scope.Strings = Strings;
    
  }]);  
});
