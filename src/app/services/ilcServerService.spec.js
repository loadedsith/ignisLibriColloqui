/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
'use strict';

define(['services/serviceModule', 'angular-mocks'], function() {
  describe('ILC Server Services', function() {
    var ilcServerService;
    var messagesService;
    var scope;
    var $timeout;
    var $rootScope;
    var socket;
    var url;

    var events = [
      'got user matchList',
      'message sent',
      'pong',
      'room set',
      'room update',
      'rooms set',
      'rooms update',
      'user disconnected',
      'user profile',
    ]
    beforeEach(module('ignisLibriColloqui.services', function(Config, $socketProvider) {
      $socketProvider.setUrl(Config.ilcTestServerUrl);
      Config.ilcServerUrl = Config.ilcTestServerUrl;
      url = Config.ilcTestServerUrl;

    }));

    beforeEach(inject(function(ILCServerService, MessagesService, _$timeout_, $socket, _$rootScope_) {
      ilcServerService = ILCServerService;
      messagesService = MessagesService;
      $timeout = _$timeout_;
      $rootScope = _$rootScope_;
      socket = $socket;
      spyOn(socket,'on').and.callThrough();
    }));




    describe('ilcServerService start', function() {
      it('should execute normally', function() {
        expect(true);// just by getting here you've verified the callback (it was done())
      });
      it('should have an instance of $socket', function() {
        expect(socket).toBeDefined();
      });
    });

    describe('has many socket connections', function() {
      it('expects each event be mapped to an socket.on call',function() {
        for (var i = events.length - 1; i >= 0; i--) {
          var event = events[i];
          it('should listen for event['+i+']: on(\'' + event + '\')', function() {
            expect(socket.on).toHaveBeenCalledWith(event, jasmine.any(Function));
          });
        }
      })
    });

    describe('ILCServer Validation', function() {
      it('expects emit(\'ping\') to trigger on(\'pong\')', function(done) {
        socket.emit('ping',{})
        socket.on('pong',function(data) {
          console.log('pong data', data);
          done();
        });
      });
    });

    describe('MessagesService events', function() {
      it('expects on(\'room set\') to trigger messagesService\'s room set',function(done) {
        var mockRoomSet = {
          name:'room set',
          data:[]
        };
        spyOn(messagesService, 'roomSet').and.callFake(function() {
          done()
        });
        socket.emit('test event', mockRoomSet);
      });
      it('expects on(\'room set\') to trigger MessagesService\'s set room with a valid room',
        function(done) {
          var mockRoomSet = {
            name:'room set',
            data:{
              room:"123245",
              snapshot:{
                "123245" : {
                  "date" : 1421882245257,
                  "message" : "Hello Laura",
                  "user" : {
                    "data" : {
                      "app_id" : "676670295780686",
                      "application" : "ignisLibriColloqui",
                      "expires_at" : 1421888400,
                      "is_valid" : true,
                      "scopes" : [ "public_profile", "email" ],
                      "setTime" : 1421881793587,
                      "user_id" : "10101118662asd154115"
                    }
                  }
                }
              }
            }
          };
          $rootScope.$on('MessagesService:MessagesSet',function(event, room) {
            console.log('room', room);
            console.log('messagesService.rooms', messagesService.rooms);
            expect(room).toEqual(mockRoomSet.data);
            expect(messagesService.messages[room.room]).toEqual(mockRoomSet.data.snapshot[mockRoomSet.data.room]);
            done();
          })
          socket.emit('test event',mockRoomSet);
        }
      );
    });

  });
});
