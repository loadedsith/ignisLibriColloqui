'use strict';

angular.module('ignisLibriColloqui')
  .controller('MainCtrl', ['$scope', '$timeout', 'FacebookService', 'FirebaseService', function ($scope, $timeout, FacebookService, FirebaseService) {
    $scope.messages = [];
    var Status = {
      loading : {
        text:"Loading...",
        class:"status-loading"
      },
      ready : {
        text:"Ready",
        class:"status-ready"
      },
    }
    $scope.status = Status.loading;
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
      $timeout(function () {
        var message = snapshot.val();
        message.key = snapshot.key();
        console.log('on child_added message', message);
        $scope.messages.push(message);
      },0);
    });
    
    FirebaseService.dataRef.on('value', function(snapshot) {
      $scope.status = Status.ready;
      $timeout(function () {
        var messages = snapshot.val();
        $scope.messages = [];
        angular.forEach(messages, function(value, key){
          value.key = key;
          $scope.messages.push(value);
        });
      },0)
      console.log('on value messages', $scope.messages);
    });

  }]);