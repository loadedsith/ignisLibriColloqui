define(['services/serviceModule', 'angular'], function(services, angular) {
  'use strict';
  return services.service('ILCServerService',
  ['Config', 'MessagesService', 'UserService', 'MatchMakerService', '$socket',
   function(Config, MessagesService, UserService, MatchMakerService, $socket) {
    var _this = this;

    _this.getProfile = function(user) {
      if (_this.accessToken === undefined) {
        console.log('gotta have a successful login before you go requesting profiles, son.');
      } else{
        var config = {
          user:user,
          accessToken:_this.accessToken,
        }
        $socket.emit('get profile',config);
      }
    }

    _this.login = function(accessToken) {
      // send access token
      $socket.emit('login validator', accessToken);
      MessagesService.sendMessage = function(message, currentRoom) {
        var config = {
          message:message,
          accessToken:accessToken,
          room:currentRoom
        }
        $socket.emit('send message', config);
      }
      // listen for confirmation of a valid user
      $socket.on('user valid', function(user) {
        var config = {
          'userId': user.data['user_id'],
          'accessToken': _this.accessToken
        };
        //found a valid user, so stash the token
        _this.accessToken = accessToken;
        $socket.emit('get user matches', config);
      });
    }

    $socket.on('user disconnected', function(value) {
      console.log('disconnected',value);
    })

    $socket.on('user profile', function(user) {
      UserService.setUserProfile(user);
    })

    $socket.on('rooms set', function(rooms) {
      console.log('ilc rooms Set', rooms);
      MessagesService.setRooms(rooms);
    });

    $socket.on('got user matchList', function(matchList) {
      console.log('ilc got user matchList', matchList);
      UserService.setMatchList(matchList)
    });

    $socket.on('message sent', function(message) {
      console.log('message sent', message);
      MessagesService.messageSent(message);
    });

    $socket.on('room update', function(room) {
      console.log('ilc room update', room);
      MessagesService.roomUpdate(room);
      // $scope.messages[room.room] = room;
    });

    $socket.on('room set', function(room) {
      console.log('ilc room set', room);
      MessagesService.roomSet(room);
      // $scope.messages[room.room] = {};
      // $scope.messages[room.room] = room.snapshot;
    });

    $socket.on('pong', function (data) {
      console.log('ilc pong', data);
    });

    return _this;
  }]);
});
