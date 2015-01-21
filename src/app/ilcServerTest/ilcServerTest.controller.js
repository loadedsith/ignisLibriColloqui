define(['controllerModule', 'angular'], function(controllers) {
  'use strict';
  return controllers.controller('ILCServerTestController', [
    '$scope', 'Config', 'ILCServerService','$socket',
    function($scope, Config, ILCServer, $socket) {
      console.log('ILC Server Test Controller, reporting in.');
      $scope.Strings = Config.strings;
      
      //test user open_fnvwvuk_user@tfbnw.net's access id,
      //created using https://developers.facebook.com/apps/[APP API KEY]/roles/test-users/
      $scope.fakedToken = 'CAAJnbZAScLU4BACHW9SZB1GIe0xDTYrRJ544RjcZAAYtJZBhTiZCsxBWqe8ETO' +
      'FPdoQ5d26bD2ZB61tEWKRiJ6IiOuP4hZA4KnZARR19KbBcA81xXzr4V8XzgutCbskenc9yvZASddKUwkZAG' +
      'lBehJCaZAZAdlYvJDAM3MJ40XYCbf8kEujqfTWUtQupuUd9Vn9w1k7ok25Hvrd4MiaBILZCaiDmNB0Xg2HtsnhsZD';

      //test user open_fnvwvuk_user@tfbnw.net's user_id,
      $scope.fakeUserId = '1396362880657353';

      $socket.on('loggedIn', function(data) {
        $scope.data = data;
      });

      $scope.testLogin = function() {
        $socket.emit('loginValidator', $scope.fakedToken);
      };

      $scope.loginStatus = 'Original';

      $scope.getMatches = function() {
        var config = {
          'userId': $scope.fakeUserId,
          'accessToken': $scope.fakedToken,
          'profile':'Goober Bean Boo: ' + Math.floor(Math.random() * 100)
        };
        $socket.emit('get user matches', config);
      };


      $scope.setProfile = function() {
        var config = {
          'userId': $scope.fakeUserId,
          'accessToken': $scope.fakedToken,
          'profile':'Goober Bean Boo: ' + Math.floor(Math.random() * 100)
        };
        $socket.emit('set profile', config);
      };

      $socket.on('user valid', function(user) {
        $scope.loginStatus = 'Login Success! Getting Local Profile...';
        var config = {
          'userId': $scope.fakeUserId,
          'accessToken': $scope.fakedToken
        };
        $socket.emit('get profile', config);
      });

      $socket.on('user error', function(profile) {
        console.log('user error');
      });

      $socket.on('user profile', function(profile) {
        $scope.loginStatus = 'Got Profile!';
        $scope.profile = profile;
      });

      $scope.openRandomRoom = function() {
        var fakeSecondUser = 10000 + Math.floor(Math.random() * 100000);//lookin for a 5 didgit-ish random number, kk?
        var fakeUserIds = {
          'localId':$scope.fakeUserId,
          'remoteId':fakeSecondUser
        };
        $socket.emit('open room', fakeUserIds);
      };

      $scope.rooms = [];

      $socket.on('rooms update', function(room) {
        console.log('rooms update', room);
        $scope.rooms.push(String(room.remoteId));
      });

      $socket.on('rooms set', function(rooms) {
        console.log('rooms Set', rooms);
        $scope.rooms = rooms;
      });
      $scope.cards = $scope.matchList;
      $scope.matchList = {};
      $socket.on('got user matchList', function(matchList) {
        console.log('got user matchList', matchList);
        $scope.matchList = matchList;
        $scope.cards = $scope.matchList;
      });

      $scope.messages = {};
      $socket.on('room update', function(room) {
        console.log('room update', room);
        $scope.messages[room.room] = room;
      });

      $socket.on('room set', function(room) {
        console.log('room set', room);
        $scope.messages[room.room] = {};
        $scope.messages[room.room] = room.snapshot;
      });

      $socket.on('pong', function (data) {
        console.log('pong', data);
      });
      $scope.ping = function() {
        var data = {"test key":"test value"};
        console.log('ping', data);
        $socket.emit('ping', data);
      }
    }]);
});
