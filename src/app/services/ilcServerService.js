define(['services/serviceModule', 'angular'], function(services, angular) {
  'use strict';
  return services.service('ILCServerService', ['Config', 'MessagesService', 'UserService', '$socket', function(Config, MessagesService, UserService, $socket) {
    var _this = this;
    // console.log('socket', socket);

    if (Config.ilcServerUrl) {
      _this.ilcServerUrl = Config.ilcServerUrl;
    } else {
      console.log('Strings.ilcServerUrl was unset');
      _this.ilcServerUrl = 'http://localhost:5000';
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

    $socket.on('rooms update', function(room) {
      console.log('ilc rooms update', room);
      MessagesService.roomAdded(room);
    });

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
      //TODO Clear input from message field
    });

    $socket.on('room update', function(room) {
      console.log('ilc room update', room);
      // $scope.messages[room.room] = room;
    });

    $socket.on('room set', function(room) {
      console.log('ilc room set', room);
      
      MessagesService.messagesUpdate(room);
      
      // $scope.messages[room.room] = {};
      // $scope.messages[room.room] = room.snapshot;
    });

    $socket.on('pong', function (data) {
      console.log('ilc pong', data);
    });

    return _this;
  }]);
});
