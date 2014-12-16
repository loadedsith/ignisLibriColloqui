'use strict';

angular.module('ignisLibriColloqui')
  .controller('MainCtrl', ['$scope', '$timeout', 'FacebookService', 'FirebaseService', 'StatusService', function ($scope, $timeout,  FacebookService, FirebaseService, StatusService) {
    $scope.messages = [];
    
    $scope.status = function () {
      return StatusService.status;
    };
    
    StatusService.loading = {
      text:"Loading...",
      class:"status-loading",
      animation:{
        chars:"🌑🌒🌓🌔🌕🌖🌗🌘",
        delay:10
      }
    };
  
    StatusService.ready = {
      text:"Ready",
      class:"status-ready"
    };
    
    StatusService.status = StatusService.loading;
    
    StatusService.animator();
    
    $scope.messageInput = function (e) {
      FirebaseService.dataRef.push({
        name: $scope.name,
        message:$scope.message
      });
      $scope.message = "";
    }
    
    $scope.checkLoginState = FacebookService.checkLoginState;
    
    $scope.loginToFacebook = FacebookService.login;
    if(FirebaseService.dataRef){
      FirebaseService.dataRef.on('child_added', function(snapshot) {
        $timeout(function () {
          var message = snapshot.val();
          message.key = snapshot.key();
          $scope.messages.push(message);
        }, 0);
      });
    
      FirebaseService.dataRef.on('value', function(snapshot) {

        $timeout(function () {
          StatusService.status = StatusService.ready;
          var messages = snapshot.val();
          $scope.messages = [];
          angular.forEach(messages, function(value, key){
            value.key = key;
            $scope.messages.push(value);
          });
        }, 0)
      });
      
    }

  }]);