define(['controllerModule', 'angular'],function (controllers) {
'use strict';
return controllers
  .controller('MainController', ['$scope', '$timeout', 'FacebookService', 'StatusService','FirebaseService', function ($scope, $timeout, FacebookService, StatusService, FirebaseService) {//,
    console.log('MainController');
    //ensure that status calls reference the current status
    $scope.status = function () {
      return StatusService.status;
    };
    
    StatusService.setStatus(StatusService.loading);

    $scope.messageInput = function () {//extra attr; e
      FirebaseService.chatRef.push({
        name: $scope.name,
        message: $scope.message
      });
      $scope.message = '';
    };

    if (FirebaseService.chatRef) {//FirebaseService.chatRef maybe disabled for debugging, re-enable in the service, if that was intentional, move on without it.
      
      FirebaseService.chatRef.on('child_added', function(snapshot) {
        //receive new message
        // will be called for each new message
        $timeout(function () {
          var message = snapshot.val();
          message.key = snapshot.key();
          $scope.messages.push(message);
        }, 0);
      });
    
      FirebaseService.chatRef.on('value', function(snapshot) {
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
});
