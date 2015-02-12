define(['services/serviceModule', 'angular'], function(services, angular) {
  'use strict';
  return services.service('ILCServerService',
  ['$q', 'Config', 'MessagesService', 'UserService', '$socket',
   function($q, Config, MessagesService, UserService, $socket) {
    var _this = this;

    _this.updatingProfile = false;
    _this.updatingProfilePromise = $q.defer();

    _this.setProfile = function(user) {
      console.log('ilc setProfile',user);
      _this.updatingProfile = true;
      var config = {
        user:user,
        accessToken: _this.accessToken
      }
      if(_this.accessToken === undefined){
        console.log('cant make any requests without an access token');
        return _this.updatingProfilePromise.promise;//TODO: These seem wrong, maybe no big deal, but there's no difference between accepted and rejected
      }
      if (user.profile === undefined) {
        console.log('cant set a profile if it doenst exist');
        return _this.updatingProfilePromise.promise;//TODO: These seem wrong, maybe no big deal, but there's no difference between accepted and rejected
      }
      $socket.emit('set profile', config);
      console.log('emit set profile', config);
      return _this.updatingProfilePromise.promise;
    };

    $socket.on('user profile update', function(data) {
      console.log('user profile updated');
      _this.updatingProfile = false;
      _this.updatingProfilePromise.resolve(data);
    });

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
        UserService.setUser(user);
        var config = {
          'userId': user.data['user_id'],
          'accessToken': _this.accessToken
        };
        //found a valid user, so stash the token
        _this.accessToken = accessToken;
      });
    };

    $socket.on('user disconnected', function(value) {
      console.log('disconnected',value);
    })

    $socket.on('user profile', function(user) {
      UserService.setUserProfile(user);
    })

    $socket.on('rooms set', function(rooms) {
      // console.log('ilc rooms Set', rooms);
      MessagesService.setRooms(rooms);
    });

    $socket.on('got user matchList', function(matchList) {
      // console.log('ilc got user matchList', matchList);
      UserService.setMatchList(matchList)
    });

    $socket.on('message sent', function(message) {
      // console.log('message sent', message);
      MessagesService.messageSent(message);
    });

    $socket.on('room update', function(room) {
      // console.log('ilc room update', room);
      MessagesService.roomUpdate(room);
    });

    $socket.on('room set', function(room) {
      // console.log('ilc room set', room);
      MessagesService.roomSet(room);
    });

    $socket.on('pong', function (data) {
      console.log('ilc pong', data);
    });
    return _this;
  }]);
});
