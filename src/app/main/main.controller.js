'use strict';

angular.module('ignisLibriColloqui')
  .controller('MainController', ['$scope', '$timeout', 'FacebookService', 'FirebaseService', 'StatusService', 'UserService', function ($scope, $timeout,  FacebookService, FirebaseService, StatusService, UserService) {
    
    $scope.messages = [];
    
    $scope.loggedIn = function () {
      return UserService.loggedIn;
    };
    
    //ensure that status calls reference the current status
    $scope.status = function () {
      return StatusService.status;
    };
    
   
    
    StatusService.setStatus(StatusService.loading);

    $scope.messageInput = function () {//extra attr; e
      FirebaseService.dataRef.push({
        name: $scope.name,
        message: $scope.message
      });
      $scope.message = '';
    };
    
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

        }, 0);
        
      });
      
    }


  }]);