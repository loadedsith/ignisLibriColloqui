define(['services/serviceModule'], function(services) {
  'use strict';
return services.service('MessagesService', ['$rootScope', 'Config', 'FirebaseService','$timeout',
   function($rootScope, Config, FirebaseService, $timeout) {
      var _this = this;
      
      _this.rooms=[];
      _this.messages=[];
      
      _this.currentRoom = '';
      
      _this.sendMessage = function (message) {
        
        if(_this.currentRoom === undefined||_this.currentRoom === ''){
          console.debug("Talking to yourself again?");
          return false;
        }
        if(_this.currentRoomRef === undefined){
          _this.updateChatRef();
        }
        
        if(_this.currentRoomRef !== undefined){
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
        //Initialize messages
        _this.roomsReady = false;
        var rooms = snapshot.val();
        _this.rooms = [];
        angular.forEach(rooms, function(value, key) {
          value.key = key;
          _this.rooms.push(value);
        });
        _this.roomsReady = true;
        
        if (_this.rooms[0] !== '' && _this.rooms[0] !== undefined){
          _this.setCurrentRoom(_this.rooms[0].key);
        }
        
        $rootScope.$broadcast('MessagesService:UpdateRooms', _this.rooms)
      };
      
      _this.setCurrentRoom = function (name) {
        console.log('currentRoom', _this.currentRoom);
        _this.currentRoom = name;
      }
      
      _this.chatUpdate = function(snapshot) {
        //receive new message
        // will be called for each new message
        var message = snapshot.val();
        _this.currentRoomRef.key = snapshot.key();
        _this.messages.push(message);
        $rootScope.$broadcast('MessagesService:UpdateMessages', _this.messages)
      };
      
      _this.setChat = function(snapshot) {
        //Initialize messages
        var messages = snapshot.val();
        _this.messages = [];
        angular.forEach(messages, function(value, key) {
          value.key = key;
          _this.messages.push(value);
        });
        $rootScope.$broadcast('MessagesService:UpdateMessages', _this.messages)
      };
      
      _this.updateChatRef = function() {
        console.log('updateChatRef');
        if (_this.username === undefined) {
          console.debug('Username undefined, not bothering to updateChatRef, did you forget to set it?');
          return;
        }
        var messagesRoot = FirebaseService.firebaseUrl + '/messages';
        var userMessages = messagesRoot + '/' + _this.username;
        if (_this.currentRoom !== '' && _this.currentRoom !== undefined) {
          var userRoomMessages = userMessages + '/' + _this.currentRoom;
          _this.currentRoomRef = new Firebase(userRoomMessages);
          _this.currentRoomRef.on('child_added', _this.chatUpdate);
          _this.currentRoomRef.on('value', _this.setChat);
          
        }
        var roomListRef = new Firebase(userMessages);
        roomListRef.on('child_added', _this.roomAdded);
        roomListRef.on('value', _this.setRooms);
      };
      
      return _this;
    }]);
});
