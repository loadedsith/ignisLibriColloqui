define(['controllerModule'],function (controllers) {
'use strict';
return controllers
  .controller('MessagesTestController', ['$scope','Strings', function ($scope, Strings) {
    console.log('MessagesTestController');
    $scope.Strings = Strings;
    
  }]);  
});
