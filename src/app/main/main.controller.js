'use strict';

angular.module('ignisLibriColloqui')
  .controller('MainCtrl', ['$scope','FacebookService',function ($scope, FacebookService) {
    
    var myDataRef = new Firebase('https://lrsuuieov6o.firebaseio-demo.com/');
    $scope.messages = [
      {name:"smiling", text:"Merganser!!"},
      {name:"Electrical",text:"Engineer Red"},
    ];
    
    $scope.messageInput = function (e) {
      myDataRef.push({name: $scope.name, text:$scope.message});
      $scope.message = "";
    }
    
    $scope.checkLoginState = FacebookService.checkLoginState;
    
    $scope.loginToFacebook = function () {
      FB.login(function () {
        if (response.status === 'connected') {
           // Logged into your app and Facebook.
         } else if (response.status === 'not_authorized') {
           // The person is logged into Facebook, but not your app.
         } else {
           // The person is not logged into Facebook, so we're not sure if
           // they are logged into this app or not.
         }
      },{scope: 'public_profile,email'})
    };
    
    myDataRef.on('child_added', function(snapshot) {
      //We'll fill this in later.
      var message = snapshot.val();
      $scope.messages.push(message);
    });
    
  }]);