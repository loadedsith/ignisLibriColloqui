define(['services/serviceModule', 'angular'], function(services, angular) {
  'use strict';
  return services.service('ILCServerService',
  ['$q', 'Config', 'MessagesService', 'UserService', '$socket',
   function($q, Config, MessagesService, UserService, $socket) {
    var _this = this;

    _this.updatingCurrentInterest = false;
    _this.updatingCurrentInterestPromise = $q.defer();

    _this.setCurrentInterest = function(user) {
      console.log('setCurrentInterest',user);
      var config = {
        user:user,
        accessToken: _this.accessToken
      }
      if (_this.accessToken === undefined) {
        console.log('cant make any requests without an access token');
        //TODO: These seem wrong, maybe no big deal,
        //  but there's no difference between accepted and rejected
        return _this.updatingCurrentInterestPromise.promise;
      }
      if (user.profile === undefined) {
        console.log('cant set a profile if it doens\'t exist');
        //TODO: These seem wrong, maybe no big deal,
        //  but there's no difference between accepted and rejected
        return _this.updatingCurrentInterestPromise.promise;
      }
      if (user.profile.currentInterest === undefined) {
        console.log('cant set a profile.currentInterest if it doens\'t exist');

      }
      _this.updatingCurrentInterest = true;

      $socket.emit('set current interest', config);
      $socket.once('user current interest update',function(results) {
        _this.updatingCurrentInterestPromise.resolve(results)
        _this.updatingCurrentInterest = false;
      });
      return _this.updatingCurrentInterestPromise.promise;
    };


    _this.updatingProfile = false;
    _this.updatingProfilePromise = $q.defer();

    _this.setProfile = function(user) {
      console.log('ilc setProfile', user);
      _this.updatingProfile = true;
      var config = {
        user:user,
        accessToken: _this.accessToken
      }
      if (_this.accessToken === undefined) {
        console.log('cant make any requests without an access token');
        //TODO: These seem wrong, maybe no big deal,
        //  but there's no difference between accepted and rejected
        return _this.updatingProfilePromise.promise;
      }
      if (user.profile === undefined) {
        console.log('cant set a profile if it doenst exist');
        //TODO: These seem wrong, maybe no big deal,
        //  but there's no difference between accepted and rejected
        return _this.updatingProfilePromise.promise;
      }
      $socket.emit('set profile', config);
      console.log('emit set profile', config);
      return _this.updatingProfilePromise.promise;
    };

    _this.getProfile = function(user) {
      if (_this.accessToken === undefined) {
        console.log('gotta have a successful login before you go requesting profiles, son.');
      } else {
        var config = {
          user: user,
          accessToken: _this.accessToken,
        }
        $socket.emit('get profile', config);
      }
    };

    _this.closeRoom = function(room) {
      if (room === undefined) {
        console.log('close room was invoked with the wrong arguments. Expects room to be set');
        return;
      } else {
        var config = {
          room:room
        }
        if (_this.accessToken !== undefined) {
          config.accessToken = _this.accessToken;
          $socket.emit('close room', config);
        } else {
          console.log('couldnt close the room because the access token was undefined: ', room);
        }
      }
    };

    _this.sendMessage = function(config) {
      if (_this.accessToken === undefined) {
        config.accessToken = _this.accessToken;
        $socket.emit('send message', config);
      } else {
        console.log('couldnt set that message because the access token was undefined: ', config);
      }
    }

    _this.login = function(accessToken) {
      // send access token
      var socket = $socket.socket;
      if (socket.disconnected === true) {
        socket.io.connect();
      }
      if (accessToken === null || accessToken === undefined) {
        console.log('dont validate, but what caused this?');
        return;
      }
      $socket.emit('login validator', accessToken);
      // UserService.userInfoCallback();
      MessagesService.sendMessageEventListener = _this.sendMessage;

      // listen for confirmation of a valid user
      $socket.on('user valid', function(user) {
        UserService.loginSuccess(user);
        UserService.setUser(user);
        var config = {
          'userId': user.data['user_id'],
          'accessToken': _this.accessToken
        };
        //found a valid user, so stash the token
        _this.accessToken = accessToken;
      });
    };

    _this.disconnectMe = function() {
      // $socket.emit('disconnectMe', _this.accessToken);
      $socket.socket.io.disconnect();
    };

    _this.connectTimeoutEvent;
    $socket.on('connect_timeout', function(value) {
      if (typeof _this.connectTimeoutEvent === 'function') {
        _this.connectTimeoutEvent(value)
      } else {
        console.log('connect_timeout', value);
      }
    });

    _this.disconnectEvent;
    $socket.on('disconnect', function(value) {
      if (typeof _this.disconnectEvent === 'function') {
        _this.disconnectEvent(value)
      } else {
        console.log('disconnect', value);
      }
    });

    _this.connectEvent;
    $socket.on('connect', function(value) {
      if (typeof _this.connectEvent === 'function') {
        _this.connectEvent(value)
      } else {
        console.log('connect', value);
      }
    });

    _this.connectErrorEvent;
    $socket.on('connect_error', function(value) {
      if (typeof _this.connectErrorEvent === 'function') {
        _this.connectErrorEvent(value)
      } else {
        console.log('connect_error', value);
      }
    });

    $socket.on('user profile update', function(data) {
      console.log('user profile updated');
      _this.updatingProfile = false;
      _this.updatingProfilePromise.resolve(data);
    });

    $socket.on('user profile', function(user) {
      UserService.setUserProfile(user);
    });

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

    $socket.on('pong', function(data) {
      console.log('ilc pong', data);
    });
    return _this;
  }]);
});
