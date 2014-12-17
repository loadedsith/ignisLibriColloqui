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
        frames: "🐶🐱🐭🐹🐰🐸🐯🐨🐻🐷🐮🐼🐙🌞🌝😺👲👳👮👷💂👵👴👨👧👦👶👱👼👺👹",
        randomize: true,
        delay: 150
      }
    };
  
    StatusService.ready = {
      text:"Ready",
      animation:{
        frames:["😃","👍"],
        randomize:true,
        delay:150
      },
      class:"status-ready"
    };
    
    StatusService.setStatus(StatusService.loading);
    
    StatusService.animator();
    
    $scope.messageInput = function (e) {
      FirebaseService.dataRef.push({
        name: $scope.name,
        message: $scope.message
      });
      $scope.message = "";
    }
    
    $scope.checkLoginState = FacebookService.checkLoginState;
    
    $scope.loginToFacebook = FacebookService.login;
    
    if(FirebaseService.dataRef){//Sometimes disabled for debugging, re-enable in the service.
      
      FirebaseService.dataRef.on('child_added', function(snapshot) {
        //receive new message
        // will be called for each new message
        $timeout(function () {
          var message = snapshot.val();
          message.key = snapshot.key();
          $scope.messages.push(message);
        }, 0);
      });
    
      FirebaseService.dataRef.on('value', function(snapshot) {
        //Initialize messages
        $timeout(function () {
          
          StatusService.setStatus(StatusService.ready);
          
          var messages = snapshot.val();
          
          $scope.messages = [];
          
          angular.forEach(messages, function(value, key){
            value.key = key;
            $scope.messages.push(value);
          });
          
        }, 0)
      });
      
    }
    StatusService.setStatus(StatusService.loading);
    $timeout(function () {
          StatusService.setStatus(StatusService.ready);
    },1000)

  }]);