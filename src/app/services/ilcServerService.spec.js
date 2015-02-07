/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
'use strict';

define(['services/serviceModule', 'angular-mocks', 'mockUserProfile'], function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
  localStorage.debug = 'ERROR';
  describe('ILC Server Services', function() {
    var socket;
    var url;
    var ilcServerService;
    var messagesService;
    var userService;
    var scope;
    var $timeout;
    var $rootScope;


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

    beforeEach(inject(function(ILCServerService, MessagesService, UserService, _$timeout_, $socket, _$rootScope_) {
      ilcServerService = ILCServerService;
      messagesService = MessagesService;
      userService = UserService;
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
          done();
        });
      });
    });

    describe('login', function() {
      var mockAccessToken = 'abcd1234';
      var mockLoginEvent = {
        name:'login',
        data:{}
      };
      it('should trigger an emit to validate login',
        function() {
          spyOn(socket, 'emit');
          ilcServerService.login(mockAccessToken);
          expect(socket.emit).toHaveBeenCalledWith('login validator', mockAccessToken);
        }
      );
      it('should trigger an emit to validate login, which should be answered',
        function() {
          ilcServerService.login(mockAccessToken);
          expect(socket.on).toHaveBeenCalledWith('user valid', jasmine.any(Function));
        }
      );
    });


    describe('user profile event', function() {
      var mockUserProfileEvent = {
        name:'user profile',
        data:mockUserProfile
      };
      it('should trigger UserService.setUserProfile',
        function(done) {
          spyOn(userService, 'setUserProfile').and.callFake(function() {
            expect(true);
            done();
          });
          socket.emit('test event', mockUserProfileEvent);
        }
      );
      it('should trigger UserService.setUserProfile and trigger \'UserService:UpdateMatchProfile\'',
        function(done) {
          $rootScope.$on('UserService:UpdateMatchProfile',function() {
            expect(userService.profiles[mockUserProfileEvent.data.data['user_id']]).toBeDefined();
            expect(userService.profiles[mockUserProfileEvent.data.data['user_id']].id).toBe(mockUserProfileEvent.data.profile.id);
            expect(userService.profiles[mockUserProfileEvent.data.data['user_id']].test).toBe(mockUserProfileEvent.data.profile.test);
            done();
          });
          socket.emit('test event', mockUserProfileEvent);
        }
      );
    });

    describe('rooms set event', function() {
      var mockRoomsSetEvent = {
        name:'rooms set',
        data:[
          "1234",
          "4321",
          "93472",
          "98844",
          "98844"
        ]
      };
      it('should trigger MessagesService.setRooms',
        function(done) {
          spyOn(messagesService, 'setRooms').and.callFake(function() {
            expect(true);
            done();
          });
          socket.emit('test event', mockRoomsSetEvent);
        }
      );
      it('should trigger MessagesService.setRooms and trigger \'MessagesService:UpdateRooms\'',
        function(done) {
          $rootScope.$on('MessagesService:UpdateRooms',function() {
            expect(messagesService.rooms).toEqual(mockRoomsSetEvent.data);
            done();
          });
          socket.emit('test event', mockRoomsSetEvent);
        }
      );
    });
    describe('got user matchList event', function() {
      it('should trigger UserService.setMatchList \'\'',
        function(done) {
          var mockGotUserMatchListEvent = {
            name:'got user matchList',
            data:['test','dummyObject']
          };
          spyOn(userService, 'setMatchList').and.callFake(function() {
            expect(true);
            done();
          });
          socket.emit('test event', mockGotUserMatchListEvent);
        }
      );
      it('should trigger UserService.setMatchList and set userService.user.matches',
        function(done) {
          var mockGotUserMatchListEvent = {
            name:'got user matchList',
            data:['test','dummyObject']
          };
          setInterval(function() {
            if(userService.user.matches && mockGotUserMatchListEvent.data){
              expect(userService.user.matches).toEqual(mockGotUserMatchListEvent.data)
              done();
            }else{
              console.log('waiting');
            };
          },100);
          socket.emit('test event', mockGotUserMatchListEvent);
        }
      );
    });
    describe('message sent confirmation', function() {
      it('should trigger messages service \'\'',
        function(done) {
          var mockMessageSent={
            name:'message sent',
            data:{
              snapshot:{}
            }
          }
          spyOn(messagesService, 'messageSent').and.callFake(function() {
            expect(true);
            done();
          });
          socket.emit('test event', mockMessageSent);
        }
      );
      it('should trigger messages service, which should trigger a rootScope broadcast \'MessagesService:MessageSent\'',
        function(done) {
          var mockMessageSent={
            name:'message sent',
            data:{
              snapshot:{}
            }
          };
          $rootScope.$on('MessagesService:MessageSent',function() {
            expect(true);
            done();
          })
          socket.emit('test event', mockMessageSent);
        }
      );
    });
    describe('room set events ', function() {
      it('expects on(\'room update\') to trigger messagesService\'s room update',function(done) {
        var mockRoomUpdate = {
          name:'room update',
          data:{
            snapshot:{}
          }
        };
        spyOn(messagesService, 'roomUpdate').and.callFake(function() {
          done();
          expect(true);//Got to this function via the socket event in ilcServerService
        });
        socket.emit('test event', mockRoomUpdate);
      });
      it('expects on(\'room update\') to update the room',
        function(done) {
          var mockRoomUpdate = {
            name:'room update',
            data:{
              room:"123245",
              snapshot:{
                "123245" : {
                  "date" : new Date().getTime(),
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
          spyOn(messagesService, 'roomUpdate').and.callThrough();

          //it should run twice, and there should be 2 messages
          var first = true;
          $rootScope.$on('MessagesService:MessageUpdate',function() {
            if(first === true){
              first = false;//ignore the first run
              return;
            }
            expect(messagesService.rooms[mockRoomUpdate.data.room]).not.toBeUndefined();
            var last = messagesService.rooms[mockRoomUpdate.data.room].length-1;
            expect(last+1 === 2);//because we sent in 2 updates;
            expect(messagesService.rooms[mockRoomUpdate.data.room][last]).toEqual(mockRoomUpdate.data.snapshot);

            done();

          })
          socket.emit('test event', mockRoomUpdate);
          socket.emit('test event', mockRoomUpdate);
        }
      );
    });
    describe('room set events ', function() {
      it('expects on(\'room set\') to trigger messagesService\'s room set',function(done) {
        var mockRoomSet = {
          name:'room set',
          data:{
            snapshot:{}
          }
        };
        spyOn(messagesService, 'roomSet').and.callFake(function() {
          done();
          expect(true);//Got to this function via the socket event in ilcServerService
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
            expect(room).toEqual(mockRoomSet.data);
            expect(messagesService.messages[room.room]).toEqual(mockRoomSet.data.snapshot[mockRoomSet.data.room]);
            done();
          })
          socket.emit('test event',mockRoomSet);
        }
      );
    });
    // it('tears down the connection',function(done) {
//       console.log('Start connecting');
//
//       for (var i = events.length - 1; i >= 0; i--) {
//         var event = events[i];
//         socket.removeAllListeners(event);
//       }

      // if(io(url).connected === true){
 //        io(url).emit('disconnectMe');
 //        io(url).disconnect();
 //        done();
 //        io(url).on('disconnect',function() {s
 //          console.log('disconnect event');
 //          io(url).on('connectification',function() {
 //            console.log('connected');
 //            done();
 //          });
 //          io(url).on('connect_failed',function(error) {
 //            console.log('1error', error);
 //            done();
 //          });
 //          io.connect(url);
 //        })
 //      }else{
 //        console.log('Galley slave California Condor');
 //        io(url).on('connectification',function() {
 //          console.log('connected');
 //          done();
 //        });
 //        io(url).on('connect_failed',function(error) {
 //          console.log('1error', error);
 //          done();
 //        });
 //        io.connect(url);
 //      }
    // })
  });
});
