define(['services/serviceModule'], function(services) {
  'use strict';
  return services.service('MessagesService', ['$rootScope', 'Config', '$timeout',
    function($rootScope, Config, $timeout) {
      var _this = this;

      _this.rooms = [];
      _this.messages = [];

      _this.currentRoom = '';

      _this.sendMessage = function(message) {
        if (_this.currentRoom === undefined || _this.currentRoom === '') {
          console.debug('Talking to yourself again?');
          return false;
        }
        
        if (_this.currentRoomRef === undefined) {
          _this.updateMessagesRef();
        }

        if (_this.currentRoomRef !== undefined) {
          _this.currentRoomRef.push({
            name: _this.username,
            message: message
          });
        }
        return true;
      }

      _this.roomAdded = function(snapshot) {
        //receive new message
        // will be called for each new message
        $timeout(function() {
          var room = snapshot.val();
          room.key = snapshot.key();
          _this.rooms.push(room);
        }, 0);
        $rootScope.$broadcast('MessagesService:UpdateRooms', _this.rooms)
      };

      _this.setRooms = function(snapshot) {
        console.log('roomListUpdated');

        _this.roomsReady = false;
        var rooms;
        if(typeof snapshot.val === 'function'){
          rooms = snapshot.val();  
        }else{
          rooms = snapshot;
        }

        _this.rooms = [];
        angular.forEach(rooms, function(value, key) {
          // value.key = key;
          _this.rooms.push(value);
        });
        _this.roomsReady = true;

        if (_this.rooms[0] !== '' && _this.rooms[0] !== undefined) {
          _this.setCurrentRoom(_this.rooms[0].key);
        }
        console.log('Red good swordfish');
        $rootScope.$broadcast('MessagesService:UpdateRooms', _this.rooms);
      };
      
      _this.messageSent = function(message) {
        console.log('messages service messageSent', message);
        $rootScope.$broadcast('MessagesService:MessageSent', message);
      };
      _this.setCurrentRoom = function(name) {
        console.log('messages service currentRoom, name', _this.currentRoom, name);
        _this.currentRoom = name;
        $rootScope.$broadcast('MessagesService:SetCurrentRoom', name);
        
      }

      _this.roomSet = function(snapshot) {
        //receive new message
        // will be called for each new message
        var room;
        if(snapshot.snapshot!==undefined){
          _this.rooms[snapshot.room] = snapshot.snapshot;
        }
        $rootScope.$broadcast('MessagesService:MessagesSet', snapshot);
      };
      
      _this.roomUpdate = function(snapshot) {
        //receive new message
        // will be called for each new message
        // _this.rooms[snapshot.room] = snapshot.snapshot
        if(snapshot.snapshot!==undefined){
          _this.rooms[snapshot.room] = [];
          _this.rooms[snapshot.room].push(snapshot.snapshot)
        }
        $rootScope.$broadcast('MessagesService:MessageUpdate', snapshot);
      };

      _this.setMessages = function(snapshot) {
        //Initialize messages
        var messages = snapshot.val();
        _this.messages = [];
        angular.forEach(messages, function(value, key) {
          value.key = key;
          _this.messages.push(value);
        });
        $rootScope.$broadcast('MessagesService:UpdateMessages', _this.messages)
      };

      _this.updateMessagesRef = function() {
        console.log('!!!!!! updateMessagesRef is depreciated, you shouldnt see any of these either');
        // console.log('updateMessagesRef');
        // if (_this.username === undefined) {
        //   console.debug('Username undefined, not bothering to updateMessagesRef, did you forget to set it?');
        //   return;
        // }
        // var messagesRoot = FirebaseService.firebaseUrl + '/messages';
        // var userMessages = messagesRoot + '/' + _this.username;
        // if (_this.currentRoom !== '' && _this.currentRoom !== undefined) {
        //   var userRoomMessages = userMessages + '/' + _this.currentRoom;
        //   _this.currentRoomRef = new Firebase(userRoomMessages);
        //   _this.currentRoomRef.on('child_added', _this.messagesUpdate);
        //   _this.currentRoomRef.on('value', _this.setMessages);
        // 
        // }
        // var roomListRef = new Firebase(userMessages);
        // roomListRef.on('child_added', _this.roomAdded);
        // roomListRef.on('value', _this.setRooms);
      };

      return _this;
    }]);
});
