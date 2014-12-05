'use strict';

angular.module('ignisLibriColloqui')
  .controller('MainCtrl', ['$scope','FacebookService',function ($scope, FacebookService) {
    
    var myDataRef = new Firebase('https://lrsuuieov6o.firebaseio-demo.com/');
    
    $scope.messageInput = function (e) {
      myDataRef.push({name: $scope.name, text:$scope.message});
      $scope.message = "";
    }
    
    $scope.checkLoginState = FacebookService.checkLoginState;
    
    myDataRef.on('child_added', function(snapshot) {
      //We'll fill this in later.
      var message = snapshot.val();
      $scope.messages += message.name + ": " + message.text+"\r\n";
    });
    
  }]);