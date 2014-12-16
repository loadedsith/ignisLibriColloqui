'use strict';

angular.module('ignisLibriColloqui')
  .controller('MainCtrl', ['$scope', '$timeout', 'FacebookService', 'FirebaseService', function ($scope, $timeout, FacebookService, FirebaseService) {
    $scope.messages = [];
    
    $scope.messageInput = function (e) {
      FirebaseService.dataRef.push({
        name: $scope.name,
        message:$scope.message
      });
      $scope.message = "";
    }
    
    $scope.checkLoginState = FacebookService.checkLoginState;
    
    $scope.loginToFacebook = FacebookService.login;

    FirebaseService.dataRef.on('child_added', function(snapshot) {
      //We'll fill this in later.
      $timeout(function () {
        var message = snapshot.val();
        console.log('on child_added message', message);
        $scope.messages.push(message);
      },0);
    });
    
    FirebaseService.dataRef.on('value', function(snapshot) {
      //We'll fill this in later.
      $timeout(function () {
        var messages = snapshot.val();
        $scope.messages = [];
        angular.forEach(messages, function(value, key){
          $scope.messages.push(value);
        });
      },0)
      console.log('on value messages', $scope.messages);
    });

  }]);