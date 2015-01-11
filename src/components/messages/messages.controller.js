define(['controllerModule', 'angular'],function (controllers) {
  'use strict';
  return controllers.controller('MessagesController', ['$scope', '$timeout' ,'FirebaseService', 'UserService', function ($scope,$timeout ,FirebaseService, UserService) {//$scope
    console.log('Hi everybody, im the MessagesController');
    debugger;
    
    $scope.username = 'newUser';
    $scope.messages = [];
    var userChat = new Firebase('https://resplendent-fire-9421.firebaseIO.com/messages/' + $scope.username);
    
    $scope.messageInput = function () {//extra attr; e
      userChat.push({
        name: $scope.name,
        message: $scope.message
      });
      $scope.message = '';
    };

    $scope.updateChatRef = function () {
      debugger;

      userChat = new Firebase('https://resplendent-fire-9421.firebaseIO.com/messages/' + $scope.username);
      
      userChat.on('child_added', function(snapshot) {
        //receive new message
        // will be called for each new message
        $timeout(function () {
          var message = snapshot.val();
          message.key = snapshot.key();
          $scope.messages.push(message);
        }, 0);
      });
  
      userChat.on('value', function(snapshot) {
        //Initialize messages
        $timeout(function () {
          var messages = snapshot.val();
        
          $scope.messages = [];
        
          angular.forEach(messages, function(value, key){
            value.key = key;
            $scope.messages.push(value);
          });

        }, 0);
      
      });
    }
    
    $scope.updateChatRef();

  }]);
});
