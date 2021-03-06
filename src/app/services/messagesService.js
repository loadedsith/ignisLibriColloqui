define(['services/serviceModule'], function(services) {
  'use strict';
  return services.service('MessagesService', ['$rootScope', 'Config', '$timeout',
    function($rootScope, Config, $timeout) {
      var _this = this;

      _this.rooms = [];
      _this.messages = [];

      _this.currentRoom = '';

      _this.sendMessageEventListener = function() {
        console.log('default sendMessageEventListener');
      };

      _this.sendMessage = function(message, currentRoom) {
        var config = {
          message:message,
          room:currentRoom
        };
        if (typeof _this.sendMessageEventListener === 'function') {
          _this.sendMessageEventListener(config);
        }
      };

      _this.roomAdded = function(snapshot) {
        //receive new message
        // will be called for each new message
        $timeout(function() {
          var room = snapshot.val();
          room.key = snapshot.key();
          _this.rooms.push(room);
        }, 0);
        $rootScope.$broadcast('MessagesService:UpdateRooms', _this.rooms);
      };

      _this.setRooms = function(snapshot) {
        _this.roomsReady = false;
        var rooms;
        if (typeof snapshot.val === 'function') {
          rooms = snapshot.val();
        } else {
          rooms = snapshot;
        }
        _this.rooms = rooms;

        _this.roomsReady = true;

        if (_this.rooms[0] !== '' && _this.rooms[0] !== undefined) {
          _this.setCurrentRoom(_this.rooms[0]);
        }

        $rootScope.$broadcast('MessagesService:UpdateRooms', _this.rooms);
      };

      _this.messageSent = function(message) {
        $rootScope.$broadcast('MessagesService:MessageSent', message);
      };

      _this.closeRoom = function(room) {
        $rootScope.$broadcast('MessagesService:CloseRoom', room);
      };

      _this.setCurrentRoom = function(name) {
        _this.currentRoom = name;
        $rootScope.$broadcast('MessagesService:SetCurrentRoom', name);
      };
      _this.getRoomName = function(room, user, currentInterest) {
        if (currentInterest !== undefined) {
          if (user.matches !== undefined) {
            var matches = user.matches[currentInterest];
            if (matches !== undefined) {
              for (var i = matches.length - 1; i >= 0; i--) {
                var match = matches[i];
                if (String(match.id) === String(room)) {
                  return match.profile.name;
                }
              }
            }
          }
        }
        return room;
      };
      _this.populateRoomNames = function(rooms, user, currentInterest) {
        _this.roomNames = [];
        if (rooms === undefined) {
          rooms = _this.rooms;
        }
        for (var i = rooms.length - 1; i >= 0; i--) {
          var room = rooms[i];
          _this.roomNames.push({id:room, name:_this.getRoomName(room, user, currentInterest)});
        }
      };
      _this.roomSet = function(snapshot) {
        //receive new message
        // will be called for each new message
        if (snapshot.room !== undefined) {
          if (snapshot.snapshot !== null) {
            _this.messages[snapshot.room] = snapshot.snapshot[snapshot.room];
          }
        }
        $rootScope.$broadcast('MessagesService:MessagesSet', snapshot);
      };

      _this.roomUpdate = function(snapshot) {
        //receive new message
        // will be called for each new message
        // _this.rooms[snapshot.room] = snapshot.snapshot
        if (snapshot.snapshot !== undefined) {
          _this.rooms[snapshot.room] = [];
          _this.rooms[snapshot.room].push(snapshot.snapshot);
        }
        $rootScope.$broadcast('MessagesService:MessageUpdate', snapshot);
      };

      return _this;
    }]);
});
